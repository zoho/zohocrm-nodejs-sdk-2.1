import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class ConvertLead{
    static async initialize(){
        let user= new ZOHOCRMSDK.UserSignature('myname@mydomain.com');
        let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token =(new ZOHOCRMSDK.OAuthBuilder())
            .clientId("1000.xxxx")
            .clientSecret("xxxxxx")
            .refreshToken("1000.xxxxx.xxxxx")
            .build();
        (await new ZOHOCRMSDK.InitializeBuilder())
            .user(user)
            .environment(environment)
            .token(token)
            .initialize();
    }
    /**
     * <h3> Convert Lead</h3>
     * This method is used to Convert a Lead record and print the response.
     * @param {BigInt} leadId The ID of the Lead to be converted.
     */
    static async convertLead(leadId) {
        //example
        //let leadId = 02034003n;
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let request = new ZOHOCRMSDK.Records.ConvertBodyWrapper();
        //Array to hold LeadConverter instances
        let data = [];
        let record = new ZOHOCRMSDK.Records.LeadConverter();
        record.setOverwrite(true);
        record.setNotifyLeadOwner(true);
        record.setNotifyNewEntityOwner(true);
        record.setAccounts("34770615848125");
        record.setContacts("34770610358009");
        record.setAssignTo("34770610173021");
        let deals = new ZOHOCRMSDK.Records.Record();
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        deals.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.DEAL_NAME, "deal_name");
        deals.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.DESCRIPTION, "deals description");
        deals.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.CLOSING_DATE, new Date(2021, 2, 13));
        deals.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.STAGE, new ZOHOCRMSDK.Choice("Closed Won"));
        deals.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.AMOUNT, 50.7);
        deals.addKeyValue("Pipeline", new ZOHOCRMSDK.Choice("Qualification"));
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        deals.addKeyValue("Custom_field", "Value");
        deals.addKeyValue("Custom_field_2", "value");
        record.setDeals(deals);
        let carryOverTags = new ZOHOCRMSDK.Records.CarryOverTags();
        carryOverTags.setAccounts(["Test"]);
        carryOverTags.setContacts(["Test"]);
        carryOverTags.setDeals(["Test"]);
        record.setCarryOverTags(carryOverTags);
        //Add the instance to array
        data.push(record);
        request.setData(data);
        //Call convertLead method that takes ConvertBodyWrapper instance and leadId as parameter
        let response = await recordOperations.convertLead(leadId, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Records.ConvertActionWrapper) {
                    let convertActionResponses = responseObject.getData();
                    convertActionResponses.forEach(convertActionResponse => {
                        if (convertActionResponse instanceof ZOHOCRMSDK.Records.SuccessfulConvert) {
                            console.log("LeadConvert Accounts ID: " + convertActionResponse.getAccounts());
                            console.log("LeadConvert Contacts ID: " + convertActionResponse.getContacts());
                            console.log("LeadConvert Deals ID: " + convertActionResponse.getDeals());
                        }
                        else if (convertActionResponse instanceof ZOHOCRMSDK.Records.APIException) {
                            console.log("Status: " + convertActionResponse.getStatus().getValue());
                            console.log("Code: " + convertActionResponse.getCode().getValue());
                            console.log("Details");
                            let details = convertActionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + convertActionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Records.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
}
await ConvertLead.initialize();
let leadId = 400002300010088n
await ConvertLead.convertLead(leadId);
export {
    ConvertLead as ConvertLead
}