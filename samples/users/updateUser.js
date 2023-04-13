import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateUser{
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
     * <h3> Get User </h3>
     * This method is used to update the details of any specific user.
     * @param {BigInt} userId The ID of the User to be updated
     */
    static async updateUser(userId) {
        //example
        //let userId = 302031n;
        //Get instance of UsersOperations Class
        let usersOperations = new ZOHOCRMSDK.Users.UsersOperations();
        //Get instance of BodyWrapper Class that will contain the request body
        let request = new ZOHOCRMSDK.Users.BodyWrapper();
        //Array to hold User instances
        let userArray = [];
        //Get instance of User Class
        let user = new ZOHOCRMSDK.Users.User();
        //Get instance of Role Class
        let role = new ZOHOCRMSDK.Roles.Role();
        //Set ID to role
        role.setId(34770610026008n);
        //Set role instance to role in User instance
        user.setRole(role);
        //Set the country locale
        user.setCountryLocale("en_US");
        //Add the User instance to the array
        userArray.push(user);
        //Set the array to users in BodyWrapper instance
        request.setUsers(userArray);
        //Call updateUser method that takes BodyWrapper instance and userId as parameters
        let response = await usersOperations.updateUser(userId, request);
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
await UpdateUser.initialize();
let userId = 30006n;
await UpdateUser.updateUser(userId);
export {
    UpdateUser as UpdateUser
}
