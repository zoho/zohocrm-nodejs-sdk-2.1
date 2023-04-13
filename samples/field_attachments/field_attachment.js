import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
import fs from "fs";
import path from "path";
class FieldAttachment {
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
    static async getFieldAttachments(moduleAPIName, recordId, fieldsAttachmentId = null, destinationFolder = null) {
        let fieldAttachmentsOperations = new ZOHOCRMSDK.FieldAttachments.FieldAttachmentsOperations(moduleAPIName, recordId, fieldsAttachmentId);
        //Call getFieldAttachments method
        let response = await fieldAttachmentsOperations.getFieldAttachments();
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content\n");
                return;
            }
            //Get object from response
            let responseHandler = response.getObject();
            //Check if expected FileBodyWrapper instance is received.
            if (responseHandler instanceof ZOHOCRMSDK.FieldAttachments.FileBodyWrapper) {
                //Get StreamWrapper instance from the returned FileBodyWrapper instance
                let streamWrapper = responseHandler.getFile();
                //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                let fileName = path.join(destinationFolder, streamWrapper.getName());
                //Get the stream from StreamWrapper instance
                let readStream = streamWrapper.getStream();
                //Write the stream to the destination file.
                fs.writeFileSync(fileName, readStream);
            }
            else if (responseHandler instanceof ZOHOCRMSDK.FieldAttachments.APIException) {
                let exception = responseHandler;
                //Get the Status
                console.log("Status: " + exception.getStatus().getValue());
                //Get the Code
                console.log("Code: " + exception.getCode().getValue());
                //Get the details map
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                //Get the Message
                console.log("Message: " + exception.getMessage().getValue());
            }
        }
    }
}
await FieldAttachment.initialize();
let moduleAPIName = "leads";
let recordId = 30021n;
let fieldsAttachmentId = 400021n;
let destinationFolder = "users/documents/file";
await FieldAttachment.getFieldAttachments(moduleAPIName,recordId,fieldsAttachmentId,destinationFolder);
export {
    FieldAttachment as FieldAttachment
}
