import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetWizards{
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
    static async getWizards() {
        let wizardsOperations = new ZOHOCRMSDK.Wizards.WizardsOperations();
        //Call getWizards method
        let response = await wizardsOperations.getWizards();
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            //Get object from response
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Wizards.ResponseWrapper) {
                let responseWrapper = responseHandler;
                //Get the list of obtained Wizard instances
                let wizards = responseWrapper.getWizards();
                wizards.forEach(wizard => {
                    console.log("Wizard CreatedTime: " + wizard.getCreatedTime());
                    //Get the PermissionType of each Wizard
                    console.log("Wizard ModifiedTime: " + wizard.getModifiedTime());
                    //Get the manager User instance of each Wizard
                    let module = wizard.getModule();
                    //Check if manager is not null
                    if (module != null) {
                        console.log("Wizard Module APIName: " + module.getAPIName());
                        //Get the ID of the Manager
                        console.log("Wizard Module Id: " + module.getId());
                    }
                    //Get the Name of each Wizard
                    console.log("Wizard Name: " + wizard.getName());
                    //Get the modifiedBy User instance of each Wizard
                    let modifiedBy = wizard.getModifiedBy();
                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        console.log("Wizard Modified By User-Name: " + modifiedBy.getName());
                        //Get the ID of the modifiedBy User
                        console.log("Wizard Modified By User-ID: " + modifiedBy.getId());
                    }
                    //Get the array of Profile instance each Wizard
                    let profiles = wizard.getProfiles();
                    //Check if profiles is not null
                    if (profiles != null) {
                        profiles.forEach(profile => {
                            console.log("Wizard Profile Name: " + profile.getName());
                            //Get the ID of each Profile
                            console.log("Wizard Profile ID: " + profile.getId());
                        });
                    }
                    //Get the Active of each Wizard
                    console.log("Wizard Active: " + wizard.getActive());
                    //Get the array of Container instance each Wizard
                    let containers = wizard.getContainers();
                    //Check if containers is not null
                    if (containers != null) {
                        containers.forEach(container => {
                            let layout = container.getLayout();
                            //Check if layout is not null
                            if (layout != null) {
                                console.log("Wizard Container Layout Name: " + layout.getName());
                                //Get the ID of Layout
                                console.log("Wizard Container Layout ID: " + layout.getId());
                            }
                            //Get the ID of each Container
                            console.log("Wizard Container ID: " + container.getId());
                        });
                    }
                    //Get the ID of each Wizard
                    console.log("Wizard ID: " + wizard.getId());
                    //Get the createdBy User instance of each Wizard
                    let createdBy = wizard.getCreatedBy();
                    //Check if createdBy is not null
                    if (createdBy != null) {
                        console.log("Wizard Created By User-Name: " + createdBy.getName());
                        //Get the ID of the createdBy Wizard
                        console.log("Wizard Created By User-ID: " + createdBy.getId());
                    }
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Wizards.APIException) {
                let exception = responseHandler;
                //Get the Status
                console.log("Status: ".exception.getStatus().getValue());
                //Get the Code
                console.log("Code: ".exception.getCode().getValue());
                console.log("Details: ");
                //Get the details map
                let details = exception.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                //Get the Message
                console.log("Message: ".exception.getMessage().getValue());
            }
        }
    }
}
await GetWizards.initialize();
await GetWizards.getWizards();
export {
    GetWizards as GetWizards
}
