import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetBulkWriteJobDetails{
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
     * <h3> Get BulkWriteJob Details</h3>
     * This method is used to get the details of a bulk write job performed previously.
     * @param {BigInt} jobId The unique ID of the bulk write job.
     */
    static async getBulkWriteJobDetails(jobId) {
        //example
        //let jobId = 5003n;
        let bulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        //Call getBulkWriteJobDetails method that takes jobId as parameter
        let response = await bulkWriteOperations.getBulkWriteJobDetails(jobId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.BulkWriteResponse) {
                    console.log("Bulk write Job Status: " + responseObject.getStatus());
                    console.log("Bulk write CharacterEncoding: " + responseObject.getCharacterEncoding());
                    let resources = responseObject.getResource();
                    if (resources != null) {
                        resources.forEach(resource => {
                            console.log("Bulk write Resource Status: " + resource.getStatus().getValue());
                            console.log("Bulk write Resource Type: " + resource.getType().getValue());
                            let module = resource.getModule();
                            if (module != null) {
                                console.log("Bulkwrite Resource Module Name : " + module.getAPIName());
                                console.log("Bulkwrite Resource Module Id : " + module.getId());
                            }
                            let fieldMappings = resource.getFieldMappings();
                            if (fieldMappings != null) {
                                fieldMappings.forEach(fieldMapping => {
                                    console.log("Bulk write Resource FieldMapping Module: " + fieldMapping.getAPIName());
                                    if (fieldMapping.getIndex() != null) {
                                        console.log("Bulk write Resource FieldMapping Inded: " + fieldMapping.getIndex().toString());
                                    }
                                    if (fieldMapping.getFormat() != null) {
                                        console.log("Bulk write Resource FieldMapping Format: " + fieldMapping.getFormat());
                                    }
                                    if (fieldMapping.getFindBy() != null) {
                                        console.log("Bulk write Resource FieldMapping FindBy: " + fieldMapping.getFindBy());
                                    }
                                    if (fieldMapping.getModule() != null) {
                                        console.log("Bulkwrite Resource FieldMapping Module: " + fieldMapping.getModule());
                                    }
                                    if (fieldMapping.getDefaultValue() != null) {
                                        Array.from(fieldMapping.getDefaultValue().keys()).forEach(key => {
                                            console.log(key + ": " + fieldMapping.getDefaultValue().get(key));
                                        });
                                    }
                                });
                            }
                            if (resource.getFindBy() != null) {
                                console.log("Bulkwrite Resource FindBy: " + resource.getFindBy());
                            }
                            let file = resource.getFile();
                            if (file != null) {
                                console.log("Bulk write Resource File Status: " + file.getStatus().getValue());
                                console.log("Bulk write Resource File Name: " + file.getName());
                                console.log("Bulk write Resource File AddedCount: " + file.getAddedCount().toString());
                                console.log("Bulk write Resource File SkippedCount: " + file.getSkippedCount().toString());
                                console.log("Bulk write Resource File UpdatedCount: " + file.getUpdatedCount().toString());
                                console.log("Bulk write Resource File TotalCount: " + file.getTotalCount().toString());
                            }
                            console.log("Bulkwrite Resource Code: " + resource.getCode());
                        });
                    }
                    let callback = responseObject.getCallback();
                    if (callback != null) {
                        console.log("Bulk write CallBack Url: " + callback.getUrl());
                        console.log("Bulk write CallBack Method: " + callback.getMethod().getValue());
                    }
                    console.log("Bulk write ID: " + responseObject.getId().toString());
                    let result = responseObject.getResult();
                    if (result != null) {
                        console.log("Bulk write DownloadUrl: " + result.getDownloadUrl());
                    }
                    let createdBy = responseObject.getCreatedBy();
                    if (createdBy != null) {
                        console.log("Bulkwrite Created By User-ID: " + createdBy.getId());
                        console.log("Bulkwrite Created By user-Name: " + createdBy.getName());
                    }
                    console.log("Bulk write Operation: " + responseObject.getOperation());
                    console.log("Bulk write File CreatedTime: " + responseObject.getCreatedTime().toString());
                }
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
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
await GetBulkWriteJobDetails.initialize();
let jobId = 232312n;
await GetBulkWriteJobDetails.getBulkWriteJobDetails(jobId);
export {
    GetBulkWriteJobDetails as GetBulkWriteJobDetails
}
