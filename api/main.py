import json
import random
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware


data = []
data_file="data.json"
@asynccontextmanager
async def lifespan(app: FastAPI):
    with open(data_file) as f:
        for line in f:
            data.append(json.loads(line))
    yield
    with open(data_file,"w") as out:
        for ddict in data:
            jout = json.dumps(ddict) + "\n"
            out.write(jout)

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/things/")
async def get_things():
    return {"data": random.sample(data,5)}

@app.get("/vote/") 
async def vote(thingid: str):
    for i,thing in enumerate(data):
        if thing["uuid"] == thingid:
            data[i]["wins"] = thing["wins"] + 1
            data[i]["appeared"] = thing["appeared"] + 1

@app.get("/appeared/") 
async def vote(thingid: str):
    for i,thing in enumerate(data):
        if thing["uuid"] == thingid:
            data[i]["appeared"] = thing["appeared"] + 1
            

@app.get("/results/")
async def results():
    results = []
    w_total = 0
    a_total = 0
    for i,thing in enumerate(data):
        win_p = .5
        if thing["appeared"] != 0:
            win_p = thing["wins"]/thing["appeared"]
        results.append({"name": thing["name"], "win_p": round(win_p*100)})
        w_total = w_total + thing["wins"]
        a_total = a_total + thing["appeared"]
    results.append({"name": "Saf", "win_p": round(1-(w_total/a_total))})
    results = sorted(results,key=lambda x: x["win_p"],reverse=True)
    return {"data": results}

