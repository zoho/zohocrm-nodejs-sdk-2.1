const FieldAttachmentsOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/field_attachments/field_attachments_operations").FieldAttachmentsOperations;
const FileBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/field_attachments/file_body_wrapper").FileBodyWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/field_attachments/api_exception").APIException;
const fs = require("fs");
const path = require("path");

class FieldAttachment {
    static async getFieldAttachments(moduleAPIName, recordId, fieldsAttachmentId = null, destinationFolder = null) {
        //Get instance of FieldAttachmentsOperations Class
        let fieldAttachmentsOperations = new FieldAttachmentsOperations(moduleAPIName, recordId, fieldsAttachmentId);

        //Call getFieldAttachments method
        let response = await fieldAttachmentsOperations.getFieldAttachments();

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if (response.getStatusCode() == 204) {
                console.log("No Content\n");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            //Check if expected FileBodyWrapper instance is received.
            if (responseHandler instanceof FileBodyWrapper) {

                //Get StreamWrapper instance from the returned FileBodyWrapper instance
                let streamWrapper = responseHandler.getFile();

                //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                let fileName = path.join(destinationFolder, streamWrapper.getName());

                //Get the stream from StreamWrapper instance
                let readStream = streamWrapper.getStream();

                //Write the stream to the destination file.
                fs.writeFileSync(fileName, readStream);
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {
                //Get the received APIException instance
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

module.exports = { FieldAttachment }