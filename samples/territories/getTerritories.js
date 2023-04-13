import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetTerritories{
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
     * <h3> Get Territories </h3>
     * This method is used to get the list of territories enabled for your organization and print the response.
     */
    static async getTerritories() {
        let territoriesOperations = new ZOHOCRMSDK.Territories.TerritoriesOperations();
        //Call getTerritories method
        let response = await territoriesOperations.getTerritories();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Territories.ResponseWrapper) {
                    let territories = responseObject.getTerritories();
                    territories.forEach(territory => {
                        console.log("Territory CreatedTime: " + territory.getCreatedTime());
                        console.log("Territory PermissionType: " + territory.getPermissionType());
                        console.log("Territory ModifiedTime: " + territory.getModifiedTime());
                        let manager = territory.getManager();
                        if (manager != null) {
                            console.log("Territory Manager User-Name: " + manager.getName());
                            console.log("Territory Manager User-ID: " + manager.getId());
                        }
                        let criteria = territory.getAccountRuleCriteria();
                        if (criteria != null) {
                            this.printCriteria(criteria);
                        }
                        console.log("Territory Name: " + territory.getName());
                        let modifiedBy = territory.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Territory Modified By User-Name: " + modifiedBy.getName());
                            console.log("Territory Modified By User-ID: " + modifiedBy.getId());
                        }
                        console.log("Territory Description: " + territory.getDescription());
                        console.log("Territory ID: " + territory.getId());
                        let reportingTo = territory.getReportingTo();
                        if (reportingTo != null) {
                            console.log("Territory ReportingTo User-Name: " + reportingTo.getName());
                            console.log("Territory ReportingTo User-ID: " + reportingTo.getId());
                        }
                        let dealcriteria = territory.getDealRuleCriteria();
                        if (dealcriteria != null) {
                            this.printCriteria(dealcriteria);
                        }
                        let createdBy = territory.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Territory Created By User-Name: " + createdBy.getName());
                            console.log("Territory Created By User-ID: " + createdBy.getId());
                        }
                    });
                    let info = responseObject.getInfo();
                    console.log("Territory Info PerPage : " + info.getPerPage());
                    console.log("Territory Info Count : " + info.getCount());
                    console.log("Territory Info Page : " + info.getPage());
                    console.log("Territory Info MoreRecords : " + info.getMoreRecords());
                }
                else if (responseObject instanceof ZOHOCRMSDK.Territories.APIException) {
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
    static async printCriteria(criteria) {
        let field = criteria.getField();
        if (field != null) {
            console.log("Territory Query Criteria Field Id: " + field.getId());
            console.log("Territory Query Criteria Field APIName: " + field.getAPIName());
        }
        if (criteria.getComparator() != null) {
            console.log("Territory Criteria Comparator: " + criteria.getComparator().getValue());
        }
        if (criteria.getValue() != null) {
            console.log("Territory Criteria Value: " + criteria.getValue().toString());
        }
        let criteriaGroup = criteria.getGroup();
        if (criteriaGroup != null) {
            criteriaGroup.forEach(eachCriteria => {
                this.printCriteria(eachCriteria);
            });
        }
        if (criteria.getGroupOperator() != null) {
            console.log("Territory Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }
}
await GetTerritories.initialize();
await GetTerritories.getTerritories();
export {
    GetTerritories as GetTerritories
}
