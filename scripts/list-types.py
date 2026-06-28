from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("/root/google-ads.yaml")
enum = client.enums.ConversionActionTypeEnum

for name in dir(enum):
    if name.startswith("_") or name == "UNKNOWN":
        continue
    val = getattr(enum, name)
    if isinstance(val, int) and val > 0:
        print(f"{name} = {val}")
