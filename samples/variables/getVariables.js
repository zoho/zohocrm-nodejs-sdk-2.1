import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetVariables{
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
     * <h3> Get Variables </h3>
     * This method is used to retrieve all the available variables through an API request and print the response.
     */
    static async getVariables() {
        let variablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters of Get Variables operation */
        await paramInstance.add(ZOHOCRMSDK.Variables.GetVariablesParam.GROUP, "General");
        //Call getVariables method that takes ParameterMap instance as parameter
        let response = await variablesOperations.getVariables(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Variables.ResponseWrapper) {
                    let variables = responseObject.getVariables();
                    variables.forEach(variable => {
                        console.log("Variable ID: " + variable.getId());
                        //Get the Source of each Variable
                        console.log("Variable Source: " + variable.getSource());
                        //Get the APIName of each Variable
                        console.log("Variable APIName: " + variable.getAPIName());
                        //Get the Name of each Variable
                        console.log("Variable Name: " + variable.getName());
                        //Get the Description of each Variable
                        console.log("Variable Description: " + variable.getDescription());
                        //Get the Type of each Variable
                        console.log("Variable Type: " + variable.getType());
                        //Get the VariableGroup instance of each Variable
                        let variableGroup = variable.getVariableGroup();
                        //Check if variableGroup is not null
                        if (variableGroup != null) {
                            console.log("Variable VariableGroup APIName: " + variableGroup.getAPIName());
                            //Get the ID of the VariableGroup
                            console.log("Variable VariableGroup ID: " + variableGroup.getId());
                        }
                        //Get the Value of each Variable
                        console.log("Variable Value: " + variable.getValue());
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
await GetVariables.initialize();
await GetVariables.getVariables();
export {
    GetVariables as GetVariables
}
