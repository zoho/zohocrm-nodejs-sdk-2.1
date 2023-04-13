import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetModules{
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
     * <h3> Get Modules </h3>
     * This method is used to get metadata about all the modules and print the response.
     */
    static async getModules() {
        let modulesOperations = new ZOHOCRMSDK.Modules.ModulesOperations();
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        //Add header to HeaderMap instance, if necessary
        await headerInstance.add(ZOHOCRMSDK.Modules.GetModulesHeader.IF_MODIFIED_SINCE, new Date("2020-07-13T12:12:12+05:30"));
        //Call getModules method that takes headerInstance as parameters
        let response = await modulesOperations.getModules(headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Modules.ResponseWrapper) {
                    let modules = responseObject.getModules();
                    modules.forEach(module => {
                        console.log("Module GlobalSearchSupported: " + module.getGlobalSearchSupported());
                        console.log("Module Deletable: " + module.getDeletable());
                        console.log("Module Description: " + module.getDescription());
                        console.log("Module Creatable: " + module.getCreatable());
                        console.log("Module InventoryTemplateSupported: " + module.getInventoryTemplateSupported());
                        if (module.getModifiedTime() != null) {
                            console.log("Module ModifiedTime: " + module.getModifiedTime());
                        }
                        console.log("Module PluralLabel: " + module.getPluralLabel());
                        console.log("Module PresenceSubMenu: " + module.getPresenceSubMenu());
                        console.log("Module TriggersSupported: " + module.getTriggersSupported());
                        console.log("Module Id: " + module.getId());
                        console.log("Module IsBlueprintSupported: " + module.getIsblueprintsupported());
                        console.log("Module Visible: " + module.getVisible());
                        console.log("Module Visibility: " + module.getVisibility());
                        console.log("Module Convertable: " + module.getConvertable());
                        console.log("Module Editable: " + module.getEditable());
                        console.log("Module EmailtemplateSupport: " + module.getEmailtemplateSupport());
                        let onDemandProperties = module.getOnDemandProperties();
                        if(onDemandProperties != null) {
                            onDemandProperties.forEach(fieldName => {
                                console.log("Module onDemandProperties Fields: " + fieldName);
                            });
                        }
                        let profiles = module.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Module Profile Name: " + profile.getName());
                                console.log("Module Profile Id: " + profile.getId());
                            });
                        }
                        console.log("Module FilterSupported: " + module.getFilterSupported());
                        console.log("Module ShowAsTab: " + module.getShowAsTab());
                        console.log("Module WebLink: " + module.getWebLink());
                        console.log("Module SequenceNumber: " + module.getSequenceNumber());
                        console.log("Module SingularLabel: " + module.getSingularLabel());
                        console.log("Module Viewable: " + module.getViewable());
                        console.log("Module APISupported: " + module.getAPISupported());
                        console.log("Module APIName: " + module.getAPIName());
                        console.log("Module QuickCreate: " + module.getQuickCreate());
                        let modifiedBy = module.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Module Modified By User-Name: " + modifiedBy.getName());
                            console.log("Module Modified By User-ID: " + modifiedBy.getId());
                        }
                        console.log("Module GeneratedType: " + module.getGeneratedType().getValue());
                        console.log("Module FeedsRequired: " + module.getFeedsRequired());
                        console.log("Module ScoringSupported: " + module.getScoringSupported());
                        console.log("Module WebformSupported: " + module.getWebformSupported());
                        let moduleArguments = module.getArguments();
                        if (moduleArguments != null) {
                            moduleArguments.forEach(argument => {
                                console.log("Module Argument Name: " + argument.getName());
                                console.log("Module Argument Value: " + argument.getValue());
                            });
                        }
                        console.log("Module ModuleName: " + module.getModuleName());
                        console.log("Module BusinessCardFieldLimit: " + module.getBusinessCardFieldLimit());
                        let parentModule = module.getParentModule();
                        if (parentModule != null && parentModule.getAPIName() != null) {
                            console.log("Module Parent Module Name: " + parentModule.getAPIName());
                            console.log("Module Parent Module Id: " + parentModule.getId());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Modules.APIException) {
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
await GetModules.initialize();
await GetModules.getModules();
export {
    GetModules as GetModules
}
