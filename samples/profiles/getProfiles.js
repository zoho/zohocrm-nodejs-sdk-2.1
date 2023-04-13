import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetProfiles{
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
     * <h3> Get Profiles </h3>
     * This method is used to retrieve the profiles data through an API request and print the response.
     */
    static async getProfiles() {
        //To include If-Modified-Since header in the request, get the instance as follows
        let profilesOperations = new ZOHOCRMSDK.Profiles.ProfilesOperations();
        //To not include If-Modified-Since header to the request, get the instance as follows
        // profilesOperations = new ZOHOCRMSDK.Profiles.ProfilesOperations(null);
        //Call getProfiles method
        let response = await profilesOperations.getProfiles();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Profiles.ResponseWrapper) {
                    let profiles = responseObject.getProfiles();
                    profiles.forEach(profile => {
                        console.log("Profile DisplayLabel: " + profile.getDisplayLabel());
                        if (profile.getCreatedTime() != null) {
                            console.log("Profile CreatedTime: " + profile.getCreatedTime());
                        }
                        if (profile.getModifiedTime() != null) {
                            console.log("Profile ModifiedTime: " + profile.getModifiedTime());
                        }
                        console.log("Profile Custom: " + profile.getCustom());
                        console.log("Profile Name: " + profile.getName());
                        let modifiedBy = profile.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Profile Modified By User-ID: " + modifiedBy.getId());
                            console.log("Profile Modified By User-Name: " + modifiedBy.getName());
                            console.log("Profile Modified By User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Profile Description: " + profile.getDescription());
                        console.log("Profile ID: " + profile.getId());
                        let createdBy = profile.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Profile Created By User-ID: " + createdBy.getId());
                            console.log("Profile Created By User-Name: " + createdBy.getName());
                            console.log("Profile Created By User-Email: " + createdBy.getEmail());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Profiles.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
}
await GetProfiles.initialize();
await GetProfiles.getProfiles();
export {
    GetProfiles as GetProfiles
}
