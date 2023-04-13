import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetModule{
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
     * <h3> Get Module </h3>
     * This method is used to get metadata about single module with it's API Name and print the response.
     * @param {String} moduleAPIName The API Name of the module to obtain metadata
     */
    static async getModule(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let modulesOperations = new ZOHOCRMSDK.Modules.ModulesOperations();
        //Call getModule method that takes moduleAPIName as parameter
        let response = await modulesOperations.getModule(moduleAPIName);
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
                    for (const module of modules) {
                        console.log("Module GlobalSearchSupported: " + module.getGlobalSearchSupported());
                        if (module.getKanbanView() != null) {
                            console.log("Module KanbanView: " + module.getKanbanView());
                        }
                        console.log("Module Deletable: " + module.getDeletable());
                        console.log("Module Description: " + module.getDescription());
                        console.log("Module Creatable: " + module.getCreatable());
                        if (module.getFilterStatus() != null) {
                            console.log("Module FilterStatus: " + module.getFilterStatus());
                        }
                        console.log("Module InventoryTemplateSupported: " + module.getInventoryTemplateSupported());
                        if (module.getModifiedTime() != null) {
                            console.log("Module ModifiedTime: " + module.getModifiedTime());
                        }
                        console.log("Module PluralLabel: " + module.getPluralLabel());
                        console.log("Module PresenceSubMenu: " + module.getPresenceSubMenu());
                        console.log("Module TriggersSupported: " + module.getTriggersSupported());
                        console.log("Module Id: " + module.getId());
                        console.log("Module IsBlueprintSupported: " + module.getIsblueprintsupported());
                        let relatedListProperties = module.getRelatedListProperties();
                        if (relatedListProperties != null) {
                            console.log("Module RelatedListProperties SortBy: " + relatedListProperties.getSortBy());
                            let fields = relatedListProperties.getFields();
                            if (fields != null) {
                                fields.forEach(fieldName => {
                                    console.log("Module RelatedListProperties Fields: " + fieldName);
                                });
                            }
                            console.log("Module RelatedListProperties SortOrder: " + relatedListProperties.getSortOrder());
                        }
                        console.log("Module PerPage: " + module.getPerPage());
                        let properties = module.getProperties();
                        if (properties != null) {
                            properties.forEach(fieldName => {
                                console.log("Module Properties Fields: " + fieldName);
                            });
                        }
                        console.log("Module visible: " + module.getVisible());
                        console.log("Module Visibility: " + module.getVisibility());
                        console.log("Module Convertable: " + module.getConvertable());
                        console.log("Module Editable: " + module.getEditable());
                        console.log("Module EmailtemplateSupport: " + module.getEmailtemplateSupport());
                        let profiles = module.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Module Profile Name: " + profile.getName());
                                console.log("Module Profile Id: " + profile.getId());
                            });
                        }
                        console.log("Module FilterSupported: " + module.getFilterSupported());
                        let onDemandProperties = module.getOnDemandProperties();
                        if(onDemandProperties != null) {
                            onDemandProperties.forEach(fieldName => {
                                console.log("Module onDemandProperties Fields: " + fieldName);
                            });
                        }
                        console.log("Module DisplayField: " + module.getDisplayField());
                        let searchLayoutFields = module.getSearchLayoutFields();
                        if (searchLayoutFields != null) {
                            searchLayoutFields.forEach(fieldName => {
                                console.log("Module SearchLayoutFields Fields: " + fieldName);
                            });
                        }
                        if (module.getKanbanViewSupported() != null) {
                            console.log("Module KanbanViewSupported: " + module.getKanbanViewSupported());
                        }
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
                        let customView = module.getCustomView();
                        if (customView != null) {
                            await this.printCustomView(customView);
                        }
                        let parentModule = module.getParentModule();
                        if (parentModule != null && parentModule.getAPIName() != null) {
                            console.log("Module Parent Module Name: " + parentModule.getAPIName());
                            console.log("Module Parent Module Id: " + parentModule.getId());
                        }
                    }
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
    static async printCustomView(customView) {
        console.log("CustomView DisplayValue: " + customView.getDisplayValue());
        if(customView.getCreatedTime() != null) {
            console.log("Module CustomView CreatedTime: " + customView.getCreatedTime());
        }
        console.log("Module CustomView AccessType: " + customView.getAccessType());
        let criteria = customView.getCriteria();
        if (criteria != null) {
            await this.printCriteria(criteria);
        }
        console.log("CustomView SystemName: " + customView.getSystemName());
        console.log("CustomView SortBy: " + customView.getSortBy());
        let createdBy = customView.getCreatedBy();
        if(createdBy != null) {
            console.log("Module Created By User-Name: " + createdBy.getName());
            console.log("Module Created By User-ID: " + createdBy.getId());
        }
        let sharedToDetails = customView.getSharedTo();
        if(sharedToDetails != null) {
            sharedToDetails.forEach(sharedTo => {
                console.log("SharedDetails Name: " + sharedTo.getName());
                console.log("SharedDetails ID: " + sharedTo.getId());
                console.log("SharedDetails Type: " + sharedTo.getType());
                console.log("SharedDetails Subordinates: " + sharedTo.getSubordinates());
            });
        }
        console.log("CustomView Default: " + customView.getDefault());
        if(customView.getModifiedTime() != null) {
            console.log("Module CustomView ModifiedTime: " + customView.getModifiedTime());
        }
        console.log("CustomView Name: " + customView.getName());
        console.log("CustomView SystemDefined: " + customView.getSystemDefined());
        let modifiedBy = customView.getModifiedBy();
        if(modifiedBy != null) {
            console.log("Module Modified By User-Name: " + modifiedBy.getName());
            console.log("Module Modified By User-ID: " + modifiedBy.getId());
        }
        console.log("CustomView ID: " + customView.getId());
        let fields = customView.getFields();
        if (fields != null) {
            console.log("Fields");
            fields.forEach(field => {
                console.log("Module CustomView Field APIName: " + field.getAPIName());
                console.log("Module CustomView Field ID: " + field.getId());
            });
        }
        console.log("CustomView Category: " + customView.getCategory());
        if(customView.getLastAccessedTime() != null)
        {
            console.log("Module CustomView LastAccessedTime: " + customView.getLastAccessedTime());
        }
        if (customView.getFavorite() != null) {
            console.log("CustomView Favorite: " + customView.getFavorite());
        }
        if (customView.getSortOrder() != null) {
            console.log("CustomView SortOrder: " + customView.getSortOrder());
        }
    }
    static async printCriteria(criteria) {
        if (criteria.getComparator() != null) {
            console.log("CustomView Criteria Comparator: " + criteria.getComparator().getValue());
        }
        if (criteria.getField() != null) {
            console.log("CustomView Criteria Field: " + criteria.getField());
        }
        let field = criteria.getField();
        if (field != null) {
            console.log("CustomView Criteria Field APIName : " + field.getAPIName());
            console.log("CustomView Criteria Field Id: " + field.getId());
        }
        if (criteria.getValue() != null) {
            console.log("CustomView Criteria Value: " + criteria.getValue());
        }
        let criteriaGroup = criteria.getGroup();
        if (criteriaGroup != null) {
            criteriaGroup.forEach(async eachCriteria => {
                await this.printCriteria(eachCriteria);
            });
        }
        if (criteria.getGroupOperator() != null) {
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }
}
await GetModule.initialize();
let moduleAPIName = "leads"
await GetModule.getModule(moduleAPIName);
export {
    GetModule as GetModule
}
