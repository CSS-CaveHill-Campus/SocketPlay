import socketio
from player import Player

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])
socket_app = socketio.ASGIApp(sio)

room_codes = set()

rooms = {}

def get_player_by_id(room_code, sid) -> Player:
    if room_code in room_codes:
        room = rooms[room_code]
        player = room[sid]
        return player 
    return None

@sio.on("connect")
async def connect(sid, environ, auth):
    print("A new connection has been made")
    await sio.emit("roomAsk", {"text": "What room are you in?"})

@sio.on("disconnect")
async def disconnect(sid):
    for room_code in room_codes:
        room = rooms[room_code]
        if sid in room.keys():
            del rooms[room_code][sid]


@sio.on("joinRoom")
async def join_room(sid, data):
    room_code = data["roomCode"]
    await sio.enter_room(sid, room_code)
    room_codes.add(room_code)
    await sio.emit("roomJoined", {"sid": sid, "roomCode": room_code})
    rooms.setdefault(room_code, {})


@sio.on("createPlayer")
async def create_player(sid, data):
    room_code = data['roomCode']
    rooms[room_code][sid] = Player(sid, data['name'], data['color'], data['xPos'], data['yPos'], data['size'], room_code)

@sio.on("playerMove")
async def player_move(sid, data):
    player = get_player_by_id(data['roomCode'], sid)
    player.set_pos(data['xPos'], data['yPos'])
