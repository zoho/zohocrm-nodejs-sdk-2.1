const { EmailTemplatesOperations, GetEmailTemplatesParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/email_templates/email_templates_operations");
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/email_templates/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/email_templates/api_exception").APIException;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;

class EmailTemplate {
    static async getEmailTemplates(moduleAPIName) {
        //Get instance of EmailTemplatesOperations Class
        let emailTemplatesOperations = new EmailTemplatesOperations();

        let paramInstance = new ParameterMap();

        paramInstance.add(GetEmailTemplatesParam.MODULE, moduleAPIName);

        //Call getEmailTemplates method that takes ParameterMap instance as parameter
        let response = await emailTemplatesOperations.getEmailTemplates(paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained EmailTemplate instances
                let emailTemplates = responseWrapper.getEmailTemplates();

                emailTemplates.forEach(emailTemplate => {
                    //Get the CreatedTime of each EmailTemplate
                    console.log("EmailTemplate CreatedTime: " + emailTemplate.getCreatedTime());

                    let attachments = emailTemplate.getAttachments();

                    if (attachments != null) {
                        attachments.forEach(attachment => {
                            //Get the Size of each Attachment
                            console.log("Attachment Size: " + attachment.getSize());

                            //Get the FileId of each Attachment
                            console.log("Attachment FileId: " + attachment.getFileId());

                            //Get the FileName of each Attachment
                            console.log("Attachment FileName: " + attachment.getFileName());

                            //Get the Id of each Attachment
                            console.log("Attachment ID: " + attachment.getId());
                        });
                    }

                    //Get the Subject of each EmailTemplate
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());

                    let module = emailTemplate.getModule();

                    if (module != null) {
                        //Get the Module Name of the EmailTemplate
                        console.log("EmailTemplate Module Name : " + module.getAPIName());

                        //Get the Module Id of the EmailTemplate
                        console.log("EmailTemplate Module Id : " + module.getId());
                    }

                    //Get the Type of each EmailTemplate
                    console.log("EmailTemplate Type: " + emailTemplate.getType());

                    //Get the CreatedBy User instance of each EmailTemplate
                    let createdBy = emailTemplate.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Id of the CreatedBy User
                        console.log("EmailTemplate Created By User-ID: " + createdBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("EmailTemplate Created By User-Name: " + createdBy.getName());

                        //Get the Email of the CreatedBy User
                        console.log("EmailTemplate Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the ModifiedTime of each EmailTemplate
                    console.log("EmailTemplate ModifiedTime: " + emailTemplate.getModifiedTime());

                    //Get the Folder instance of each EmailTemplate
                    let folder = emailTemplate.getFolder();

                    //Check if folder is not null
                    if (folder != null) {
                        //Get the Id of the Folder
                        console.log("EmailTemplate Folder Id: " + folder.getId());

                        //Get the Name of the Folder
                        console.log("EmailTemplate Folder Name: " + folder.getName());
                    }

                    //Get the LastUsageTime of each EmailTemplate
                    console.log("EmailTemplate LastUsageTime: " + emailTemplate.getLastUsageTime());

                    //Get the Associated of each EmailTemplate
                    console.log("EmailTemplate Associated: " + emailTemplate.getAssociated());

                    //Get the name of each EmailTemplate
                    console.log("EmailTemplate Name: " + emailTemplate.getName());

                    //Get the ConsentLinked of each EmailTemplate
                    console.log("EmailTemplate ConsentLinked: " + emailTemplate.getConsentLinked());

                    //Get the modifiedBy User instance of each EmailTemplate
                    let modifiedBy = emailTemplate.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the ModifiedBy User
                        console.log("EmailTemplate Modified By User-ID: " + modifiedBy.getId());

                        //Get the Name of the Modified User
                        console.log("EmailTemplate Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the Modified User
                        console.log("EmailTemplate Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ID of each EmailTemplate
                    console.log("EmailTemplate ID: " + emailTemplate.getId());

                    console.log("EmailTemplate Content: " + emailTemplate.getContent());

                    // Get the Description of each EmailTemplate
                    console.log("EmailTemplate Description: " + emailTemplate.getDescription());

                    //Get the EditorMode each EmailTemplate
                    console.log("EmailTemplate EditorMode: " + emailTemplate.getEditorMode());

                    //Get the Favorite of each EmailTemplate
                    console.log("EmailTemplate Favorite: " + emailTemplate.getFavorite());

                    // Get the Favourite of each EmailTemplate
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                });

                let info = responseWrapper.getInfo();

                console.log("EmailTemplate Info PerPage : " + info.getPerPage());

                console.log("EmailTemplate Info Count : " + info.getCount());

                console.log("EmailTemplate Info Page : " + info.getPage());

                console.log("EmailTemplate Info MoreRecords : " + info.getMoreRecords());
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + responseHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + responseHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = responseHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }

    static async getEmailTemplateById(Id) {
        //Get instance of EmailTemplatesOperations Class
        let emailTemplatesOperations = new EmailTemplatesOperations();

        //Call getEmailTemplateById method that takes Id as parameter
        let response = await emailTemplatesOperations.getEmailTemplateById(Id);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained EmailTemplate instances
                let emailTemplates = responseWrapper.getEmailTemplates();

                emailTemplates.forEach(emailTemplate => {
                    //Get the CreatedTime of each EmailTemplate
                    console.log("EmailTemplate CreatedTime: " + emailTemplate.getCreatedTime());

                    let attachments = emailTemplate.getAttachments();

                    if (attachments != null) {
                        attachments.forEach(attachment => {
                            //Get the Size of each Attachment
                            console.log("Attachment Size: " + attachment.getSize());

                            //Get the FileId of each Attachment
                            console.log("Attachment FileId: " + attachment.getFileId());

                            //Get the FileName of each Attachment
                            console.log("Attachment FileName: " + attachment.getFileName());

                            //Get the Id of each Attachment
                            console.log("Attachment ID: " + attachment.getId());
                        });
                    }

                    //Get the Subject of each EmailTemplate
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());

                    let module = emailTemplate.getModule();

                    if (module != null) {
                        //Get the Module Name of the EmailTemplate
                        console.log("EmailTemplate Module Name : " + module.getAPIName());

                        //Get the Module Id of the EmailTemplate
                        console.log("EmailTemplate Module Id : " + module.getId());
                    }

                    //Get the Type of each EmailTemplate
                    console.log("EmailTemplate Type: " + emailTemplate.getType());

                    //Get the CreatedBy User instance of each EmailTemplate
                    let createdBy = emailTemplate.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Id of the CreatedBy User
                        console.log("EmailTemplate Created By User-ID: " + createdBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("EmailTemplate Created By User-Name: " + createdBy.getName());

                        //Get the Email of the CreatedBy User
                        console.log("EmailTemplate Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the ModifiedTime of each EmailTemplate
                    console.log("EmailTemplate ModifiedTime: " + emailTemplate.getModifiedTime());

                    //Get the Folder instance of each EmailTemplate
                    let folder = emailTemplate.getFolder();

                    //Check if folder is not null
                    if (folder != null) {
                        //Get the Id of the Folder
                        console.log("EmailTemplate Folder Id: " + folder.getId());

                        //Get the Name of the Folder
                        console.log("EmailTemplate Folder Name: " + folder.getName());
                    }

                    //Get the LastUsageTime of each EmailTemplate
                    console.log("EmailTemplate LastUsageTime: " + emailTemplate.getLastUsageTime());

                    //Get the Associated of each EmailTemplate
                    console.log("EmailTemplate Associated: " + emailTemplate.getAssociated());

                    //Get the name of each EmailTemplate
                    console.log("EmailTemplate Name: " + emailTemplate.getName());

                    //Get the ConsentLinked of each EmailTemplate
                    console.log("EmailTemplate ConsentLinked: " + emailTemplate.getConsentLinked());

                    //Get the modifiedBy User instance of each EmailTemplate
                    let modifiedBy = emailTemplate.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the ModifiedBy User
                        console.log("EmailTemplate Modified By User-ID: " + modifiedBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("EmailTemplate Modified By user-Name: " + modifiedBy.getName());

                        //Get the Email of the Modified User
                        console.log("EmailTemplate Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ID of each EmailTemplate
                    console.log("EmailTemplate ID: " + emailTemplate.getId());

                    console.log("EmailTemplate Content: " + emailTemplate.getContent());

                    // Get the Description of each EmailTemplate
                    console.log("EmailTemplate Description: " + emailTemplate.getDescription());

                    //Get the EditorMode each EmailTemplate
                    console.log("EmailTemplate EditorMode: " + emailTemplate.getEditorMode());

                    //Get the Favorite of each EmailTemplate
                    console.log("EmailTemplate Favorite: " + emailTemplate.getFavorite());

                    // Get the Favourite of each EmailTemplate
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                });
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + responseHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + responseHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = responseHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }
}

module.exports = { EmailTemplate }