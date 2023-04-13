import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetVariableForAPIName{
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
     * <h3> Get Variable for API Name </h3>
     * This method is used to get the details of any specific variable.
     * Specify the unique name of the variable in your API request to get the data for that particular variable group.
     * @param {String} variableName The API name of the Variable to be obtained
     */
    static async getVariableForAPIName(variableName) {
        //example
        //let variableName = "Variable55";
        //Get instance of VariablesOperations Class
        let variablesOperations = new ZOHOCRMSDK.Variables.VariablesOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Variable for API Name operation */
        await paramInstance.add(ZOHOCRMSDK.Variables.GetVariableForAPINameParam.GROUP, "General");
        //Call getVariableForGroupAPIName method that takes ParameterMap instance and variableName as parameter
        let response = await variablesOperations.getVariableForAPIName(variableName, paramInstance);
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
                    //Get the array of obtained Variable instances
                    let variables = responseObject.getVariables();
                    variables.forEach(variable => {
                        console.log("Variable ID: " + variable.getId());
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
await GetVariableForAPIName.initialize();
let variableName = "variable55";
await GetVariableForAPIName.getVariableForAPIName(variableName);
export {
    GetVariableForAPIName as GetVariableForAPIName
}
