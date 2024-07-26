import requests
import json

print("*" * 50 + '\n')
print("Fetching Transcript from all calls list")
print("*" * 50 + '\n')
url_list_calls = "https://api.vapi.ai/call"
headers = {"Authorization": "Bearer c39f30da-4531-4745-8a5c-15c4f58b5258"}
response = requests.request("GET", url_list_calls, headers=headers)
response_data = json.loads(response.text)
for call in response_data:
    transcript = call['transcript']
    print(transcript)

print("*" * 50 + '\n')
print("Fetching Transcript from single call by ID")
print("*" * 50 + '\n')
url_get_call_by_id = "https://api.vapi.ai/call/00dd62cb-6a60-4cad-8e45-739742940bf8"
headers = {"Authorization": "Bearer c39f30da-4531-4745-8a5c-15c4f58b5258"}
response = requests.request("GET", url_get_call_by_id, headers=headers)
response_data = json.loads(response.text)
transcript = response_data['transcript']
print(transcript)