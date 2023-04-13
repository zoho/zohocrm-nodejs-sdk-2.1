import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class AddTagsToMultipleRecords{
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
     * <h3> Add Tags To Multiple Records </h3>
     * This method is used to add tags to multiple records simultaneously and print the response.
     * @param {String} moduleAPIName The API Name of the module to add tags.
     * @param {Array} recordIds The array of the record IDs to add tags
     * @param {Array} tagNames The array of tag names to be added
     */
    static async addTagsToMultipleRecords(moduleAPIName, recordIds, tagNames) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagNames = ["addtag1,addtag12"];
        // let recordIds = [34023026n, 527003n, 344028n];
        //Get instance of TagsOperations Class
        let tagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Add Tags To Multiple Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(ZOHOCRMSDK.Tags.AddTagsToMultipleRecordsParam.IDS, recordId);
        }
        await paramInstance.add(ZOHOCRMSDK.Tags.AddTagsToMultipleRecordsParam.TAG_NAMES, tagNames.toString());
        await paramInstance.add(ZOHOCRMSDK.Tags.AddTagsToMultipleRecordsParam.OVER_WRITE, "false");
        //Call addTagsToMultipleRecords method that takes ParameterMap instance and moduleAPIName as parameter
        let response = await tagsOperations.addTagsToMultipleRecords(moduleAPIName, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.RecordActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Tags.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Tags.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Tags.APIException) {
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
}
await AddTagsToMultipleRecords.initialize();
let moduleAPIName = "leads";
let recordIds = [1213n,1234n,3214n];
let tagNames = ["addtag","addtag1"];
await AddTagsToMultipleRecords.addTagsToMultipleRecords(moduleAPIName,recordIds,tagNames);
export {
    AddTagsToMultipleRecords as AddTagsToMultipleRecords
}
