import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetTags{
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
     * <h3> Get Tags </h3>
     * This method is used to get all the tags in a module
     * @param {String} moduleAPIName The API Name of the module to get tags.
     */
    static async getTags(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        //Get instance of TagsOperations Class
        let tagsOperations = new ZOHOCRMSDK.Tags.TagsOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Get Tags operation */
        await paramInstance.add(ZOHOCRMSDK.Tags.GetTagsParam.MODULE, moduleAPIName);
        await paramInstance.add(ZOHOCRMSDK.Tags.GetTagsParam.MY_TAGS, "true");
        //Call getTags method that takes ParameterMap instance as parameter
        let response = await tagsOperations.getTags(paramInstance);
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
                if (responseObject instanceof ZOHOCRMSDK.Tags.ResponseWrapper) {
                    let tags = responseObject.getTags();
                    tags.forEach(tag => {
                        console.log("Tag CreatedTime: " + tag.getCreatedTime());
                        //Get the ModifiedTime of each Tag
                        console.log("Tag ModifiedTime: " + tag.getModifiedTime());
                        //Get the Name of each Tag
                        console.log("Tag Name: " + tag.getName());
                        //Get the modifiedBy User instance of each Tag
                        let modifiedBy = tag.getModifiedBy();
                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            console.log("Tag Modified By User-ID: " + modifiedBy.getId());
                            //Get the name of the modifiedBy User
                            console.log("Tag Modified By User-Name: " + modifiedBy.getName());
                        }
                        //Get the ID of each Tag
                        console.log("Tag ID: " + tag.getId());
                        //Get the createdBy User instance of each Tag
                        let createdBy = tag.getCreatedBy();
                        //Check if createdBy is not null
                        if (createdBy != null) {
                            console.log("Tag Created By User-ID: " + createdBy.getId());
                            //Get the name of the createdBy User
                            console.log("Tag Created By User-Name: " + createdBy.getName());
                        }
                    });
                    //Get the obtained Info object
                    let info = responseObject.getInfo();
                    //Check if info is not null
                    if (info != null) {
                        if (info.getCount() != null) {
                            console.log("Tag Info Count: " + info.getCount().toString());
                        }
                        if (info.getAllowedCount() != null) {
                            console.log("Tag Info AllowedCount: " + info.getAllowedCount().toString());
                        }
                    }
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
await GetTags.initialize();
let moduleAPIName = "leads";
await GetTags.getTags(moduleAPIName);
export {
    GetTags as GetTags
}
