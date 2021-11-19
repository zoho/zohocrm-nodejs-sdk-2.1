const { ShareRecordsOperations, GetSharedRecordDetailsParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/share_records_operations");
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/response_wrapper").ResponseWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/body_wrapper").BodyWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/action_wrapper").ActionWrapper;
const DeleteActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/delete_action_wrapper").DeleteActionWrapper;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/success_response").SuccessResponse;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/api_exception").APIException;
const ZCRMShareRecord = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/share_records/share_record").ShareRecord;
const ZCRMUser = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/users/user").User;

class ShareRecord {

    /**
     * <h3> Get Shared Record Details </h3>
     * This method is used to get the details of a shared record and print the response.
     * @param {String} moduleAPIName The API Name of the module to get shared record details.
     * @param {BigInt} recordId The ID of the record to be obtain shared information
     */
    static async getSharedRecordDetails(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 2112011n;

        //Get instance of ShareRecordsOperations Class that takes moduleAPIName and recordId as parameter
        let sharedRecordsOperations = new ShareRecordsOperations(recordId, moduleAPIName);

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters of Get Shared Record Details operation */
        await paramInstance.add(GetSharedRecordDetailsParam.VIEW, "summary");

        // await paramInstance.add(GetSharedRecordDetailsParam.SHAREDTO, "00302031");

        //Call getSharedRecordDetails method that takes ParameterMap instance as parameter
        let response = await sharedRecordsOperations.getSharedRecordDetails(paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained ShareRecord instances
                    let shareRecords = responseObject.getShare();

                    shareRecords.forEach(shareRecord => {
                        //Get the ShareRelatedRecords of each ShareRecord
                        console.log("ShareRecord ShareRelatedRecords: " + shareRecord.getShareRelatedRecords().toString());

                        //Get the SharedThrough instance of each ShareRecord
                        let sharedThrough = shareRecord.getSharedThrough();

                        //Check if sharedThrough is not null
                        if (sharedThrough != null) {
                            //Get the EntityName of the SharedThrough
                            console.log("ShareRecord SharedThrough EntityName: " + sharedThrough.getEntityName());

                            let module = sharedThrough.getModule();

                            if (module != null) {
                                //Get the ID of the Module
                                console.log("ShareRecord SharedThrough Module ID: " + module.getId().toString());

                                //Get the name of the Module
                                console.log("ShareRecord SharedThrough Module Name: " + module.getName());
                            }

                            //Get the ID of the SharedThrough
                            console.log("ShareRecord SharedThrough ID: " + sharedThrough.getId());
                        }

                        //Get the SharedTime of each ShareRecord
                        console.log("ShareRecord SharedTime: " + shareRecord.getSharedTime().toString());

                        //Get the Permission of each ShareRecord
                        console.log("ShareRecord Permission: " + shareRecord.getPermission().toString());

                        //Get the sharedBy of each ShareRecord
                        let sharedBy = shareRecord.getSharedBy();

                        if (sharedBy != null) {
                            //Get the ID of the  User
                            console.log("ShareRecord SharedBy-ID: " + sharedBy.getId());

                            //Get the FullName of the  User
                            console.log("ShareRecord SharedBy-FullName: " + sharedBy.getFullName());

                            //Get the Zuid of the  User
                            console.log("ShareRecord SharedBy-Zuid: " + sharedBy.getZuid());
                        }

                        //Get the shared User instance of each ShareRecord
                        let user = shareRecord.getUser();

                        //Check if user is not null
                        if (user != null) {
                            //Get the ID of the shared User
                            console.log("ShareRecord User-ID: " + user.getId());

                            //Get the FullName of the shared User
                            console.log("ShareRecord User-FullName: " + user.getFullName());

                            //Get the Zuid of the shared User
                            console.log("ShareRecord User-Zuid: " + user.getZuid());
                        }
                    });

                    let shareableUsers = responseObject.getShareableUser();

                    if (shareableUsers != null) {
                        shareableUsers.forEach(shareableUser => {
                            //Get the ID of the shareable User
                            console.log("Shareable User User-ID: " + shareableUser.getId());

                            //Get the FullName of the shareable User
                            console.log("Shareable User User-FullName: " + shareableUser.getFullName());

                            //Get the Zuid of the shareable User
                            console.log("Shareable User User-Zuid: " + shareableUser.getZuid());
                        });
                    }
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Share Record </h3>
     * This method is used to share the record and print the response.
     * @param {String} moduleAPIName The API Name of the module to share record.
     * @param {BigInt} recordId The ID of the record to be shared
     */
    static async shareRecord(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 112011n;

        //Get instance of ShareRecordsOperations Class that takes moduleAPIName and recordId as parameter
        let sharedRecordsOperations = new ShareRecordsOperations(recordId, moduleAPIName);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold ShareRecord instances
        let shareRecordArray = [];

        //Get instance of ShareRecord Class
        let shareRecord = new ZCRMShareRecord();

        //Set boolean value to share related records
        shareRecord.setShareRelatedRecords(false);

        //Set the permission. Possible values - full_access, read_only, read_write
        shareRecord.setPermission("read_write");

        //Get instance of User Class
        let user = new ZCRMUser();

        //Set User ID
        user.setId(34770615791024n);

        //Set the User instance to user
        shareRecord.setUser(user);

        //Add the instance to array
        shareRecordArray.push(shareRecord);

        //Set the array to share of BodyWrapper instance
        request.setShare(shareRecordArray);

        //Call shareRecord method that takes BodyWrapper instance as parameter
        let response = await sharedRecordsOperations.shareRecord(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getShare();

                    actionResponses.forEach(actionResponse => {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        //Check if the request returned an exception
                        else if (actionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Update Share Permissions </h3>
     * This method is used to update the sharing permissions of a record granted to users as Read-Write, Read-only, or grant full access.
     * @param {String} moduleAPIName The API Name of the module to update share permissions.
     * @param {BigInt} recordId The ID of the record
     */
    static async updateSharePermissions(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 12011n;

        //Get instance of ShareRecordsOperations Class that takes moduleAPIName and recordId as parameter
        let sharedRecordsOperations = new ShareRecordsOperations(recordId, moduleAPIName);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold ShareRecord instances
        let shareRecordArray = [];

        //Get instance of ShareRecord
        let shareRecord = new ZCRMShareRecord();

        //Set the permission
        shareRecord.setPermission("full_access");

        //Set the boolean value to share related records
        shareRecord.setShareRelatedRecords(true);

        //Get instance of User Class
        let user = new ZCRMUser();

        //Set ID to the User
        user.setId(34770615791024n);

        //Set user instance to user in ShareRecord instance
        shareRecord.setUser(user);

        //Add the instance to array
        shareRecordArray.push(shareRecord);

        //Set the array to share in BodyWrapper
        request.setShare(shareRecordArray);

        //Call updateSharePermissions method that takes BodyWrapper instance as parameter
        let response = await sharedRecordsOperations.updateSharePermissions(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getShare();

                    actionResponses.forEach(actionResponse => {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        //Check if the request returned an exception
                        else if (actionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    /**
     * <h3> Revoke Shared Record </h3>
     * This method is used to revoke access to a shared record that was shared to users and print the response.
     * @param {String} moduleAPIName The API Name of the module to revoke shared record.
     * @param {BigInt} recordId The ID of the record
     */
    static async revokeSharedRecord(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 2112011n;

        //Get instance of ShareRecordsOperations Class that takes moduleAPIName and recordId as parameter
        let shareRecordsOperations = new ShareRecordsOperations(recordId, moduleAPIName);

        //Call revokeSharedRecord method
        let response = await shareRecordsOperations.revokeSharedRecord();

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof DeleteActionWrapper) {
                    let deleteActionResponse = responseObject.getShare();

                    if (deleteActionResponse instanceof SuccessResponse) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());

                        console.log("Code: " + deleteActionResponse.getCode().getValue());

                        console.log("Details");

                        let details = deleteActionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
                    }
                    else if (actionResponse instanceof APIException) {
                        console.log("Status: " + deleteActionResponse.getStatus().getValue());

                        console.log("Code: " + deleteActionResponse.getCode().getValue());

                        console.log("Details");

                        let details = deleteActionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        console.log("Message: " + deleteActionResponse.getMessage().getValue());
                    }
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {
                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
}

module.exports = { ShareRecord }