import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class RevokeSharedRecord{
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
     * <h3> Revoke Shared Record </h3>
     * This method is used to revoke access to a shared record that was shared to users and print the response.
     * @param {String} moduleAPIName The API Name of the module to revoke shared record.
     * @param {BigInt} recordId The ID of the record
     */
    static async revokeSharedRecord(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 2112011n;
        let shareRecordsOperations = new ZOHOCRMSDK.ShareRecords.ShareRecordsOperations(recordId, moduleAPIName);
        //Call revokeSharedRecord method
        let response = await shareRecordsOperations.revokeSharedRecord();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.ShareRecords.DeleteActionWrapper) {
                    let deleteActionResponse = responseObject.getShare();
                    if (deleteActionResponse instanceof ZOHOCRMSDK.ShareRecords.SuccessResponse) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());
                        console.log("Code: " + deleteActionResponse.getCode().getValue());
                        console.log("Details");
                        let details = deleteActionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
                    }
                    else if (deleteActionResponse instanceof ZOHOCRMSDK.ShareRecords.APIException) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());
                        console.log("Code: " + deleteActionResponse.getCode().getValue());
                        console.log("Details");
                        let details = deleteActionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
                    }
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
await RevokeSharedRecord.initialize();
let moduleAPIName = "leads";
let recordId = 1212n;
await RevokeSharedRecord.revokeSharedRecord(moduleAPIName,recordId);
export {
    RevokeSharedRecord as RevokeSharedRecord
}
