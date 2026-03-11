from fastapi import FastAPI
try:
    from openai import OpenAI
    print("SUCCESS: OpenAI imported in minimal_server.py")
    from app.services.chat_service import chat_service
    print("SUCCESS: chat_service imported in minimal_server.py")
except Exception as e:
    print(f"FAILED: Import failed in minimal_server.py: {e}")
    import traceback
    traceback.print_exc()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Minimal server running"}
