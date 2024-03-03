import socketio
from player import Player

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])
socket_app = socketio.ASGIApp(sio)

room_codes = set()

rooms = {}

@sio.on("connect")
async def connect(sid, environ, auth):
    print("A new connection has been made")
    await sio.emit("roomAsk", {"text": "What room are you in?"})

@sio.on("disconnect")
async def disconnect(sid, environ, data):
    for room_code in room_codes:
        room = rooms[room_code]
        if sid in room.keys():
            del rooms[room_code][sid]


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
