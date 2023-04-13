import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateUser{
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
     * <h3> Create Users </h3>
     * This method is used to add a user to your organization and print the response.
     */
    static async createUser() {
        let usersOperations = new ZOHOCRMSDK.Users.UsersOperations();
        //Get instance of RequestWrapper Class that will contain the request body
        let request = new ZOHOCRMSDK.Users.RequestWrapper();
        //Array to hold User instances
        let userArray = [];
        //Get instance of User Class
        let user = new ZOHOCRMSDK.Users.User();
        //Get instance of Role Class
        let role = new ZOHOCRMSDK.Roles.Role();
        //Set ID to Role instance
        role.setId(34770610026008n);
        //Set Role instance to role in User
        user.setRole(role);
        user.setCountryLocale("en_US");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("testuser1234567@zoho.com");
        //Get instance of Profile Class
        let profile = new ZOHOCRMSDK.Profiles.Profile();
        profile.setId(34770610026014n);
        //Set profile instance to profile in User instance
        user.setProfile(profile);
        //Add the User instance to array
        userArray.push(user);
        //Set the array to users in RequestWrapper instance
        request.setUsers(userArray);
        //Call createUser method that takes RequestWrapper class instance as parameter
        let response = await usersOperations.createUser(request);
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
await CreateUser.initialize();
await CreateUser.createUser();
export {
    CreateUser as CreateUser
}
