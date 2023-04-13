import path from "path";
import fs from "fs";
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class DownloadAttachment{
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
     * <h3> Download Attachment</h3>
     * This method is used to download an attachment of a single record of a module with ID and attachment ID and write the file in the specified destination.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to download attachment
     * @param {BigInt} attachmentId The ID of the attachment to be downloaded
     * @param {String} destinationFolder The absolute path of the destination folder to store the attachment
     */
    static async downloadAttachment(moduleAPIName, recordId, attachmentId, destinationFolder) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 32267003n;
        // let attachmentId = 32267024n;
        // let destinationFolder = "/Users/user-name/Desktop";
        let attachmentsOperations = new ZOHOCRMSDK.Attachments.AttachmentsOperations(moduleAPIName, recordId);
        //Call downloadAttachment method that takes attachmentId as parameters
        let response = await attachmentsOperations.downloadAttachment(attachmentId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Attachments.FileBodyWrapper) {
                    let streamWrapper = responseObject.getFile();
                    //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                    let fileName = path.join(destinationFolder, streamWrapper.getName());
                    let readStream = streamWrapper.getStream();
                    //Write the stream to the destination file.
                    fs.writeFileSync(fileName, readStream);
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
await DownloadAttachment.initialize();
let moduleAPIName = "leads";
let recordId = 1000043n;
let attachmentId = 400003n;
let destinationFolder = "users/documents/file";
await DownloadAttachment.downloadAttachment(moduleAPIName,recordId,attachmentId,destinationFolder);
export {
    DownloadAttachment as DownloadAttachment
}
