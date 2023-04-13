import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateBulkReadJob{
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
     * <h3> Create BulkRead Job </h3>
     * This method is used to create a bulk read job to export records.
     * @param {String} moduleAPIName  The API Name of the record's module
     */
    static async createBulkReadJob(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let bulkReadOperations = new ZOHOCRMSDK.BulkRead.BulkReadOperations();
        let requestWrapper = new ZOHOCRMSDK.BulkRead.RequestWrapper();
        //Specifies the API Name of the module to be read.
        let module = new ZOHOCRMSDK.Modules.Module();
        module.setAPIName(moduleAPIName);
        let callBack = new ZOHOCRMSDK.BulkRead.CallBack();
        callBack.setUrl("https://www.example.com/callback");
        callBack.setMethod(new ZOHOCRMSDK.Choice("post"));
        //The Bulk Read Job's details is posted to this URL on successful completion / failure of the job.
        requestWrapper.setCallback(callBack);
        let query = new ZOHOCRMSDK.BulkRead.Query();
        // Specifies the  the module to be read.
        query.setModule(module);
        //Specifies the unique ID of the custom view, whose records you want to export.
        // query.setCvid("0087501");
        //Array of field names
        let fieldAPINames = [];
        // fieldAPINames.push("Last_Name");
        //Specifies the API Name of the fields to be fetched.
        // query.setFields(fieldAPINames);
        query.setPage(1);
        let criteria = new ZOHOCRMSDK.BulkRead.Criteria();
        criteria.setGroupOperator(new ZOHOCRMSDK.Choice("or"));
        let criteriaArray = [];
        let group11 = new ZOHOCRMSDK.BulkRead.Criteria();
        group11.setGroupOperator(new ZOHOCRMSDK.Choice("and"));
        let groupArray11 = [];
        let group111 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field1 = new ZOHOCRMSDK.Fields.Field();
        field1.setAPIName("Company");
        group111.setField(field1);
        group111.setComparator(new ZOHOCRMSDK.Choice("equal"));
        group111.setValue("Zoho");
        groupArray11.push(group111);
        let group112 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field2 = new ZOHOCRMSDK.Fields.Field();
        field2.setAPIName("Owner");
        group112.setField(field2);
        group112.setComparator(new ZOHOCRMSDK.Choice("in"));
        group112.setValue(["34770610173021"]);
        groupArray11.push(group112);
        group11.setGroup(groupArray11);
        criteriaArray.push(group11);
        let group12 = new ZOHOCRMSDK.BulkRead.Criteria();
        group12.setGroupOperator(new ZOHOCRMSDK.Choice("or"));
        let groupArray12 = [];
        let group121 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field3 = new ZOHOCRMSDK.Fields.Field();
        field3.setAPIName("Paid");
        group121.setField(field3);
        group121.setComparator(new ZOHOCRMSDK.Choice("equal"));
        group121.setValue(true);
        groupArray12.push(group121);
        let group122 = new ZOHOCRMSDK.BulkRead.Criteria();
        let field4 = new ZOHOCRMSDK.Fields.Field();
        field4.setAPIName("Created_Time");
        group122.setField(field4);
        group122.setComparator(new ZOHOCRMSDK.Choice("between"));
        let time = ["2020-06-03T17:31:48+05:30", "2020-06-03T17:31:48+05:30"];
        group122.setValue(time);
        groupArray12.push(group122);
        group12.setGroup(groupArray12);
        criteriaArray.push(group12);
        criteria.setGroup(criteriaArray);
        //To filter the records to be exported.
        query.setCriteria(criteria);
        requestWrapper.setQuery(query);
        //Specify the value for this key as "ics" to export all records in the Events module as an ICS file.
        //requestWrapper.setFileType(new Choice("ics"));
        //Call createBulkReadJob method that takes RequestWrapper instance as parameter
        let response = await bulkReadOperations.createBulkReadJob(requestWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BulkRead.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.BulkRead.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.BulkRead.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.BulkRead.APIException) {
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
await CreateBulkReadJob.initialize();
let moduleAPIName = "leads";
await CreateBulkReadJob.createBulkReadJob(moduleAPIName);
export {
    CreateBulkReadJob as CreateBulkReadJob
}
