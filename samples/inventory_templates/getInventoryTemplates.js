import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetInventoryTemplates{
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
    static async getInventoryTemplates() {
        let moduleAPIName = "Quotes";
        let sortBy = "modified_time";
        let sortOrder = "desc";
        let category = "created_by_me";
        let inventoryTemplatesOperations = new ZOHOCRMSDK.InventoryTemplates.InventoryTemplatesOperations(sortBy, sortOrder, category);
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.InventoryTemplates.GetInventoryTemplatesParam.MODULE, moduleAPIName);
        //Call getInventoryTemplates method that takes paramInstance as parameter
        let response = await inventoryTemplatesOperations.getInventoryTemplates(paramInstance);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.InventoryTemplates.ResponseWrapper) {
                let responseWrapper = responseHandler;
                let inventoryTemplates = responseWrapper.getInventoryTemplates();
                inventoryTemplates.forEach(inventoryTemplate => {
                    console.log("InventoryTemplate CreatedTime: " + inventoryTemplate.getCreatedTime());
                    let module = inventoryTemplate.getModule();
                    if (module != null) {
                        console.log("InventoryTemplate Module API Name : " + module.getAPIName());
                        console.log("InventoryTemplate Module ID : " + module.getId());
                    }
                    console.log("InventoryTemplate Type: " + inventoryTemplate.getType());
                    let createdBy = inventoryTemplate.getCreatedBy();
                    if (createdBy != null) {
                        console.log("InventoryTemplate Created By User-ID: " + createdBy.getId());
                        console.log("InventoryTemplate Created By User-Name: " + createdBy.getName());
                    }
                    console.log("InventoryTemplate ModifiedTime: " + inventoryTemplate.getModifiedTime());
                    let folder = inventoryTemplate.getFolder();
                    if (folder != null) {
                        console.log("InventoryTemplate Folder Id: " + folder.getId());
                        console.log("InventoryTemplate Folder Name: " + folder.getName());
                    }
                    console.log("InventoryTemplate LastUsageTime: " + inventoryTemplate.getLastUsageTime());
                    console.log("InventoryTemplate Associated: " + inventoryTemplate.getAssociated());
                    console.log("InventoryTemplate Name: " + inventoryTemplate.getName());
                    let modifiedBy = inventoryTemplate.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("InventoryTemplate Modified By User-ID: " + modifiedBy.getId());
                        console.log("InventoryTemplate Modified By User-Name: " + modifiedBy.getName());
                    }
                    console.log("InventoryTemplate ID: " + inventoryTemplate.getId());
                    console.log("InventoryTemplate EditorMode: " + inventoryTemplate.getEditorMode());
                    console.log("InventoryTemplate Content: " + inventoryTemplate.getContent());
                    console.log("InventoryTemplate Description: " + inventoryTemplate.getDescription());
                    console.log("InventoryTemplate Favorite: " + inventoryTemplate.getFavorite());
                    console.log("InventoryTemplate Subject: " + inventoryTemplate.getSubject());
                });
                let info = responseWrapper.getInfo();
                console.log("InventoryTemplate Info PerPage : " + info.getPerPage());
                console.log("InventoryTemplate Info Count : " + info.getCount());
                console.log("InventoryTemplate Info Page : " + info.getPage());
                console.log("InventoryTemplate Info MoreRecords : " + info.getMoreRecords());
            }
            else if (responseHandler instanceof ZOHOCRMSDK.InventoryTemplates.APIException) {
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
await GetInventoryTemplates.initialize();
await GetInventoryTemplates.getInventoryTemplates();
export {
    GetInventoryTemplates as GetInventoryTemplates
}
