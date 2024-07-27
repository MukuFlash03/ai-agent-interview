import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

VAPI_PUBLIC_API_KEY = os.getenv('NEXT_PUBLIC_VAPI_PRIVATE_API_KEY');

print("*" * 50 + '\n')
print("Fetching Transcript from all calls list")
print("*" * 50 + '\n')
url_list_calls = "https://api.vapi.ai/call"
headers = {"Authorization": "Bearer {VAPI_PUBLIC_API_KEY}"}
response = requests.request("GET", url_list_calls, headers=headers)
response_data = json.loads(response.text)
for call in response_data:
    transcript = call['transcript']
    print(transcript)

print("*" * 50 + '\n')
print("Fetching Transcript from single call by ID")
print("*" * 50 + '\n')
url_get_call_by_id = "https://api.vapi.ai/call/00dd62cb-6a60-4cad-8e45-739742940bf8"
headers = {"Authorization": "Bearer {VAPI_PUBLIC_API_KEY}"}
response = requests.request("GET", url_get_call_by_id, headers=headers)
response_data = json.loads(response.text)
transcript = response_data['transcript']
print(transcript)