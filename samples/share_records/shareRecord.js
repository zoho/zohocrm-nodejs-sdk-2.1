import * as ZOHOCRMSDK from "tharun-testsdk";
class ShareRecord{
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
     * <h3> Share Record </h3>
     * This method is used to share the record and print the response.
     * @param {String} moduleAPIName The API Name of the module to share record.
     * @param {BigInt} recordId The ID of the record to be shared
     */
    static async shareRecord(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 112011n;
        let sharedRecordsOperations = new ZOHOCRMSDK.ShareRecords.ShareRecordsOperations(recordId, moduleAPIName);
        let request = new ZOHOCRMSDK.ShareRecords.BodyWrapper();
        //Array to hold ShareRecord instances
        let shareRecordArray = [];
        let shareRecord = new ZOHOCRMSDK.ShareRecords.ShareRecord();
        shareRecord.setShareRelatedRecords(false);
        shareRecord.setPermission("read_write");
        let user = new ZOHOCRMSDK.Users.User();
        user.setId(34770615791024n);
        shareRecord.setUser(user);
        //Add the instance to array
        shareRecordArray.push(shareRecord);
        request.setShare(shareRecordArray);
        //Call shareRecord method that takes BodyWrapper instance as parameter
        let response = await sharedRecordsOperations.shareRecord(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.ShareRecords.ActionWrapper) {
                    let actionResponses = responseObject.getShare();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.ShareRecords.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.ShareRecords.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.ShareRecords.APIException) {
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
await ShareRecord.initialize();
let moduleAPIName = "leads";
let recordId = 1121n;
await ShareRecord.shareRecord(moduleAPIName,recordId);
export {
    ShareRecord as ShareRecord
}
