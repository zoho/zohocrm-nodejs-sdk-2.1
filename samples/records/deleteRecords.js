import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class DeleteRecords{
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
     * <h3> Delete Records</h3>
     * This method is used to delete records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to delete records.
     * @param {Array} recordIds The array of record IDs to be deleted
     */
    static async deleteRecords(moduleAPIName, recordIds) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordIds = [3756050n, 3729017n, 3989009n];
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Delete Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(ZOHOCRMSDK.Records.DeleteRecordsParam.IDS, recordId);
        }
        await paramInstance.add(ZOHOCRMSDK.Records.DeleteRecordsParam.WF_TRIGGER, true);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        // headerInstance.add(DeleteRecordsHeader.X_EXTERNAL, "Leads.External");
        //Call deleteRecords method that takes paramInstance and moduleAPIName as parameter.
        let response = await recordOperations.deleteRecords(moduleAPIName, paramInstance, headerInstance);
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
await DeleteRecords.initialize();
let moduleAPIName = "leads";
let recordIds = [4011000000320010n,4011000000320333n,4011000000320245n];
await DeleteRecords.deleteRecords(moduleAPIName,recordIds);
export {
    DeleteRecords as DeleteRecords
}