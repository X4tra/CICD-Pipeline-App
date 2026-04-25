from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/hello')
def test():
    return {"message": "Hello World!"}

@app.get('/status')
def status():
    return {"message": "Up and running!!"}
