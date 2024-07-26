import requests
import json

url = "https://api.vapi.ai/call"

headers = {"Authorization": "Bearer c39f30da-4531-4745-8a5c-15c4f58b5258"}

response = requests.request("GET", url, headers=headers)

# print(response.text)

response_data = json.loads(response.text)
transcript = response_data[0]['transcript']
print(transcript)
