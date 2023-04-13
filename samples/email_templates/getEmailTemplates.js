import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetEmailTemplates{
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
    static async getEmailTemplates(moduleAPIName) {
        let emailTemplatesOperations = new ZOHOCRMSDK.EmailTemplates.EmailTemplatesOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.EmailTemplates.GetEmailTemplatesParam.MODULE, moduleAPIName);
        //Call getEmailTemplates method that takes ParameterMap instance as parameter
        let response = await emailTemplatesOperations.getEmailTemplates(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.EmailTemplates.ResponseWrapper) {
                let responseWrapper = responseHandler;
                let emailTemplates = responseWrapper.getEmailTemplates();
                emailTemplates.forEach(emailTemplate => {
                    console.log("EmailTemplate CreatedTime: " + emailTemplate.getCreatedTime());
                    let attachments = emailTemplate.getAttachments();
                    if (attachments != null) {
                        attachments.forEach(attachment => {
                            console.log("Attachment Size: " + attachment.getSize());
                            console.log("Attachment FileId: " + attachment.getFileId());
                            console.log("Attachment FileName: " + attachment.getFileName());
                            console.log("Attachment ID: " + attachment.getId());
                        });
                    }
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                    let module = emailTemplate.getModule();
                    if (module != null) {
                        console.log("EmailTemplate Module Name : " + module.getAPIName());
                        console.log("EmailTemplate Module Id : " + module.getId());
                    }
                    console.log("EmailTemplate Type: " + emailTemplate.getType());
                    let createdBy = emailTemplate.getCreatedBy();
                    if (createdBy != null) {
                        console.log("EmailTemplate Created By User-ID: " + createdBy.getId());
                        console.log("EmailTemplate Created By User-Name: " + createdBy.getName());
                        console.log("EmailTemplate Created By User-Email: " + createdBy.getEmail());
                    }
                    console.log("EmailTemplate ModifiedTime: " + emailTemplate.getModifiedTime());
                    let folder = emailTemplate.getFolder();
                    if (folder != null) {
                        console.log("EmailTemplate Folder Id: " + folder.getId());
                        console.log("EmailTemplate Folder Name: " + folder.getName());
                    }
                    console.log("EmailTemplate LastUsageTime: " + emailTemplate.getLastUsageTime());
                    console.log("EmailTemplate Associated: " + emailTemplate.getAssociated());
                    console.log("EmailTemplate Name: " + emailTemplate.getName());
                    console.log("EmailTemplate ConsentLinked: " + emailTemplate.getConsentLinked());
                    let modifiedBy = emailTemplate.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("EmailTemplate Modified By User-ID: " + modifiedBy.getId());
                        console.log("EmailTemplate Modified By User-Name: " + modifiedBy.getName());
                        console.log("EmailTemplate Modified By User-Email: " + modifiedBy.getEmail());
                    }
                    console.log("EmailTemplate ID: " + emailTemplate.getId());
                    console.log("EmailTemplate Content: " + emailTemplate.getContent());
                    console.log("EmailTemplate Description: " + emailTemplate.getDescription());
                    console.log("EmailTemplate EditorMode: " + emailTemplate.getEditorMode());
                    console.log("EmailTemplate Favorite: " + emailTemplate.getFavorite());
                    console.log("EmailTemplate Subject: " + emailTemplate.getSubject());
                });
                let info = responseWrapper.getInfo();
                console.log("EmailTemplate Info PerPage : " + info.getPerPage());
                console.log("EmailTemplate Info Count : " + info.getCount());
                console.log("EmailTemplate Info Page : " + info.getPage());
                console.log("EmailTemplate Info MoreRecords : " + info.getMoreRecords());
            }
            else if (responseHandler instanceof ZOHOCRMSDK.EmailTemplates.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }
    static async main(){
        await GetEmailTemplates.initialize();
        let moduleAPIName = "leads";
        await GetEmailTemplates.getEmailTemplates(moduleAPIName);
    }
}
GetEmailTemplates.main();
export {
    GetEmailTemplates as GetEmailTemplates
}
