import os
import sys
import uvicorn

if __name__ == "__main__":
    print("--- Assistant Royal AI Server Startup (Environment Enforced) ---")
    
    # Define paths
    backend_dir = os.getcwd()
    site_packages = r"C:\Users\xavie\AppData\Local\Programs\Python\Python312\Lib\site-packages"
    
    # Enforce path in parent process
    if site_packages not in sys.path:
        sys.path.insert(0, site_packages)
    if backend_dir not in sys.path:
        sys.path.insert(0, backend_dir)

    # Set PYTHONPATH for all child processes (including uvicorn reloader)
    new_path = f"{backend_dir};{site_packages}"
    os.environ['PYTHONPATH'] = new_path
    
    print(f"PYTHONPATH set to: {new_path}")
    print(f"Current Python: {sys.executable}")
    
    try:
        from openai import OpenAI
        print(f"SUCCESS: OpenAI class imported in parent: {OpenAI}")
    except Exception as e:
        print(f"WARNING: Parent process failed to import OpenAI: {e}")

    # Launch uvicorn
    # Note: we use reload=False first to see if it works without spawning too many processes
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, log_level="info", reload=False)
