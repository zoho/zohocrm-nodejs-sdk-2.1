const { InventoryTemplatesOperations, GetInventoryTemplatesParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/inventory_templates/inventory_templates_operations");
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/inventory_templates/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/inventory_templates/api_exception").APIException;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;

class InventoryTemplate {
    static async getInventoryTemplates() {
        let moduleAPIName = "Quotes";

        let sortBy = "modified_time";

        let sortOrder = "desc";

        let category = "created_by_me";

        //Get instance of InventoryTemplatesOperations Class
        let inventoryTemplatesOperations = new InventoryTemplatesOperations(sortBy, sortOrder, category);

        let paramInstance = new ParameterMap();

        paramInstance.add(GetInventoryTemplatesParam.MODULE, moduleAPIName);

        //Call getInventoryTemplates method that takes paramInstance as parameter
        let response = await inventoryTemplatesOperations.getInventoryTemplates(paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained InventoryTemplate instances
                let inventoryTemplates = responseWrapper.getInventoryTemplates();

                inventoryTemplates.forEach(inventoryTemplate => {
                    //Get the CreatedTime of each InventoryTemplate
                    console.log("InventoryTemplate CreatedTime: " + inventoryTemplate.getCreatedTime());

                    let module = inventoryTemplate.getModule();

                    if (module != null) {
                        //Get the Module Name of the InventoryTemplate
                        console.log("InventoryTemplate Module API Name : " + module.getAPIName());

                        //Get the Module Id of the InventoryTemplate
                        console.log("InventoryTemplate Module ID : " + module.getId());
                    }

                    //Get the Type of each InventoryTemplate
                    console.log("InventoryTemplate Type: " + inventoryTemplate.getType());

                    //Get the CreatedBy User instance of each InventoryTemplate
                    let createdBy = inventoryTemplate.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Id of the CreatedBy User
                        console.log("InventoryTemplate Created By User-ID: " + createdBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("InventoryTemplate Created By User-Name: " + createdBy.getName());
                    }

                    //Get the ModifiedTime of each InventoryTemplate
                    console.log("InventoryTemplate ModifiedTime: " + inventoryTemplate.getModifiedTime());

                    //Get the Folder instance of each InventoryTemplate
                    let folder = inventoryTemplate.getFolder();

                    //Check if folder is not null
                    if (folder != null) {
                        //Get the Id of the Folder
                        console.log("InventoryTemplate Folder Id: " + folder.getId());

                        //Get the Name of the Folder
                        console.log("InventoryTemplate Folder Name: " + folder.getName());
                    }

                    //Get the LastUsageTime of each InventoryTemplate
                    console.log("InventoryTemplate LastUsageTime: " + inventoryTemplate.getLastUsageTime());

                    // Get the Associated of each InventoryTemplate
                    console.log("InventoryTemplate Associated: " + inventoryTemplate.getAssociated());

                    //Get the name of each InventoryTemplate
                    console.log("InventoryTemplate Name: " + inventoryTemplate.getName());

                    //Get the modifiedBy User instance of each InventoryTemplate
                    let modifiedBy = inventoryTemplate.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the ModifiedBy User
                        console.log("InventoryTemplate Modified By User-ID: " + modifiedBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("InventoryTemplate Modified By User-Name: " + modifiedBy.getName());
                    }

                    //Get the ID of each InventoryTemplate
                    console.log("InventoryTemplate ID: " + inventoryTemplate.getId());

                    //Get the EditorMode each InventoryTemplate
                    console.log("InventoryTemplate EditorMode: " + inventoryTemplate.getEditorMode());

                    console.log("InventoryTemplate Content: " + inventoryTemplate.getContent());

                    // Get the Description of each InventoryTemplate
                    console.log("InventoryTemplate Description: " + inventoryTemplate.getDescription());

                    //Get the Favorite of each InventoryTemplate
                    console.log("InventoryTemplate Favorite: " + inventoryTemplate.getFavorite());

                    // Get the Subject of each InventoryTemplate
                    console.log("InventoryTemplate Subject: " + inventoryTemplate.getSubject());
                });

                let info = responseWrapper.getInfo();

                console.log("InventoryTemplate Info PerPage : " + info.getPerPage());

                console.log("InventoryTemplate Info Count : " + info.getCount());

                console.log("InventoryTemplate Info Page : " + info.getPage());

                console.log("InventoryTemplate Info MoreRecords : " + info.getMoreRecords());
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

    static async getInventoryTemplateById(Id) {
        let sortBy = "modified_time";
        
        let sortOrder = "desc";
        
        let category = "created_by_me";
        
        //Get instance of InventoryTemplatesOperations Class
        let inventoryTemplatesOperations = new InventoryTemplatesOperations(sortBy, sortOrder, category);

        //Call getInventoryTemplateById method that takes Id as parameter
        let response = await inventoryTemplatesOperations.getInventoryTemplateById(Id);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained InventoryTemplate instances
                let inventoryTemplates = responseWrapper.getInventoryTemplates();

                inventoryTemplates.forEach(inventoryTemplate => {
                    //Get the CreatedTime of each InventoryTemplate
                    console.log("InventoryTemplate CreatedTime: " + inventoryTemplate.getCreatedTime());

                    let module = inventoryTemplate.getModule();

                    if (module != null) {
                        //Get the Module Name of the InventoryTemplate
                        console.log("InventoryTemplate Module API Name : " + module.getAPIName());

                        //Get the Module Id of the InventoryTemplate
                        console.log("InventoryTemplate Module ID : " + module.getId());
                    }

                    //Get the Type of each InventoryTemplate
                    console.log("InventoryTemplate Type: " + inventoryTemplate.getType());

                    //Get the CreatedBy User instance of each InventoryTemplate
                    let createdBy = inventoryTemplate.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Id of the CreatedBy User
                        console.log("InventoryTemplate Created By User-ID: " + createdBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("InventoryTemplate Created By User-Name: " + createdBy.getName());
                    }

                    //Get the ModifiedTime of each InventoryTemplate
                    console.log("InventoryTemplate ModifiedTime: " + inventoryTemplate.getModifiedTime());

                    //Get the Folder instance of each InventoryTemplate
                    let folder = inventoryTemplate.getFolder();

                    //Check if folder is not null
                    if (folder != null) {
                        //Get the Id of the Folder
                        console.log("InventoryTemplate Folder Id: " + folder.getId());

                        //Get the Name of the Folder
                        console.log("InventoryTemplate Folder Name: " + folder.getName());
                    }

                    //Get the LastUsageTime of each InventoryTemplate
                    console.log("InventoryTemplate LastUsageTime: " + inventoryTemplate.getLastUsageTime());

                    // Get the Associated of each InventoryTemplate
                    console.log("InventoryTemplate Associated: " + inventoryTemplate.getAssociated());

                    //Get the name of each InventoryTemplate
                    console.log("InventoryTemplate Name: " + inventoryTemplate.getName());

                    //Get the modifiedBy User instance of each InventoryTemplate
                    let modifiedBy = inventoryTemplate.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the ModifiedBy User
                        console.log("InventoryTemplate Modified By User-ID: " + modifiedBy.getId());

                        //Get the Name of the CreatedBy User
                        console.log("InventoryTemplate Modified By User-Name: " + modifiedBy.getName());
                    }

                    //Get the ID of each InventoryTemplate
                    console.log("InventoryTemplate ID: " + inventoryTemplate.getId());

                    //Get the EditorMode each InventoryTemplate
                    console.log("InventoryTemplate EditorMode: " + inventoryTemplate.getEditorMode());

                    console.log("InventoryTemplate Content: " + inventoryTemplate.getContent());

                    // Get the Description of each InventoryTemplate
                    console.log("InventoryTemplate Description: " + inventoryTemplate.getDescription());

                    //Get the Favorite of each InventoryTemplate
                    console.log("InventoryTemplate Favorite: " + inventoryTemplate.getFavorite());

                    // Get the Subject of each InventoryTemplate
                    console.log("InventoryTemplate Subject: " + inventoryTemplate.getSubject());
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

module.exports = { InventoryTemplate }