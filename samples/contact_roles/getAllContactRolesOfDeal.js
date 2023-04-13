import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetAllContactRolesOfDeal{
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
    static async getAllContactRolesOfDeal(dealId) {
        let contactRolesOperations = new ZOHOCRMSDK.ContactRoles.ContactRolesOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        // await paramInstance.add(GetAllContactRolesOfDealParam.IDS, 34096432267003n);
        //Call getAllContactRolesOfDeal method that takes Param instance as parameter
        let response = await contactRolesOperations.getAllContactRolesOfDeal(
            dealId,
            paramInstance
        );
        if (response !== null) {
            console.log("Status Code: " + response.getStatusCode());
            if (response.getStatusCode() == 204) {
                console.log("No Content");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.ContactRoles.RecordResponseWrapper) {
                let responseWrapper = responseHandler;
                let records = responseWrapper.getData();
                for (let record of records) {
                    console.log("Record ID: " + record.getId());
                    let createdBy = record.getCreatedBy();
                    if (createdBy != null) {
                        console.log("Record Created By User-ID: " + createdBy.getId());
                        console.log("Record Created By User-Name: " + createdBy.getName());
                        console.log(
                            "Record Created By User-Email: " + createdBy.getEmail()
                        );
                    }
                    console.log("Record CreatedTime: " + record.getCreatedTime());
                    let modifiedBy = record.getModifiedBy();
                    if (modifiedBy != null) {
                        console.log("Record Modified By User-ID: " + modifiedBy.getId());
                        console.log(
                            "Record Modified By User-Name: " + modifiedBy.getName()
                        );
                        console.log(
                            "Record Modified By User-Email: " + modifiedBy.getEmail()
                        );
                    }
                    console.log("Record ModifiedTime: " + record.getModifiedTime());
                    let tags = record.getTag();
                    if (tags != null) {
                        tags.forEach((tag) => {
                            console.log("Record Tag Name: " + tag.getName());
                            console.log("Record Tag ID: " + tag.getId());
                        });
                    }
                    //To get particular field value
                    console.log("Record Field Value: " + record.getKeyValue("Last_Name")); // FieldApiName
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
                                } else {
                                    console.log(data);
                                }
                            }
                        } else if (value instanceof Map) {
                            console.log("Record keyName: " + keyName);
                            for (let mapKey in value) {
                                console.log(mapKey + " : " + value.get(mapKey));
                            }
                        } else {
                            console.log("Record keyName: " + keyName + " - Value - " + value);
                        }
                    }
                }
                let info = responseWrapper.getInfo();
                if (info != null) {
                    if (info.getCount() != null) {
                        console.log("Record Info Count: " + info.getCount().toString());
                    }
                    if (info.getMoreRecords() != null) {
                        console.log(
                            "Record Info MoreRecords: " + info.getMoreRecords().toString()
                        );
                    }
                }
            }
            else if (responseHandler instanceof ZOHOCRMSDK.ContactRoles.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach((key) => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }
}
await GetAllContactRolesOfDeal.initialize();
let dealId = 30010n;
await GetAllContactRolesOfDeal.getAllContactRolesOfDeal(dealId);
export {
    GetAllContactRolesOfDeal as GetAllContactRolesOfDeal
}
