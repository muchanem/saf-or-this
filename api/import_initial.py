import pandas as pd
import uuid

df = pd.read_csv("starter_items.csv",header=None)
print(df[0].tolist())

# THIS CODE IS SHITTY NEVER DO WHAT I DID HERE IM TIRED AND LAZY RN
uuids = []
for item in df[0].tolist():
    uuids.append(str(uuid.uuid4()))

data = {"uuid": uuids, "name": df[0].tolist()}
final = pd.DataFrame(data=data)
final["wins"] = 0
final["appeared"] = 0
print(final)
final.to_json("data.json", orient="records",lines=True)