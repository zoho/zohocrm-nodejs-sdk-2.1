const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const AssignmentRulesOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/assignment_rules/assignment_rules_operations").AssignmentRulesOperations;
const GetAssignmentRuleParam = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/assignment_rules/assignment_rules_operations").GetAssignmentRuleParam;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/assignment_rules/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/assignment_rules/api_exception").APIException;

class AssignmentRules {
    /**
     * <h3> Get AssignmentRules</h3>
     * This method is used to get assignment rules
     * @returns 
     */
    static async getAssignmentRules() {
        //Get instance of AssignmentRulesOperations Class
        let assignmentRulesOperations = new AssignmentRulesOperations();

        //Call getAssignmentRules method
        let response = await assignmentRulesOperations.getAssignmentRules();

        if (response != null) {

            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained AssignmentRule instances
                let assignmentRules = responseWrapper.getAssignmentRules();

                assignmentRules.forEach(assignmentRule => {
                    //Get the  ModifiedTime of each AssignmentRule
                    console.log("AssignmentRule ModifiedTime : " + assignmentRule.getModifiedTime());

                    //Get the  createdTime of each AssignmentRule
                    console.log("AssignmentRule CreatedTime : " + assignmentRule.getCreatedTime());

                    let defaultAssignee = assignmentRule.getDefaultAssignee();

                    if (defaultAssignee != null) {
                        //Get the id of DefaultAssignee
                        console.log("AssignmentRule DefaultAssignee Id : " + defaultAssignee.getId());

                        //Get the name of DefaultAssignee
                        console.log("AssignmentRule DefaultAssignee Name : " + defaultAssignee.getName());
                    }

                    let module = assignmentRule.getModule();

                    if (module != null) {
                        //Get the id of  Module
                        console.log("AssignmentRule Module Id : " + module.getId());

                        //Get the apiName of  Module
                        console.log("AssignmentRule Module APIName : " + module.getAPIName());
                    }

                    //Get the name of each AssignmentRule
                    console.log("AssignmentRule Name : " + assignmentRule.getName());

                    let modifiedBy = assignmentRule.getModifiedBy();

                    if (modifiedBy != null) {
                        //Get the id of ModifiedBy
                        console.log("AssignmentRule ModifiedBy User-Id : " + modifiedBy.getId());

                        //Get the name of ModifiedBy
                        console.log("AssignmentRule ModifiedBy User-Name : " + modifiedBy.getName());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule ModifiedBy User-Email : " + modifiedBy.getEmail());
                    }

                    let createdBy = assignmentRule.getCreatedBy();

                    if (createdBy != null) {
                        //Get the id of CreatedBy
                        console.log("AssignmentRule CreatedBy User-Id : " + createdBy.getId());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule CreatedBy User-Name : " + createdBy.getName());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule CreatedBy User-Email : " + createdBy.getEmail());
                    }

                    //Get the ID of each AssignmentRule
                    console.log("AssignmentRule ID : " + assignmentRule.getId());

                    //Get the  description of each AssignmentRule
                    console.log("AssignmentRule Description : " + assignmentRule.getDescription());
                });
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {

                //Get the Status
                console.log("Status: " + responseHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + responseHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = responseHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }

    /**
     * <h3> Get AssignmentRule</h3>
     * This method is used to get a single assignment rule
     * @param {BigInt} ruleId The id of the assignment rule
     * @returns 
     */
    static async getAssignmentRule(ruleId) {
        let paramInstance = new ParameterMap();

        await paramInstance.add(GetAssignmentRuleParam.MODULE, "Leads");

        //Get instance of AssignmentRulesOperations Class
        let assignmentRulesOperations = new AssignmentRulesOperations();

        //Call getAssignmentRule method that takes ruleId and ParameterMap instance as parameter
        let response = await assignmentRulesOperations.getAssignmentRule(ruleId, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained AssignmentRule instances
                let assignmentRules = responseWrapper.getAssignmentRules();

                assignmentRules.forEach(assignmentRule => {
                    //Get the  ModifiedTime of each AssignmentRule
                    console.log("AssignmentRule ModifiedTime : " + assignmentRule.getModifiedTime());

                    //Get the  createdTime of each AssignmentRule
                    console.log("AssignmentRule CreatedTime : " + assignmentRule.getCreatedTime());

                    let defaultAssignee = assignmentRule.getDefaultAssignee();

                    if (defaultAssignee != null) {
                        //Get the id of DefaultAssignee
                        console.log("AssignmentRule DefaultAssignee Id : " + defaultAssignee.getId());

                        //Get the name of DefaultAssignee
                        console.log("AssignmentRule DefaultAssignee Name : " + defaultAssignee.getName());
                    }

                    let module = assignmentRule.getModule();

                    if (module != null) {
                        //Get the id of  Module
                        console.log("AssignmentRule Module Id : " + module.getId());

                        //Get the apiName of  Module
                        console.log("AssignmentRule Module APIName : " + module.getAPIName());
                    }

                    //Get the name of each AssignmentRule
                    console.log("AssignmentRule Name : " + assignmentRule.getName());

                    let modifiedBy = assignmentRule.getModifiedBy();

                    if (modifiedBy != null) {
                        //Get the id of ModifiedBy
                        console.log("AssignmentRule ModifiedBy Id : " + modifiedBy.getId());

                        //Get the name of ModifiedBy
                        console.log("AssignmentRule ModifiedBy Name : " + modifiedBy.getName());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule ModifiedBy User-Email : " + modifiedBy.getEmail());
                    }

                    let createdBy = assignmentRule.getCreatedBy();

                    if (createdBy != null) {
                        //Get the id of CreatedBy
                        console.log("AssignmentRule CreatedBy Id : " + createdBy.getId());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule CreatedBy Name : " + createdBy.getName());

                        //Get the name of CreatedBy
                        console.log("AssignmentRule CreatedBy User-Email : " + createdBy.getEmail());
                    }

                    //Get the ID of each AssignmentRule
                    console.log("AssignmentRule ID : " + assignmentRule.getId());

                    //Get the  description of each AssignmentRule
                    console.log("AssignmentRule Description : " + assignmentRule.getDescription());
                });
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {

                //Get the Status
                console.log("Status: " + responseHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + responseHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = responseHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }

    }
}

module.exports = { AssignmentRules }