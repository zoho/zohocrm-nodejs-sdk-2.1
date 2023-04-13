import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class SendMail{
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
    static async sendMail(recordId, moduleAPIName) {
        let sendMailOperations = new ZOHOCRMSDK.SendMail.SendMailOperations();
        let mail = new ZOHOCRMSDK.SendMail.Mail();
        let from = new ZOHOCRMSDK.SendMail.UserAddress();
        from.setUserName("sender name");
        from.setEmail("sendername@gmail.com");
        mail.setFrom(from);
        let to = new ZOHOCRMSDK.SendMail.UserAddress();
        to.setUserName("reciever name");
        to.setEmail("recievername@gmail.com");
        mail.setTo([to]);
        mail.setSubject("Mail subject");
        mail.setContent("<br><a href=\"{ConsentForm.en_US}\" id=\"ConsentForm\" class=\"en_US\" target=\"_blank\">Consent form link</a><br><br><br><br><br><h3><span style=\"background-color: rgb(254, 255, 102)\">REGARDS,</span></h3><div><span style=\"background-color: rgb(254, 255, 102)\">AZ</span></div><div><span style=\"background-color: rgb(254, 255, 102)\">ADMIN</span></div> <div></div>");
        mail.setConsentEmail(true);
        mail.setMailFormat("html");
        let template = new ZOHOCRMSDK.EmailTemplates.EmailTemplate();
        template.setId(440248000000000010n);
        template.setSubject("testing the template");
        mail.setTemplate(template);
        let wrapper = new ZOHOCRMSDK.SendMail.BodyWrapper();
        wrapper.setData([mail]);
        //Call sendMail method
        let response = await sendMailOperations.sendMail(recordId, moduleAPIName, wrapper);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.SendMail.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.SendMail.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.SendMail.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.SendMail.APIException) {
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
await SendMail.initialize();
let recordId = 440248000000774074n;
let moduleAPIName = "leads";
await SendMail.sendMail(recordId,moduleAPIName);
export {
    SendMail as SendMail
}
