import socketio
import uvicorn
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from sockets import socket_app, sio, rooms, room_codes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods="*",
    allow_headers="*"
)

app.mount("/", socket_app)

FPS = 30

@app.get("/")
async def index():
    return {"Hello": "World"}

# Sockets

@app.on_event("startup")
@repeat_every(seconds=(1 / FPS))
async def update_game_state():
    for room_code in room_codes:
        players = [player.__dict__ for player in rooms[room_code].values()]
        await sio.emit("gameState", {"players": players}, room=room_code)

if __name__ == "__main__":
    try:
        uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
    except KeyboardInterrupt:
        print("Shutting down")
        sio.shutdown()
        raise SystemExit