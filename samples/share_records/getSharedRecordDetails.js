import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetSharedRecordDetails{
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
     * <h3> Get Shared Record Details </h3>
     * This method is used to get the details of a shared record and print the response.
     * @param {String} moduleAPIName The API Name of the module to get shared record details.
     * @param {BigInt} recordId The ID of the record to be obtain shared information
     */
    static async getSharedRecordDetails(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 2112011n;
        let sharedRecordsOperations = new ZOHOCRMSDK.ShareRecords.ShareRecordsOperations(recordId, moduleAPIName);
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Get Shared Record Details operation */
        await paramInstance.add(ZOHOCRMSDK.ShareRecords.GetSharedRecordDetailsParam.VIEW, "summary");
        // await paramInstance.add(GetSharedRecordDetailsParam.SHAREDTO, "00302031");
        //Call getSharedRecordDetails method that takes ParameterMap instance as parameter
        let response = await sharedRecordsOperations.getSharedRecordDetails(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.ShareRecords.ResponseWrapper) {
                    let shareRecords = responseObject.getShare();
                    shareRecords.forEach(shareRecord => {
                        console.log("ShareRecord ShareRelatedRecords: " + shareRecord.getShareRelatedRecords().toString());
                        let sharedThrough = shareRecord.getSharedThrough();
                        if (sharedThrough != null) {
                            console.log("ShareRecord SharedThrough EntityName: " + sharedThrough.getEntityName());
                            let module = sharedThrough.getModule();
                            if (module != null) {
                                console.log("ShareRecord SharedThrough Module ID: " + module.getId().toString());
                                console.log("ShareRecord SharedThrough Module Name: " + module.getName());
                            }
                            console.log("ShareRecord SharedThrough ID: " + sharedThrough.getId());
                        }
                        console.log("ShareRecord SharedTime: " + shareRecord.getSharedTime().toString());
                        console.log("ShareRecord Permission: " + shareRecord.getPermission().toString());
                        let sharedBy = shareRecord.getSharedBy();
                        if (sharedBy != null) {
                            console.log("ShareRecord SharedBy-ID: " + sharedBy.getId());
                            console.log("ShareRecord SharedBy-FullName: " + sharedBy.getFullName());
                            console.log("ShareRecord SharedBy-Zuid: " + sharedBy.getZuid());
                        }
                        let user = shareRecord.getUser();
                        if (user != null) {
                            console.log("ShareRecord User-ID: " + user.getId());
                            console.log("ShareRecord User-FullName: " + user.getFullName());
                            console.log("ShareRecord User-Zuid: " + user.getZuid());
                        }
                    });
                    let shareableUsers = responseObject.getShareableUser();
                    if (shareableUsers != null) {
                        shareableUsers.forEach(shareableUser => {
                            console.log("Shareable User User-ID: " + shareableUser.getId());
                            console.log("Shareable User User-FullName: " + shareableUser.getFullName());
                            console.log("Shareable User User-Zuid: " + shareableUser.getZuid());
                        });
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
await GetSharedRecordDetails.initialize();
let moduleAPIName = "leads";
let recordId = 440248000000774074n;
await GetSharedRecordDetails.getSharedRecordDetails(moduleAPIName,recordId);
export {
    GetSharedRecordDetails as GetSharedRecordDetails
}
