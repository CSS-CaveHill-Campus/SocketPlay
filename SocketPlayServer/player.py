class Player:
    def __init__(self, sid:int, name:str, color:str, x_pos:float, y_pos:float, room_code: str):
        self.sid = sid
        self.name = name
        self.color = color
        self.x_pos = x_pos
        self.y_pos = y_pos
        self.room_code = room_code