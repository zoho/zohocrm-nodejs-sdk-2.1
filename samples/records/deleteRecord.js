import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class DeleteRecord{
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
     * <h3> Delete Record</h3>
     * This method is used to delete a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {BigInt} recordId The ID of the record to be deleted
     */
    static async deleteRecord(moduleAPIName, recordId) {
        //API Name of the module to delete record
        //let moduleAPIName = "module_api_name";
        //let recordId = 77002n;
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        //Possible parameters for Delete Record operation
        await paramInstance.add(ZOHOCRMSDK.Records.DeleteRecordParam.WF_TRIGGER, true);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        // headerInstance.add(DeleteRecordHeader.X_EXTERNAL, "Leads.External");
        //Call deleteRecord method that takes recordId, ModuleAPIName, paramInstance and headerInstance as parameter.
        let response = await recordOperations.deleteRecord(recordId, moduleAPIName, paramInstance, headerInstance);
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
await DeleteRecord.initialize();
let moduleAPIName = "leads";
let recordId = 440248000000967029n;
await DeleteRecord.deleteRecord(moduleAPIName,recordId);
export {
    DeleteRecord as DeleteRecord
}