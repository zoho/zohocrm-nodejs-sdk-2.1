import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetRoles{
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
    static async getRoles() {
        let rolesOperations = new ZOHOCRMSDK.Roles.RolesOperations();
        //Call getRoles method
        let response = await rolesOperations.getRoles();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Roles.ResponseWrapper) {
                    let roles = responseObject.getRoles();
                    roles.forEach(async role => {
                        console.log("Role DisplayLabel: " + role.getDisplayLabel());
                        let forecastManager = role.getForecastManager();
                        if (forecastManager != null) {
                            console.log("Role Forecast Manager User-ID: " + forecastManager.getId());
                            console.log("Role Forecast Manager User-Name: " + forecastManager.getName());
                        }
                        console.log("Role ShareWithPeers: " + role.getShareWithPeers());
                        console.log("Role Name: " + role.getName());
                        console.log("Role Description: " + role.getDescription());
                        console.log("Role ID: " + role.getId());
                        let reportingTo = role.getReportingTo();
                        if (reportingTo != null) {
                            console.log("Role ReportingTo User-ID: " + reportingTo.getId());
                            console.log("Role ReportingTo User-Name: " + reportingTo.getName());
                        }
                        console.log("Role AdminUser: " + role.getAdminUser().toString());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Roles.APIException) {
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
await GetRoles.initialize();
await GetRoles.getRoles();
export {
    GetRoles as GetRoles
}
