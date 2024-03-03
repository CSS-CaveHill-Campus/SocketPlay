import socketio
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from player import Player

app = FastAPI()

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])

socket_app = socketio.ASGIApp(sio)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods="*",
    allow_headers="*"
)

app.mount("/socket.io", socket_app)

FPS = 30

@app.get("/")
async def index():
    return {"Hello": "World"}

# Sockets

room_codes = set()

rooms = {}

@sio.on("connect")
async def connect(sid, environ, auth):
    print("A new connection has been made")
    await sio.emit("roomAsk", {"text": "What room are you in?"})


@sio.on("joinRoom")
async def joinRoom(sid, data):
    room_code = data["roomCode"]
    await sio.enter_room(sid, room_code)
    room_codes.add(room_code)
    await sio.emit("roomJoined", {"sid": sid, "roomCode": room_code})
    rooms.setdefault(room_code, {})


@sio.on("createPlayer")
async def createPlayer(sid, data):
    room_code = data['roomCode']
    rooms[room_code][sid] = Player(sid, data['name'], data['color'], data['xPos'], data['yPos'], room_code)

@app.on_event("startup")
@repeat_every(seconds=(1 / FPS))
async def update_game_state():
    for room_code in room_codes:
        players = [player.__dict__ for player in rooms[room_code].values()]
        await sio.emit("gameState", {"players": players}, room=room_code)