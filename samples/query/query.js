import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class Query {
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
    static async getRecords() {
        let queryOperations = new ZOHOCRMSDK.Query.QueryOperations();
        let bodyWrapper = new ZOHOCRMSDK.Query.BodyWrapper();
        let selectQuery = "select Last_Name,Created_Time from Leads where Last_Name is not null limit 200";
        bodyWrapper.setSelectQuery(selectQuery);
        //Call getRecords method that takes BodyWrapper instance as parameter
        let response = await queryOperations.getRecords(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Query.ResponseWrapper) {
                    let records = responseObject.getData();
                    for (let record of records) {
                        console.log("Record ID: " + record.getId());
                        let createdBy = record.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Record Created By User-ID: " + createdBy.getId());
                            console.log("Record Created By User-Name: " + createdBy.getName());
                            console.log("Record Created By User-Email: " + createdBy.getEmail());
                        }
                        console.log("Record CreatedTime: " + record.getCreatedTime());
                        let modifiedBy = record.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Record Modified By User-ID: " + modifiedBy.getId());
                            console.log("Record Modified By User-Name: " + modifiedBy.getName());
                            console.log("Record Modified By User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Record ModifiedTime: " + record.getModifiedTime());
                        let tags = record.getTag();
                        if (tags != null) {
                            tags.forEach(tag => {
                                console.log("Record Tag Name: " + tag.getName());
                                console.log("Record Tag ID: " + tag.getId());
                            });
                        }
                        //To get particular field value
                        console.log("Record Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName
                        console.log("Record KeyValues: ");
                        let keyValues = record.getKeyValues();
                        let keyArray = Array.from(keyValues.keys());
                        for (let keyName of keyArray) {
                            let value = keyValues.get(keyName);
                            if (Array.isArray(value)) {
                                console.log("Record keyName: " + keyName);
                                for (let data of value) {
                                    if (data instanceof Map) {
                                        for (let mapKey in data) {
                                            console.log(mapKey + " : " + data.get(mapKey));
                                        }
                                    }
                                    else {
                                        console.log(data);
                                    }
                                }
                            }
                            else if (value instanceof Map) {
                                console.log("Record keyName: " + keyName);
                                for (let mapKey in value) {
                                    console.log(mapKey + " : " + value.get(mapKey));
                                }
                            }
                            else {
                                console.log("Record keyName: " + keyName + " - Value - " + value);
                            }
                        }
                    }
                    let info = responseObject.getInfo();
                    if (info != null) {
                        if (info.getCount() != null) {
                            console.log("Record Info Count: " + info.getCount().toString());
                        }
                        if (info.getMoreRecords() != null) {
                            console.log("Record Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Query.APIException) {
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
await Query.initialize();
await Query.getRecords();
export {
    Query as Query
}
