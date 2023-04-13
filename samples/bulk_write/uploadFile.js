import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
import fs from "fs";
class UploadFile{
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
     * <h3> Upload File</h3>
     * This method is used to upload a CSV file in ZIP format for bulk write API. The response contains the file_id.
     * Use this ID while making the bulk write request.
     * @param {String} orgID The unique ID (zgid) of your organization obtained through the Organization API.
     * @param {String} absoluteFilePath The absoluteFilePath of the zip file you want to upload.
     */
    static async uploadFile(orgID, absoluteFilePath) {
        //example
        //let orgID = "6745";
        //let absoluteFilePath = "/Users/user_name/Documents/Leads.zip";
        let bulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        let fileBodyWrapper = new ZOHOCRMSDK.BulkWrite.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        let streamWrapper = new ZOHOCRMSDK.StreamWrapper(null, fs.createReadStream(absoluteFilePath));
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        // let streamWrapper = new StreamWrapper(null, null, absoluteFilePath);
        fileBodyWrapper.setFile(streamWrapper);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        //To indicate that this a bulk write operation
        await headerInstance.add(ZOHOCRMSDK.BulkWrite.UploadFileHeader.FEATURE, "bulk-write");
        await headerInstance.add(ZOHOCRMSDK.BulkWrite.UploadFileHeader.X_CRM_ORG, orgID);
        //Call uploadFile method that takes FileBodyWrapper instance and headerInstance as parameter
        let response = await bulkWriteOperations.uploadFile(fileBodyWrapper, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
                    if (responseObject.getStatus() != null) {
                        console.log("Status: " + responseObject.getStatus().getValue());
                    }
                    if (responseObject.getCode() != null) {
                        console.log("Code: " + responseObject.getCode().getValue());
                    }
                    console.log("Details");
                    if (responseObject.getDetails() != null) {
                        let details = responseObject.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                    }
                    if (responseObject.getErrorMessage() != null) {
                        console.log("Error Message: " + responseObject.getErrorMessage().getValue());
                    }
                    console.log("ErrorCode: " + responseObject.getErrorCode());
                    if (responseObject.getXError() != null) {
                        console.log("XError: " + responseObject.getXError().getValue());
                    }
                    if (responseObject.getInfo() != null) {
                        console.log("Info: " + responseObject.getInfo().getValue());
                    }
                    if (responseObject.getXInfo() != null) {
                        console.log("XInfo: " + responseObject.getXInfo().getValue());
                    }
                    console.log("HttpStatus: " + responseObject.getHttpStatus());
                }
            }
        }
    }
}
await UploadFile.initialize();
let orgID = "6745";
let absoluteFilePath = "/Users/user_name/Documents/Leads.zip";
await UploadFile.uploadFile(orgID,absoluteFilePath);
export {
    UploadFile as UplaodFile
}
