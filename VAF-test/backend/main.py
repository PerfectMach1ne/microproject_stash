import json
from os import path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:5173/",
    "http://localhost/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JSON_PATH = path.abspath('so-called-database/burgers.json')


def read_json_db():
    with open(str(JSON_PATH), 'r') as jsonfile:
        json_obj = json.load(jsonfile)

    if jsonfile.closed == False:
        raise Exception('File hasn\'t been closed properly.')

    jsonfile.close()

    return json_obj


@app.get("/")
async def root():
    return {"message": "HEEEELOOOO WOOOOORLD"}


@app.get("/burger/{burger_id}")
async def get_burger(burger_id: int):
    data = read_json_db()

    return data[int(burger_id)]


@app.get("/burger/{burger_id}/img", response_class=FileResponse)
async def get_burger_img(burger_id: int):
    data = read_json_db()
    burger = data[int(burger_id)]
    img = path.abspath('so-called-database/images/' + burger["img-source"])

    return img
