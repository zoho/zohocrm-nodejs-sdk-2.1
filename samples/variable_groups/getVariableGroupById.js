import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetVariableGroupById{
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
     * <h3> Get Variable Group By Id </h3>
     * This method is used to get the details of any variable group with group id and print the response.
     * @param {BigInt} variableGroupId The ID of the VariableGroup to be obtained
     */
    static async getVariableGroupById(variableGroupId) {
        //example
        //let variableGroupId = 75023n;
        //Get instance of VariableGroupsOperations Class
        let variableGroupsOperations = new ZOHOCRMSDK.VariableGroups.VariableGroupsOperations();
        //Call getVariableGroupById method that takes variableGroupId as parameter
        let response = await variableGroupsOperations.getVariableGroupById(variableGroupId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.VariableGroups.ResponseWrapper) {
                    let variableGroups = responseObject.getVariableGroups();
                    variableGroups.forEach(variableGroup => {
                        console.log("VariableGroup DisplayLabel: " + variableGroup.getDisplayLabel());
                        //Get the APIName of each VariableGroup
                        console.log("VariableGroup APIName: " + variableGroup.getAPIName());
                        //Get the Name of each VariableGroup
                        console.log("VariableGroup Name: " + variableGroup.getName());
                        //Get the Description of each VariableGroup
                        console.log("VariableGroup Description: " + variableGroup.getDescription());
                        //Get the ID of each VariableGroup
                        console.log("VariableGroup ID: " + variableGroup.getId());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.VariableGroups.APIException) {
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
await GetVariableGroupById.initialize();
let variableGroupId = 100043n;
await GetVariableGroupById.getVariableGroupById(variableGroupId);
export {
    GetVariableGroupById as GetVariableGroupById
}
