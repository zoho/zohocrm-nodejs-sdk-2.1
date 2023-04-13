import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpsertRecords{
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
     * <h3> Upsert Records</h3>
     * This method is used to Upsert records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to upsert records.
     */
    static async upsertRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let request = new ZOHOCRMSDK.Records.BodyWrapper();
        //Array to hold Record instances
        let recordsArray = [];
        let record1 = new ZOHOCRMSDK.Records.Record();
        let applyFeatureExecution = new ZOHOCRMSDK.Records.ApplyFeatureExecution();
        //Array to hold ApplyFeatureExecution instances
        let apply_feature_list =[];
        applyFeatureExecution.setName("layout_rules");
        apply_feature_list.push(applyFeatureExecution);
        request.setApplyFeatureExecution(apply_feature_list);
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Node JS SDK");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "Node");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "ZCRM");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "city");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.ANNUAL_REVENUE, 1231.1);
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record1.addKeyValue("Custom_field", "Custom val");
        
        record1.addKeyValue("Custom_field_2", 10);
        
        //Add the record to array
        recordsArray.push(record1);
        let record2 = new ZOHOCRMSDK.Records.Record();
        
        /*
         * Call addFieldValue method that takes two arguments
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "City");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Last Name");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "First Name");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "KKRNP");
        
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record2.addKeyValue("Custom_field", "Value");
        
        record2.addKeyValue("Custom_field_2", "value");
        // Add the record to array
        recordsArray.push(record2);
        request.setData(recordsArray);
        let duplicateCheckFields = ["City", "Last_Name", "First_Name"];
        // request.setDuplicateCheckFields(duplicateCheckFields);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        await headerInstance.add(ZOHOCRMSDK.Records.UpsertRecordsHeader.X_EXTERNAL, "Leads.External");
        //Call upsertRecords method that takes BodyWrapper instance and moduleAPIName as parameter.
        let response = await recordOperations.upsertRecords(moduleAPIName, request, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Records.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Records.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Records.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
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
await UpsertRecords.initialize();
let moduleAPIName = "leads";
await UpsertRecords.upsertRecords(moduleAPIName);
export {
    UpsertRecords as UpsertRecords
}