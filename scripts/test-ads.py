from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("/root/google-ads.yaml")
ga_service = client.get_service("GoogleAdsService")
query = "SELECT campaign.id, campaign.name, campaign.status FROM campaign WHERE campaign.status != 'REMOVED'"
response = ga_service.search_stream(customer_id="4609248799", query=query)

found = False
for batch in response:
    for row in batch.results:
        print(f"Campaign: {row.campaign.name} ({row.campaign.id}) - {row.campaign.status}")
        found = True

if not found:
    print("No active campaigns found, but connection OK!")

print("Google Ads API connection successful!")
