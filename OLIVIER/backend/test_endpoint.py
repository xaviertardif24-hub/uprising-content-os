import requests
import json

url = "http://127.0.0.1:8000/api/v1/chat"
payload = {
    "messages": [
        {"role": "user", "content": "Hello"}
    ]
}
headers = {
    "Content-Type": "application/json"
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
