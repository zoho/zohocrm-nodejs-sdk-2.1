import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateBulkWriteJob{
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
     * <h3> Create BulkWrite Job</h3>
     * This method is used to create bulk write job with the uploaded file ID
     * @param {String} moduleAPIName The API Name of the module.
     * @param {String} fileId The ID of the uploaded file to create BulkWrite Job.
     */
    static async createBulkWriteJob(moduleAPIName, fileId) {
        //example
        //let moduleAPIName = "module_api_name";
        //let fileId  = "6121001";
        let bulkWriteOperations = new ZOHOCRMSDK.BulkWrite.BulkWriteOperations();
        let requestWrapper = new ZOHOCRMSDK.BulkWrite.RequestWrapper();
        let callBack = new ZOHOCRMSDK.BulkWrite.CallBack();
        callBack.setUrl("https://www.example.com/callback");
        callBack.setMethod(new ZOHOCRMSDK.Choice("post"));
        //The Bulk Write Job's details are posted to this URL on successful completion / failure of the job.
        requestWrapper.setCallback(callBack);
        requestWrapper.setCharacterEncoding("UTF-8");
        requestWrapper.setOperation(new ZOHOCRMSDK.Choice("insert"));
        let resources = [];
        let resource = new ZOHOCRMSDK.BulkWrite.Resource();
        resource.setType(new ZOHOCRMSDK.Choice("data"));
        let module = new ZOHOCRMSDK.Modules.Module();
        module.setAPIName(moduleAPIName);
        resource.setModule(module);
        resource.setFileId(fileId);
        //True - Ignores the empty values.The default value is false.
        resource.setIgnoreEmpty(true);
        resource.setFindBy("Email");
        let fieldMappings = [];
        let fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Last_Name");
        fieldMapping.setIndex(0);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Email");
        fieldMapping.setIndex(1);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Company");
        fieldMapping.setIndex(2);
        fieldMappings.push(fieldMapping);
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Phone");
        fieldMapping.setIndex(3);
        fieldMappings.push(fieldMapping);
        let defaultValue = new Map();
        fieldMapping = new ZOHOCRMSDK.BulkWrite.FieldMapping();
        fieldMapping.setAPIName("Website");
        defaultValue.set("value", "https://www.zohoapis.com");
        fieldMapping.setDefaultValue(defaultValue);
        fieldMappings.push(fieldMapping);
        resource.setFieldMappings(fieldMappings);
        resources.push(resource);
        requestWrapper.setResource(resources);
        //Call createBulkWriteJob method that takes RequestWrapper instance as parameter
        let response = await bulkWriteOperations.createBulkWriteJob(requestWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkWrite.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.BulkWrite.APIException) {
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
await CreateBulkWriteJob.initialize();
let moduleAPIName = "leads";
let fileId = "120032";
await CreateBulkWriteJob.createBulkWriteJob(moduleAPIName,fileId);

export {
    CreateBulkWriteJob as CreateBulkWriteJob
}
