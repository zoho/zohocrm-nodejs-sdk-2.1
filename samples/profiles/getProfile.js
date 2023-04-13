import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetProfile{
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
     * <h3> Get Profile </h3>
     * This method is used to get the details of any specific profile with ID.
     * @param {BigInt} profileId The ID of the Profile to be obtained
     */
    static async getProfile(profileId) {
        //example
        // let profileId = 26014n;
        let profilesOperations = new ZOHOCRMSDK.Profiles.ProfilesOperations(null);
        //Call getProfile method that takes profileId as parameter
        let response = await profilesOperations.getProfile(profileId);
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
                        let permissionsDetails = profile.getPermissionsDetails();
                        if (permissionsDetails != null) {
                            permissionsDetails.forEach(permissionsDetail => {
                                console.log("Profile PermissionDetail DisplayLabel: " + permissionsDetail.getDisplayLabel());
                                console.log("Profile PermissionDetail Module: " + permissionsDetail.getModule());
                                console.log("Profile PermissionDetail Name: " + permissionsDetail.getName());
                                console.log("Profile PermissionDetail ID: " + permissionsDetail.getId());
                                console.log("Profile PermissionDetail Enabled: " + permissionsDetail.getEnabled());
                            });
                        }
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
                        let sections = profile.getSections();
                        if (sections != null) {
                            for (let index = 0; index < sections.length; index++) {
                                let section = sections[index];
                                console.log("Profile Section Name: " + section.getName());
                                let categories = section.getCategories();
                                categories.forEach(category => {
                                    console.log("Profile Section Category DisplayLabel: " + category.getDisplayLabel());
                                    let categoryPermissionsDetails = category.getPermissionsDetails();
                                    if (categoryPermissionsDetails != null) {
                                        categoryPermissionsDetails.forEach(permissionsDetailID => {
                                            console.log("Profile Section Category permissionsDetailID: " + permissionsDetailID);
                                        });
                                    }
                                    console.log("Profile Section Category Module: " + category.getModule());
                                    console.log("Profile Section Category Name: " + category.getName());
                                });
                            }
                        }
                        if (profile.getDelete() != null) {
                            console.log("Profile Delete: " + profile.getDelete().toString());
                        }
                        if (profile.getDefault() != null) {
                            console.log("Profile Default: " + profile.getDefault().toString());
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
await GetProfile.initialize();
let profileId = 26014n;
await GetProfile.getProfile(profileId);
export {
    GetProfile as GetProfile
}
