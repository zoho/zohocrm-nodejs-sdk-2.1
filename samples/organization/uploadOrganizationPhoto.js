import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
import fs from "fs";
class UploadOrganizationPhoto{
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
     * <h3> Upload Organization Photo</h3>
     * This method is used to upload the brand logo or image of the organization and print the response.
     * @param {String} absoluteFilePath The absolute file path of the file to be attached
     */
    static async uploadOrganizationPhoto(absoluteFilePath) {
        //example
        //let absoluteFilePath = "/Users/user_name/Desktop/logo.png";
        let orgOperations = new ZOHOCRMSDK.Orgs.OrgOperations();
        let fileBodyWrapper = new ZOHOCRMSDK.Orgs.FileBodyWrapper();
        /** StreamWrapper can be initialized in any of the following ways */
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream.
         */
        let streamWrapper = new ZOHOCRMSDK.StreamWrapper(null, fs.createReadStream(absoluteFilePath));
        /**
         * param 1 -> fileName
         * param 2 -> Read Stream
         * param 3 -> Absolute File Path of the file to be attached
         */
        // let streamWrapper = new StreamWrapper(null, null, absoluteFilePath);
        fileBodyWrapper.setFile(streamWrapper);
        //Call uploadOrganizationPhoto method that takes FileBodyWrapper instance as parameter
        let response = await orgOperations.uploadOrganizationPhoto(fileBodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Orgs.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Orgs.APIException) {
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
await UploadOrganizationPhoto.initialize();
let absoluteFilePath = "/Users/user_name/Desktop/logo.png";
await UploadOrganizationPhoto.uploadOrganizationPhoto(absoluteFilePath);
export {
    UploadOrganizationPhoto as UploadOrganizationPhoto
}
