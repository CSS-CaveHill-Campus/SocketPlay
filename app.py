import socketio
import uvicorn
from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sockets import socket_app, sio, rooms, room_codes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods="*",
    allow_headers="*"
)

app.mount("/socket.io", socket_app)
app.mount("/static", StaticFiles(directory="static"))

templates = Jinja2Templates(directory="templates")

FPS = 30

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse(
        name="index.html", context={"request": request}
    )

@app.get("/healthz")
async def health_check():
    return "I'm alive!"

@app.get("/intro")
async def getIntroForm(request: Request):
    return templates.TemplateResponse(
        name="introForm.html", context={"request": request}
    )

@app.get("/join")
async def getJoinRoomForm(request: Request):
    return templates.TemplateResponse(
        name="joinRoomForm.html", context={"request": request}
    )

@app.get("/game/{roomCode}")
async def get_game(request: Request, roomCode: str):
    return templates.TemplateResponse(
        name="game.html", context={"request": request, "room_code": roomCode}
    )

# Sockets

@app.on_event("startup")
@repeat_every(seconds=(1 / FPS))
async def update_game_state():
    for room_code in room_codes:
        players = [player.__dict__ for player in rooms[room_code].values()]
        await sio.emit("gameState", {"players": players}, room=room_code)

if __name__ == "__main__":
    try:
        uvicorn.run("app:app", host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        print("Shutting down")
        sio.shutdown()
        raise SystemExit