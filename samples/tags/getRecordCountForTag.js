import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetRecordCountForTag{
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
     * <h3> Get Record Count For Tag </h3>
     * This method is used to get the total number of records under a tag and print the response.
     * @param {String} moduleAPIName The API Name of the module.
     * @param {BigInt} tagId The ID of the tag to get the count
     */
    static async getRecordCountForTag(moduleAPIName, tagId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagId = 0661047n;
        //Get instance of TagsOperations Class
        let tagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Record Count operation */
        await paramInstance.add(ZOHOCRMSDK.Tags.GetRecordCountForTagParam.MODULE, moduleAPIName);
        //Call getRecordCountForTag method that takes paramInstance and tagId as parameter
        let response = await tagsOperations.getRecordCountForTag(tagId, paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Tags.CountWrapper) {
                    console.log("Tag Count: " + responseObject.getCount());
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
await GetRecordCountForTag.initialize();
let moduleAPIName = "leads";
let tagId = 1212n;
await GetRecordCountForTag.getRecordCountForTag(moduleAPIName,tagId);
export {
    GetRecordCountForTag as GetRecordCountForTag
}
