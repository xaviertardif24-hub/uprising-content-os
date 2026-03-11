from fastapi import FastAPI
import os
try:
    from openai import OpenAI
    print("SUCCESS: Minimal OpenAI import worked!")
except Exception as e:
    print(f"FAILED: Minimal OpenAI import failed: {e}")

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Minimal server is running"}
