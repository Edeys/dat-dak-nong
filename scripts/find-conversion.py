from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("/root/google-ads.yaml")
ga_service = client.get_service("GoogleAdsService")

query = """
SELECT conversion_action.id, conversion_action.name,
       conversion_action.status, conversion_action.category,
       conversion_action.phone_call_duration_seconds
FROM conversion_action
"""

response = ga_service.search_stream(customer_id="4609248799", query=query)

found = False
for batch in response:
    for row in batch.results:
        ca = row.conversion_action
        print(f"ID: {ca.id} | Name: {ca.name} | Status: {ca.status}")
        print(f"  Category: {ca.category}")
        print(f"  Count: {row.conversion_action}")
        found = True

if not found:
    print("No conversion actions found")
else:
    print("\nConversion label format: AW-16753907826/ID")
    print("Where ID is the number from conversion_action.id")
