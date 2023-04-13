import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class DeLinkRecords{
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
     * <h3> Delink Records </h3>
     * This method is used to delete the association between modules and print the response.
     * @param {String} moduleAPIName The API Name of the module to delink related records.
     * @param {BigInt} recordId The ID of the record
     * @param {String} relatedListAPIName The API name of the related list
     * @param {Array} relatedListIds The array of related record IDs.
     */
    static async deLinkRecords(moduleAPIName, recordId, relatedListAPIName, relatedListIds) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 0798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedIds = [002414001n, 32414002n, 02414020n];
        let relatedRecordsOperations = new ZOHOCRMSDK.RelatedRecords.RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Delink Records operation */
        for (let relatedListId of relatedListIds) {
            await paramInstance.add(ZOHOCRMSDK.RelatedRecords.DelinkRecordsParam.IDS, relatedListId);
        }
        //Call delinkRecords method that takes recordId and ParameterMap instance as parameter.
        let response = await relatedRecordsOperations.delinkRecords(recordId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RelatedRecords.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.RelatedRecords.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.RelatedRecords.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.RelatedRecords.APIException) {
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
await DeLinkRecords.initialize();
let moduleAPIName = "leads";
let recordId = 12343211n
let relatedListAPIName = "notes";
let relatedListIds = [12321121n,12431231n];
await DeLinkRecords.deLinkRecords(moduleAPIName,recordId,relatedListAPIName,relatedListIds);
export {
    DeLinkRecords as DeLinkRecords
}
