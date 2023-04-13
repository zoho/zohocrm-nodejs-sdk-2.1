import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetEmailAddresses{
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
    static async getEmailAddresses() {
        let sendMailOperations = new ZOHOCRMSDK.SendMail.SendMailOperations();
        //Call getEmailAddresses method that takes ParameterMap instance as parameter
        let response = await sendMailOperations.getEmailAddresses();
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.SendMail.ResponseWrapper) {
                let responseWrapper = responseHandler;
                let emails = responseWrapper.getFromAddresses();
                for (let email of emails) {
                    console.log("UserName: " + email.getUserName());
                    console.log("Mail Type: " + email.getType());
                    console.log("Mail : " + email.getEmail());
                    console.log("Mail ID: " + email.getId());
                    console.log("Mail Default: " + email.getDefault());
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.SendMail.APIException) {
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
}
await GetEmailAddresses.initialize();
await GetEmailAddresses.getEmailAddresses();
export {
    GetEmailAddresses as GetEmailAddresses
}
