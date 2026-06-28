from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_storage("/root/google-ads.yaml")
conversion_action_service = client.get_service("ConversionActionService")

operation = client.get_type("ConversionActionOperation")
conversion_action = operation.create
conversion_action.name = "Đăng ký tư vấn đất Đắk Nông"
conversion_action.type_ = client.enums.ConversionActionTypeEnum.WEBPAGE
conversion_action.category = client.enums.ConversionActionCategoryEnum.SUBMIT_LEAD_FORM
conversion_action.status = client.enums.ConversionActionStatusEnum.ENABLED
conversion_action.counting_type = client.enums.ConversionActionCountingTypeEnum.ONE_PER_CLICK

response = conversion_action_service.mutate_conversion_actions(
    customer_id="4609248799", operations=[operation]
)

for result in response.results:
    print(f"Created: {result.resource_name}")
    conversion_id = result.resource_name.split("/")[-1]
    print(f"→ Use: gtag('event', 'conversion', {{ send_to: 'AW-16753907826/{conversion_id}' }})")
