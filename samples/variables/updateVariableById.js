import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateVariableById{
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
     * <h3> Update Variable By Id </h3>
     * This method is used to update details of a specific variable in CRM and print the response.
     * @param {BigInt} variableId The ID of the Variable to be updated
     */
    static async updateVariableById(variableId) {
        //example
        //let variableId = 2275025n;
        //Get instance of VariablesOperations Class
        let variablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        //Get instance of BodyWrapper Class that will contain the request body
        let request = new ZOHOCRMSDK.Variables.BodyWrapper();
        //Array to hold Variable instances
        let variableArray = [];
        //Get instance of Variable Class
        let variable1 = new ZOHOCRMSDK.Variables.Variable();
        variable1.setAPIName("TestAPIName");
        //Add the instance to the array
        variableArray.push(variable1);
        //Set the array to variables in BodyWrapper instance
        request.setVariables(variableArray);
        //Call updateVariableById method that takes BodyWrapper instance and variableId as parameter
        let response = await variablesOperations.updateVariableById(variableId, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Variables.ActionWrapper) {
                    let actionResponses = responseObject.getVariables();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Variables.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Variables.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Variables.APIException) {
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
await UpdateVariableById.initialize();
let variableId = 300032n;
await UpdateVariableById.updateVariableById(variableId);
export {
    UpdateVariableById as UpdateVariableById
}
