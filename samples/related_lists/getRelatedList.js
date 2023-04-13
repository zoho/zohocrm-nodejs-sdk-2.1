import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetRelatedList{
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
    static async getRelatedList(moduleAPIName, relatedListId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let relatedListId = 62003n;
        let relatedListsOperations = new ZOHOCRMSDK.RelatedLists.RelatedListsOperations(moduleAPIName);
        //Call getRelatedList method which takes relatedListId as parameter
        let response = await relatedListsOperations.getRelatedList(relatedListId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.RelatedLists.ResponseWrapper) {
                    let relatedLists = responseObject.getRelatedLists();
                    relatedLists.forEach(relatedList => {
                        console.log("RelatedList SequenceNumber: " + relatedList.getSequenceNumber());
                        console.log("RelatedList DisplayLabel: " + relatedList.getDisplayLabel());
                        console.log("RelatedList APIName: " + relatedList.getAPIName());
                        console.log("RelatedList Module: " + relatedList.getModule());
                        console.log("RelatedList Name: " + relatedList.getName());
                        console.log("RelatedList Action: " + relatedList.getAction());
                        console.log("RelatedList ID: " + relatedList.getId());
                        console.log("RelatedList Href: " + relatedList.getHref());
                        console.log("RelatedList Type: " + relatedList.getType());
                        console.log("RelatedList Connectedmodule: " + relatedList.getConnectedmodule());
                        console.log("RelatedList Linkingmodule: " + relatedList.getLinkingmodule());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.RelatedLists.APIException) {
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
await GetRelatedList.initialize();
let moduleAPIName = "leads";
let relatedListId = 1234n
await GetRelatedList.getRelatedList(moduleAPIName,relatedListId);
export {
    GetRelatedList as GetRelatedList
}
