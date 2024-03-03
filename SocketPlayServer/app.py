from fastapi import FastAPI
import socketio
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