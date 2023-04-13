import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateVariables{
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
     * <h3> Create Variables </h3>
     * This method is used to create variables and print the response.
     */
    static async createVariables() {
        let variablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        //Get instance of BodyWrapper Class that will contain the request body
        let request = new ZOHOCRMSDK.Variables.BodyWrapper();
        //Array to hold Variable instances
        let variableArray = [];
        //Get instance of Variable Class
        let variable1 = new ZOHOCRMSDK.Variables.Variable();
        //Set the name to variable
        variable1.setName("Variable55123");
        //Set the API name to variable
        variable1.setAPIName("Variable55123");
        //Get instance of VariableGroup Class
        let variableGroup = new ZOHOCRMSDK.VariableGroups.VariableGroup();
        //Set the ID to VariableGroup instance
        variableGroup.setName("Create me");
        //Set the VariableGroup to Variable instance
        variable1.setVariableGroup(variableGroup);
        //Set the type to Variable
        variable1.setType("integer");
        //Set the value to Variable
        variable1.setValue("55");
        variable1.setDescription("This denotes variable 5 description");
        //Add the variable instance to the array
        variableArray.push(variable1);
        variable1 = new ZOHOCRMSDK.Variables.Variable();
        variable1.setName("Variable551234");
        variable1.setAPIName("Variable551234");
        variableGroup = new ZOHOCRMSDK.VariableGroups.VariableGroup();
        variableGroup.setName("General");
        variable1.setVariableGroup(variableGroup);
        variable1.setType("text");
        variable1.setValue("Hello");
        variable1.setDescription("This denotes variable 6 description");
        //Add the variable instance to the array
        variableArray.push(variable1);
        //Set the array to variables in BodyWrapper instance
        request.setVariables(variableArray);
        //Call createVariables method that takes BodyWrapper instance as parameter
        let response = await variablesOperations.createVariables(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Variables.ActionWrapper) {
                    let actionResponses = responseObject.getVariables();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Variables.SuccessResponse) {
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
await CreateVariables.initialize();
await CreateVariables.createVariables();
export {
    CreateVariables as CreateVariables
}
