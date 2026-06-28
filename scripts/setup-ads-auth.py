from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/adwords"]

flow = InstalledAppFlow.from_client_secrets_file("/root/client_secret.json", SCOPES)

print("=== GOOGLE ADS AUTH ===")
print("1. Visit this URL in your browser:")
print()
auth_url, _ = flow.authorization_url(prompt="consent")
print(auth_url)
print()
print("2. Authorize the app")
print("3. Copy the authorization code from the redirect URL")
print("   (it's the 'code' parameter in the URL)")
print()

code = input("Paste authorization code: ").strip()

flow.fetch_token(code=code)
creds = flow.credentials

with open("/root/ads_credentials.json", "w") as f:
    f.write(creds.to_json())

print("Credentials saved to /root/ads_credentials.json")
print("Done!")
