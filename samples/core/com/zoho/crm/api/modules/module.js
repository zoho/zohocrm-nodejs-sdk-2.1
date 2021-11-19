const { ModulesOperations, GetModulesHeader } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/modules_operations");
const HeaderMap = require("@zohocrm/nodejs-sdk-2.1/routes/header_map").HeaderMap;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/success_response").SuccessResponse;
const ZCRMProfile = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/profiles/profile").Profile;
const ZCRMModule = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/module").Module;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/body_wrapper").BodyWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/action_wrapper").ActionWrapper;

class Module {
    /**
     * <h3> Get Modules </h3>
     * This method is used to get metadata about all the modules and print the response.
     */
    static async getModules() {
        //Get instance of ModulesOperations Class
        let modulesOperations = new ModulesOperations();

        //Get the instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        //Add header to HeaderMap instance, if necessary
        // await headerInstance.add(GetModulesHeader.IF_MODIFIED_SINCE, new Date("2020-07-13T12:12:12+05:30"));

        //Call getModules method that takes headerInstance as parameters
        let response = await modulesOperations.getModules(headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ResponseWrapper instance is received.
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Module instances
                    let modules = responseObject.getModules();

                    modules.forEach(module => {
                        //Get the GlobalSearchSupported of each Module
                        console.log("Module GlobalSearchSupported: " + module.getGlobalSearchSupported());

                        //Get the Deletable of each Module
                        console.log("Module Deletable: " + module.getDeletable());

                        //Get the Description of each Module
                        console.log("Module Description: " + module.getDescription());

                        //Get the Creatable of each Module
                        console.log("Module Creatable: " + module.getCreatable());

                        //Get the InventoryTemplateSupported of each Module
                        console.log("Module InventoryTemplateSupported: " + module.getInventoryTemplateSupported());

                        if (module.getModifiedTime() != null) {
                            //Get the ModifiedTime of each Module
                            console.log("Module ModifiedTime: " + module.getModifiedTime());
                        }

                        //Get the PluralLabel of each Module
                        console.log("Module PluralLabel: " + module.getPluralLabel());

                        //Get the PresenceSubMenu of each Module
                        console.log("Module PresenceSubMenu: " + module.getPresenceSubMenu());

                        //Get the TriggersSupported of each Module
                        console.log("Module TriggersSupported: " + module.getTriggersSupported());

                        //Get the Id of each Module
                        console.log("Module Id: " + module.getId());

                        //Get the IsBlueprintSupported of each Module
                        console.log("Module IsBlueprintSupported: " + module.getIsblueprintsupported());

                        //Get the Visible of each Module
                        console.log("Module Visible: " + module.getVisible());

                        //Get the Visibility of each Module
                        console.log("Module Visibility: " + module.getVisibility());

                        //Get the Convertable of each Module
                        console.log("Module Convertable: " + module.getConvertable());

                        //Get the Editable of each Module
                        console.log("Module Editable: " + module.getEditable());

                        //Get the EmailtemplateSupport of each Module
                        console.log("Module EmailtemplateSupport: " + module.getEmailtemplateSupport());

						//Get List of properties field APIName
						let onDemandProperties = module.getOnDemandProperties();
						
						if(onDemandProperties != null) {
							onDemandProperties.forEach(fieldName => {
								//Get the Field Name
								console.log("Module onDemandProperties Fields: " + fieldName);
							});
						}

                        //Get the list of Profile instance each Module
                        let profiles = module.getProfiles();

                        //Check if profiles is not null
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                //Get the Name of each Profile
                                console.log("Module Profile Name: " + profile.getName());

                                //Get the Id of each Profile
                                console.log("Module Profile Id: " + profile.getId());
                            });
                        }

                        //Get the FilterSupported of each Module
                        console.log("Module FilterSupported: " + module.getFilterSupported());

                        //Get the ShowAsTab of each Module
                        console.log("Module ShowAsTab: " + module.getShowAsTab());

                        //Get the WebLink of each Module
                        console.log("Module WebLink: " + module.getWebLink());

                        //Get the SequenceNumber of each Module
                        console.log("Module SequenceNumber: " + module.getSequenceNumber());

                        //Get the SingularLabel of each Module
                        console.log("Module SingularLabel: " + module.getSingularLabel());

                        //Get the Viewable of each Module
                        console.log("Module Viewable: " + module.getViewable());

                        //Get the APISupported of each Module
                        console.log("Module APISupported: " + module.getAPISupported());

                        //Get the APIName of each Module
                        console.log("Module APIName: " + module.getAPIName());

                        //Get the QuickCreate of each Module
                        console.log("Module QuickCreate: " + module.getQuickCreate());

                        //Get the modifiedBy User instance of each Module
                        let modifiedBy = module.getModifiedBy();

                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            //Get the name of the modifiedBy User
                            console.log("Module Modified By User-Name: " + modifiedBy.getName());

                            //Get the ID of the modifiedBy User
                            console.log("Module Modified By User-ID: " + modifiedBy.getId());
                        }

                        //Get the GeneratedType of each Module
                        console.log("Module GeneratedType: " + module.getGeneratedType().getValue());

                        //Get the FeedsRequired of each Module
                        console.log("Module FeedsRequired: " + module.getFeedsRequired());

                        //Get the ScoringSupported of each Module
                        console.log("Module ScoringSupported: " + module.getScoringSupported());

                        //Get the WebformSupported of each Module
                        console.log("Module WebformSupported: " + module.getWebformSupported());

                        //Get the list of Argument instance each Module
                        let moduleArguments = module.getArguments();

                        //Check if arguments is not null
                        if (moduleArguments != null) {
                            moduleArguments.forEach(argument => {
                                //Get the Name of each Argument
                                console.log("Module Argument Name: " + argument.getName());

                                //Get the Value of each Argument
                                console.log("Module Argument Value: " + argument.getValue());

                            });
                        }

                        //Get the ModuleName of each Module
                        console.log("Module ModuleName: " + module.getModuleName());

                        //Get the BusinessCardFieldLimit of each Module
                        console.log("Module BusinessCardFieldLimit: " + module.getBusinessCardFieldLimit());

                        //Get the parentModule Module instance of each Module
                        let parentModule = module.getParentModule();

                        //Check if arguments is not null
                        if (parentModule != null && parentModule.getAPIName() != null) {
                            //Get the Name of Parent Module
                            console.log("Module Parent Module Name: " + parentModule.getAPIName());

                            //Get the Value of Parent Module
                            console.log("Module Parent Module Id: " + parentModule.getId());
                        }
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Get Module </h3>
     * This method is used to get metadata about single module with it's API Name and print the response.
     * @param {String} moduleAPIName The API Name of the module to obtain metadata
     */
    static async getModule(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of ModulesOperations Class
        let modulesOperations = new ModulesOperations();

        //Call getModule method that takes moduleAPIName as parameter
        let response = await modulesOperations.getModule(moduleAPIName);

        if (response != null) {

            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ResponseWrapper instance is received.
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Module instances
                    let modules = responseObject.getModules();

                    modules.forEach(async module => {
                        //Get the GlobalSearchSupported of each Module
                        console.log("Module GlobalSearchSupported: " + module.getGlobalSearchSupported());

                        if (module.getKanbanView() != null) {
                            //Get the KanbanView of each Module
                            console.log("Module KanbanView: " + module.getKanbanView());
                        }

                        //Get the Deletable of each Module
                        console.log("Module Deletable: " + module.getDeletable());

                        //Get the Description of each Module
                        console.log("Module Description: " + module.getDescription());

                        //Get the Creatable of each Module
                        console.log("Module Creatable: " + module.getCreatable());

                        if (module.getFilterStatus() != null) {
                            //Get the FilterStatus of each Module
                            console.log("Module FilterStatus: " + module.getFilterStatus());
                        }

                        //Get the InventoryTemplateSupported of each Module
                        console.log("Module InventoryTemplateSupported: " + module.getInventoryTemplateSupported());

                        if (module.getModifiedTime() != null) {
                            //Get the ModifiedTime of each Module
                            console.log("Module ModifiedTime: " + module.getModifiedTime());
                        }

                        //Get the PluralLabel of each Module
                        console.log("Module PluralLabel: " + module.getPluralLabel());

                        //Get the PresenceSubMenu of each Module
                        console.log("Module PresenceSubMenu: " + module.getPresenceSubMenu());

                        //Get the TriggersSupported of each Module
                        console.log("Module TriggersSupported: " + module.getTriggersSupported());

                        //Get the Id of each Module
                        console.log("Module Id: " + module.getId());

                        //Get the IsBlueprintSupported of each Module
                        console.log("Module IsBlueprintSupported: " + module.getIsblueprintsupported());

                        //Get the RelatedListProperties instance of each Module
                        let relatedListProperties = module.getRelatedListProperties();

                        //Check if relatedListProperties is not null
                        if (relatedListProperties != null) {
                            //Get the SortBy of RelatedListProperties
                            console.log("Module RelatedListProperties SortBy: " + relatedListProperties.getSortBy());

                            //Get List of fields APIName
                            let fields = relatedListProperties.getFields();

                            //Check if fields is not null
                            if (fields != null) {
                                fields.forEach(fieldName => {
                                    //Get the Field Name
                                    console.log("Module RelatedListProperties Fields: " + fieldName);
                                });
                            }

                            //Get the SortOrder of RelatedListProperties
                            console.log("Module RelatedListProperties SortOrder: " + relatedListProperties.getSortOrder());
                        }

                        //Get the PerPage of each Module
                        console.log("Module PerPage: " + module.getPerPage());

                        //Get List of properties field APIName
                        let properties = module.getProperties();

                        //Check if properties is not null
                        if (properties != null) {
                            properties.forEach(fieldName => {
                                //Get the Field Name
                                console.log("Module Properties Fields: " + fieldName);
                            });
                        }

						//Get the Visibility of each Module
						console.log("Module visible: " + module.getVisible());

                        //Get the Visibility of each Module
                        console.log("Module Visibility: " + module.getVisibility());

                        //Get the Convertable of each Module
                        console.log("Module Convertable: " + module.getConvertable());

                        //Get the Editable of each Module
                        console.log("Module Editable: " + module.getEditable());

                        //Get the EmailtemplateSupport of each Module
                        console.log("Module EmailtemplateSupport: " + module.getEmailtemplateSupport());

                        //Get the list of Profile instance each Module
                        let profiles = module.getProfiles();

                        //Check if profiles is not null
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                //Get the Name of each Profile
                                console.log("Module Profile Name: " + profile.getName());

                                //Get the Id of each Profile
                                console.log("Module Profile Id: " + profile.getId());
                            });
                        }

                        //Get the FilterSupported of each Module
                        console.log("Module FilterSupported: " + module.getFilterSupported());

                        //Get List of properties field APIName
						let onDemandProperties = module.getOnDemandProperties();
						
						if(onDemandProperties != null) {
							onDemandProperties.forEach(fieldName => {
								//Get the Field Name
								console.log("Module onDemandProperties Fields: " + fieldName);
							});
						}

                        //Get the DisplayField of each Module
                        console.log("Module DisplayField: " + module.getDisplayField());

                        //Get List of SearchLayoutFields APIName
                        let searchLayoutFields = module.getSearchLayoutFields();

                        //Check if searchLayoutFields is not null
                        if (searchLayoutFields != null) {
                            searchLayoutFields.forEach(fieldName => {
                                //Get the Field Name
                                console.log("Module SearchLayoutFields Fields: " + fieldName);
                            });
                        }

                        if (module.getKanbanViewSupported() != null) {
                            //Get the KanbanViewSupported of each Module
                            console.log("Module KanbanViewSupported: " + module.getKanbanViewSupported());
                        }

                        //Get the ShowAsTab of each Module
                        console.log("Module ShowAsTab: " + module.getShowAsTab());

                        //Get the WebLink of each Module
                        console.log("Module WebLink: " + module.getWebLink());

                        //Get the SequenceNumber of each Module
                        console.log("Module SequenceNumber: " + module.getSequenceNumber());

                        //Get the SingularLabel of each Module
                        console.log("Module SingularLabel: " + module.getSingularLabel());

                        //Get the Viewable of each Module
                        console.log("Module Viewable: " + module.getViewable());

                        //Get the APISupported of each Module
                        console.log("Module APISupported: " + module.getAPISupported());

                        //Get the APIName of each Module
                        console.log("Module APIName: " + module.getAPIName());

                        //Get the QuickCreate of each Module
                        console.log("Module QuickCreate: " + module.getQuickCreate());

                        //Get the modifiedBy User instance of each Module
                        let modifiedBy = module.getModifiedBy();

                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            //Get the name of the modifiedBy User
                            console.log("Module Modified By User-Name: " + modifiedBy.getName());

                            //Get the ID of the modifiedBy User
                            console.log("Module Modified By User-ID: " + modifiedBy.getId());
                        }

                        //Get the GeneratedType of each Module
                        console.log("Module GeneratedType: " + module.getGeneratedType().getValue());

                        //Get the FeedsRequired of each Module
                        console.log("Module FeedsRequired: " + module.getFeedsRequired());

                        //Get the ScoringSupported of each Module
                        console.log("Module ScoringSupported: " + module.getScoringSupported());

                        //Get the WebformSupported of each Module
                        console.log("Module WebformSupported: " + module.getWebformSupported());

                        //Get the list of Argument instance each Module
                        let moduleArguments = module.getArguments();

                        //Check if arguments is not null
                        if (moduleArguments != null) {
                            moduleArguments.forEach(argument => {
                                //Get the Name of each Argument
                                console.log("Module Argument Name: " + argument.getName());

                                //Get the Value of each Argument
                                console.log("Module Argument Value: " + argument.getValue());
                            });
                        }

                        //Get the ModuleName of each Module
                        console.log("Module ModuleName: " + module.getModuleName());

                        //Get the BusinessCardFieldLimit of each Module
                        console.log("Module BusinessCardFieldLimit: " + module.getBusinessCardFieldLimit());

                        //Get the CustomView instance of each Module
                        let customView = module.getCustomView();

                        //Check if customView is not null
                        if (customView != null) {
                            await this.printCustomView(customView);
                        }

                        //Get the parentModule Module instance of each Module
                        let parentModule = module.getParentModule();

                        //Check if parentModule is not null
                        if (parentModule != null && parentModule.getAPIName() != null) {
                            //Get the Name of Parent Module
                            console.log("Module Parent Module Name: " + parentModule.getAPIName());

                            //Get the Value of Parent Module
                            console.log("Module Parent Module Id: " + parentModule.getId());
                        }

                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Update Module By APIName </h3>
     * This method is used to update module details using module APIName and print the response.
     * @param {String} moduleAPIName The API Name of the module to update
     */
    static async updateModuleByAPIName(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of ModulesOperations Class
        let modulesOperations = new ModulesOperations();

        let modulesArray = [];

        let profilesArray = [];

        //Get instance of Profile Class
        let profile = new ZCRMProfile();

        //To set the Profile Id
        profile.setId(34770610026014n);

        //Add Profile instance to the array
        profilesArray.push(profile);

        //Get instance of Module Class
        let module = new ZCRMModule();

        //Set the array to profiles in Module instance
        module.setProfiles(profilesArray);

        //Add the Module instance to array
        modulesArray.push(module);

        //Get instance of BodyWrapper Class which contains the request body
        let request = new BodyWrapper();

        //Set the array to modules in BodyWrapper instance
        request.setModules(modulesArray);

        //Call updateModuleByAPIName method that takes BodyWrapper instance and moduleAPIName as parameter
        let response = await modulesOperations.updateModuleByAPIName(moduleAPIName, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getModules();

                    actionResponses.forEach(actionResponse => {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        //Check if the request returned an exception
                        else if (actionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Update Module By Id </h3>
     * This method is used to update module details using module Id and print the response.
     * @param {BigInt} moduleId The ID of the module to be updated.
     */
    static async updateModuleById(moduleId) {
        //example
        //moduleId = 252001n

        //Get instance of ModulesOperations Class
        let modulesOperations = new ModulesOperations();

        let modulesArray = [];

        let profilesArray = [];

        //Get instance of Profile Class
        let profile = new ZCRMProfile();

        //Get instance of Module Class
        let module = new ZCRMModule();

        //To set the Profile Id
        profile.setId(34770610026014n);

        profile.setDelete(true);

        //Add the Profile instance to the array.
        profilesArray.push(profile);

        //Set profiles array to profiles in Module instance
        module.setProfiles(profilesArray);

        //Set the API Name to be modified
        module.setAPIName("Test1");

        //Add the Module instance to the array
        modulesArray.push(module);

        //Get instance of BodyWrapper Class that contains the request body
        let request = new BodyWrapper();

        //Set the array of module Instance to modules in BodyWrapper instance.
        request.setModules(modulesArray);

        //Call updateModuleById method that takes BodyWrapper instance and moduleAPIName as parameter
        let response = await modulesOperations.updateModuleById(moduleId, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getModules();

                    actionResponses.forEach(actionResponse => {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        //Check if the request returned an exception
                        else if (actionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    static async printCustomView(customView) {
        //Get the DisplayValue of the CustomView
        console.log("CustomView DisplayValue: " + customView.getDisplayValue());

        if(customView.getCreatedTime() != null) {
			//Get the CreatedTime of each Module
			console.log("Module CustomView CreatedTime: " + customView.getCreatedTime());
		}

		//Get the AccessType of the CustomView
		console.log("Module CustomView AccessType: " + customView.getAccessType());
		
        //Get the Criteria instance of the CustomView
        let criteria = customView.getCriteria();

        if (criteria != null) {
            await this.printCriteria(criteria);
        }

        //Get the SystemName of the CustomView
        console.log("CustomView SystemName: " + customView.getSystemName());

        //Get the SortBy of the the CustomView
        console.log("CustomView SortBy: " + customView.getSortBy());
		
        //Get the CreatedBy User instance of each Module
		let createdBy = customView.getCreatedBy();
		
		//Check if createdBy is not null
		if(createdBy != null) {
			//Get the name of the createdBy User
			console.log("Module Created By User-Name: " + createdBy.getName());
			
			//Get the ID of the createdBy User
			console.log("Module Created By User-ID: " + createdBy.getId());
		}

        let sharedToDetails = customView.getSharedTo();
		
		if(sharedToDetails != null) {
			sharedToDetails.forEach(sharedTo => {
				//Get the Name of the each sharedTo
				console.log("SharedDetails Name: " + sharedTo.getName());
				
				//Get the ID of the each sharedTo
				console.log("SharedDetails ID: " + sharedTo.getId());
				
				//Get the Type of the each sharedTo
				console.log("SharedDetails Type: " + sharedTo.getType());
				
				//Get the Subordinates of the each sharedTo
				console.log("SharedDetails Subordinates: " + sharedTo.getSubordinates());
			});
		}

        //Get the Default of the CustomView
        console.log("CustomView Default: " + customView.getDefault());

		if(customView.getModifiedTime() != null) {
			//Get the ModifiedTime of each Module
			console.log("Module CustomView ModifiedTime: " + customView.getModifiedTime());
		}

        //Get the Name of the CustomView
        console.log("CustomView Name: " + customView.getName());

        //Get the SystemDefined of the CustomView
        console.log("CustomView SystemDefined: " + customView.getSystemDefined());

		//Get the ModifiedBy User instance of each Module
		let modifiedBy = customView.getModifiedBy();

		//Check if modifiedBy is not null
		if(modifiedBy != null) {
			//Get the name of the modifiedBy User
			console.log("Module Modified By User-Name: " + modifiedBy.getName());
			
			//Get the ID of the modifiedBy User
			console.log("Module Modified By User-ID: " + modifiedBy.getId());
		}

        //Get the ID of the CustomView
        console.log("CustomView ID: " + customView.getId());

        //Get the list of fields in the CustomView
        let fields = customView.getFields();

        if (fields != null) {
            console.log("Fields");

            fields.forEach(field => {
                //Get the APIName of the CustomView Field
                console.log("Module CustomView Field APIName: " + field.getAPIName());

                //Get the ID of the CustomView Field
                console.log("Module CustomView Field ID: " + field.getId());
            });
        }

        //Get the Category of the CustomView
        console.log("CustomView Category: " + customView.getCategory());

        if(customView.getLastAccessedTime() != null)
		{
			//Get the LastAccessedTime of each Module
			console.log("Module CustomView LastAccessedTime: " + customView.getLastAccessedTime());
		}

        if (customView.getFavorite() != null) {
            //Get the Favorite of the CustomView
            console.log("CustomView Favorite: " + customView.getFavorite());
        }

        if (customView.getSortOrder() != null) {
            //Get the SortOrder of the CustomView
            console.log("CustomView SortOrder: " + customView.getSortOrder());
        }
    }

    static async printCriteria(criteria) {
        if (criteria.getComparator() != null) {
            //Get the Comparator of the Criteria
            console.log("CustomView Criteria Comparator: " + criteria.getComparator().getValue());
        }

        if (criteria.getField() != null) {
            //Get the Field of the Criteria
            console.log("CustomView Criteria Field: " + criteria.getField());
        }

        //Get the Field of the Criteria
        let field = criteria.getField();

        if (field != null) {
            console.log("CustomView Criteria Field APIName : " + field.getAPIName());

            console.log("CustomView Criteria Field Id: " + field.getId());
        }

        if (criteria.getValue() != null) {
            //Get the Value of the Criteria
            console.log("CustomView Criteria Value: " + criteria.getValue());
        }

        // Get the List of Criteria instance of each Criteria
        let criteriaGroup = criteria.getGroup();

        if (criteriaGroup != null) {
            criteriaGroup.forEach(async eachCriteria => {
                await this.printCriteria(eachCriteria);
            });
        }

        if (criteria.getGroupOperator() != null) {
            //Get the Group Operator of the Criteria
            console.log("CustomView Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }
}

module.exports = { Module }