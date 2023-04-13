import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UploadAttachments{
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
     * <h3> Upload Attachments</h3>
     * This method is used to upload an attachment to a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to upload attachment
     * @param {String} absoluteFilePath The absolute file path of the file to be attached
     */
    static async uploadAttachments(moduleAPIName, recordId, absoluteFilePath) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 34096003n;
        // let absoluteFilePath = "/Users/user-name/Documents/image.jpg";
        let attachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations(moduleAPIName, recordId);
        let fileBodyWrapper = new ZOHOCRMSDK.Attachments.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        let streamWrapper = new ZOHOCRMSDK.StreamWrapper(null, null, absoluteFilePath);//fs.createReadStream(absoluteFilePath)
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        // let streamWrapper = new StreamWrapper(null, null, absoluteFilePath);
        fileBodyWrapper.setFile(streamWrapper);
        //Call uploadAttachment method that takes FileBodyWrapper instance as parameter
        let response = await attachmentsOperations.uploadAttachment(fileBodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Attachments.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Attachments.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Attachments.APIException) {
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
await UploadAttachments.initialize();
let moduleAPIName ="leads";
let recordId = 200032n;
let absoluteFilePath = "users/documents/file";
await UploadAttachments.uploadAttachments(moduleAPIName,recordId,absoluteFilePath);
export {
    UploadAttachments as UploadAttachments
}
