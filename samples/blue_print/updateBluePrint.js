import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateBluePrint{
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
     * <h3> Update Blueprint </h3>
     * This method is used to update a single record's Blueprint details with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to update Blueprint
     * @param {BigInt} transitionId The ID of the Blueprint transition Id
     */
    static async updateBlueprint(moduleAPIName, recordId, transitionId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 2469044n;
        // let transitionId = 1172075n;
        let bluePrintOperations = new ZOHOCRMSDK.BluePrints.BluePrintOperations(recordId, moduleAPIName);
        let bodyWrapper = new ZOHOCRMSDK.BluePrints.BodyWrapper();
        //Array to contain BluePrint instances
        let bluePrintArray = [];
        let bluePrint = new ZOHOCRMSDK.BluePrints.BluePrint();
        bluePrint.setTransitionId(transitionId);
        let data = new ZOHOCRMSDK.Records.Record();
        let lookup = new Map();
        lookup.set("Phone", "8940372937");
        lookup.set("id", "8940372937");
        // data.addKeyValue("Data_3", lookup);
        data.addKeyValue("Phone", "8940372937");
        data.addKeyValue("Notes", "Updated via blueprint");
        let checkLists = [];
        let checkListItem = new Map();
        checkListItem.set("list 1", true);
        checkLists.push(checkListItem);
        checkListItem = new Map();
        checkListItem.set("list 2", true);
        checkLists.push(checkListItem);
        checkListItem = new Map();
        checkListItem.set("list 3", true);
        checkLists.push(checkListItem);
        data.addKeyValue("CheckLists", checkLists);
        bluePrint.setData(data);
        //Add BluePrint instance to the array
        bluePrintArray.push(bluePrint);
        bodyWrapper.setBlueprint(bluePrintArray);
        //Call updateBluePrint method that takes BodyWrapper instance
        let response = await bluePrintOperations.updateBlueprint(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BluePrints.SuccessResponse) {
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
                else if (responseObject instanceof ZOHOCRMSDK.BluePrints.APIException) {
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
await UpdateBluePrint.initialize();
let moduleAPIName = "leads";
let recordId = 423210n;
let transitionId = 1172075n;
await UpdateBluePrint.updateBlueprint(moduleAPIName,recordId,transitionId);
export {
    UpdateBluePrint as UpdateBluePrint
}
