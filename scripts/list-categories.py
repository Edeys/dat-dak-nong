from google.ads.googleads.client import GoogleAdsClient
import inspect

client = GoogleAdsClient.load_from_storage("/root/google-ads.yaml")
enum = client.enums.ConversionActionCategoryEnum

for name in dir(enum):
    if name.startswith("_") or name == "UNKNOWN":
        continue
    val = getattr(enum, name)
    if isinstance(val, int) and val > 0:
        print(f"{name} = {val}")
