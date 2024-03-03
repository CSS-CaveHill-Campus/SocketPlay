from fastapi import FastAPI
import socketio
from fastapi.middleware.cors import CORSMiddleware

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

@sio.on("connect")
async def connect(sid, environ, auth):
    print("A new connection has been made")
    await sio.emit("room", {"text": "Hello world"})