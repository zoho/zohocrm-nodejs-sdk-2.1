import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateUsers{
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
     * <h3> Update Users </h3>
     * This method is used to update the details of multiple users of your organization and print the response.
     */
    static async updateUsers() {
        let usersOperations = new ZOHOCRMSDK.Users.UsersOperations();
        //Get instance of BodyWrapper Class that will contain the request body
        let request = new ZOHOCRMSDK.Users.BodyWrapper();
        //Array to hold User instances
        let userArray = [];
        //Get instance of User Class
        let user = new ZOHOCRMSDK.Users.User();
        //Set ID to User instance
        user.setId(347706112592006n);
        //Get instance of Role Class
        let role = new ZOHOCRMSDK.Roles.Role();
        //Set ID to Role instance
        role.setId(34770610026008n);
        //Set role instance to role in User
        user.setRole(role);
        user.setCountryLocale("en_US");
        //Add User instance to array
        userArray.push(user);
        //Get instance of User Class
        user = new ZOHOCRMSDK.Users.User();
        //Set ID to Role instance
        user.setId(347706110182006n);
        role = new ZOHOCRMSDK.Roles.Role();
        //Set ID to Role instance
        role.setId(34770610026008n);
        //Set role instance to role in User
        user.setRole(role);
        //Add User instance to array
        userArray.push(user);
        //Set the array to users in BodyWrapper
        request.setUsers(userArray);
        //Call updateUsers method that takes BodyWrapper instance as parameter
        let response = await usersOperations.updateUsers(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Users.ActionWrapper) {
                    let actionResponses = responseObject.getUsers();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Users.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Users.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Users.APIException) {
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
await UpdateUsers.initialize();
await UpdateUsers.updateUsers();
export {
    UpdateUsers as UpdateUsers
}
