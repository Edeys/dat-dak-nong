from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = [
    "https://www.googleapis.com/auth/adwords",
    "https://www.googleapis.com/auth/cloud-platform",
]

flow = InstalledAppFlow.from_client_secrets_file(
    "C:\\Users\\xuanl\\client_secret.json", SCOPES
)
creds = flow.run_local_server(port=8080, open_browser=True)

import json
with open("C:\\Users\\xuanl\\ads_credentials.json", "w") as f:
    json.dump(json.loads(creds.to_json()), f, indent=2)

print("Done! Credentials saved to C:\\Users\\xuanl\\ads_credentials.json")
