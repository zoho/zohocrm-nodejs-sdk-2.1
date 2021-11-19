const { ContactRolesOperations, DeleteContactRolesParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/contact_roles_operations");
const { ParameterMap } = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map");
const ZCRMContactRole = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/contact_role").ContactRole;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/action_wrapper").ActionWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/body_wrapper").BodyWrapper;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/success_response").SuccessResponse;
const RecordResponseHandler = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/record_response_handler").RecordResponseHandler;
const Record = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/record").Record;
const RecordActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/record_action_wrapper").RecordActionWrapper;
const RecordBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/record_body_wrapper").RecordBodyWrapper;
const RecordResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/record_response_wrapper").RecordResponseWrapper;
const User = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/users/user").User;
const Tag = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/tag").Tag;
const Info = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/info").Info;
const ContactRoleWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/contact_role_wrapper").ContactRoleWrapper;
const RecordActionHandler = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/contact_roles/record_action_handler").RecordActionHandler;

class ContactRole {
    /**
     * <h3> Get Contact Roles </h3>
     * This method is used to get all the Contact Roles and print the response.
     */
    static async getContactRoles() {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Call getContactRoles method
        let response = await contactRolesOperations.getContactRoles();

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
                    //Get the array of obtained ContactRole instances
                    let contactRoles = responseObject.getContactRoles();

                    contactRoles.forEach(contactRole => {
                        //Get the ID of each ContactRole
                        console.log("ContactRole ID: " + contactRole.getId());

                        //Get the name of each ContactRole
                        console.log("ContactRole Name: " + contactRole.getName());

                        //Get the sequence number of each ContactRole
                        console.log("ContactRole SequenceNumber: " + contactRole.getSequenceNumber());
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
     * <h3> Create Contact Roles </h3>
     * This method is used to create Contact Roles and print the response.
     */
    static async createContactRoles() {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold ContactRole instances
        let contactRolesArray = [];

        for (let index = 1; index < 5; index++) {
            //Get instance of ContactRole Class
            let contactRole = new ZCRMContactRole();

            //Set name of the Contact Role
            contactRole.setName("contactRole-NodeJS" + index.toString());

            //Set sequence number of the Contact Role
            contactRole.setSequenceNumber(index);

            //Add ContactRole instance to the array
            contactRolesArray.push(contactRole);
        }

        //Set the array of contactRoles in BodyWrapper instance
        request.setContactRoles(contactRolesArray);

        //Call createContactRoles method that takes BodyWrapper instance as parameter
        let response = await contactRolesOperations.createContactRoles(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getContactRoles();

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

                            //Get the Message
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
     * <h3> Update Contact Roles </h3>
     * This method is used to update Contact Roles and print the response.
     */
    static async updateContactRoles() {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold ContactRole instances
        let contactRolesArray = [];

        //Get instance of ContactRole Class
        let cr1 = new ZCRMContactRole();

        //Set ID to the ContactRole instance
        cr1.setId(347706112517017n);

        //Set name to the ContactRole instance
        cr1.setName("Edited123");

        //Add ContactRole instance to the array
        contactRolesArray.push(cr1);

        //Get instance of ContactRole Class
        cr1 = new ZCRMContactRole();

        //Set ID to the ContactRole instance
        cr1.setId(347706112517019n);

        //Set name to the ContactRole instance
        cr1.setName("Edited2");

        //Add ContactRole instance to the array
        contactRolesArray.push(cr1);

        //Set the array to contactRoles in BodyWrapper instance
        request.setContactRoles(contactRolesArray);

        //Call updateContactRoles method that takes BodyWrapper instance as parameter
        let response = await contactRolesOperations.updateContactRoles(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getContactRoles();

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
     * <h3> Delete Contact Roles </h3>
     * This method is used to delete Contact Roles and print the response.
     * @param {Array} contactRoleIds The array of ContactRole IDs to be deleted.
     */
    static async deleteContactRoles(contactRoleIds) {
        //example
        //let contactRoleIds = ["2157002", "1619001", "6883"];

        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        //Add ids to ParameterMap instance
        for (let contactRoleId of contactRoleIds) {
            await paramInstance.add(DeleteContactRolesParam.IDS, contactRoleId);
        }

        //Call deleteContactRoles method that takes paramInstance as parameter
        let response = await contactRolesOperations.deleteContactRoles(paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getContactRoles();

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
     * <h3> Get Contact Role </h3>
     * This method is used to get single Contact Role with ID and print the response.
     * @param {BigInt} contactRoleId The ID of the ContactRole to be obtained
     */
    static async getContactRole(contactRoleId) {
        //example
        //let contactRoleId = 2212003n;

        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Call getContactRole method that takes contactRoleId as parameter
        let response = await contactRolesOperations.getContactRole(contactRoleId);

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
                    //Get the array of obtained ContactRole instances
                    let contactRoles = responseObject.getContactRoles();

                    contactRoles.forEach(contactRole => {
                        //Get the ID of each ContactRole
                        console.log("ContactRole ID: " + contactRole.getId());

                        //Get the name of each ContactRole
                        console.log("ContactRole Name: " + contactRole.getName());

                        //Get the sequence number of each ContactRole
                        console.log("ContactRole SequenceNumber: " + contactRole.getSequenceNumber());
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
     * <h3> Update Contact Role </h3>
     * This method is used to update single Contact Role with ID and print the response.
     * @param {BigInt} contactRoleId The ID of the ContactRole to be updated
     */
    static async updateContactRole(contactRoleId) {
        //example
        //let contactRoleId = 2212003n;

        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold ContactRole instances
        let contactRolesArray = [];

        //Get instance of ContactRole Class
        let cr1 = new ZCRMContactRole();

        //Set sequence number to the ContactRole instance
        cr1.setSequenceNumber(1);

        //Add ContactRole instance to the array
        contactRolesArray.push(cr1);

        //Set the array to contactRoles in BodyWrapper instance
        request.setContactRoles(contactRolesArray);

        //Call updateContactRole method that takes BodyWrapper instance and contactRoleId as parameters
        let response = await contactRolesOperations.updateContactRole(contactRoleId, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getContactRoles();

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
     * <h3> Delete Contact Role </h3>
     * This method is used to delete single Contact Role with ID and print the response.
     * @param {BigInt} contactRoleId ID of the ContactRole to be deleted
     */
    static async deleteContactRole(contactRoleId) {
        //example
        //let contactRoleId = 2212003n;

        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Call deleteContactRole which takes contactRoleId as parameter
        let response = await contactRolesOperations.deleteContactRole(contactRoleId);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getContactRoles();

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

    static async getAllContactRolesOfDeal(dealId) {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        // await paramInstance.add(GetAllContactRolesOfDealParam.IDS, 34096432267003n);

        //Call getAllContactRolesOfDeal method that takes Param instance as parameter 
        let response = await contactRolesOperations.getAllContactRolesOfDeal(dealId, paramInstance);

        if (response !== null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if (response.getStatusCode() == 204) {
                console.log("No Content");

                return;
            }

            //Get the object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof RecordResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the array of obtained Record instances
                let records = responseWrapper.getData();

                for (let record of records) {
                    //Get the ID of each Record
                    console.log("Record ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("Record Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("Record Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("Record Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("Record CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("Record Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("Record Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("Record Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("Record ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("Record Tag Name: " + tag.getName());

                            //Get the Id of each Tag
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

                //Get the obtained Info instance
                let info = responseWrapper.getInfo();

                if (info != null) {

                    if (info.getCount() != null) {
                        //Get the Count of the Info
                        console.log("Record Info Count: " + info.getCount().toString());
                    }

                    if (info.getMoreRecords() != null) {
                        //Get the MoreRecords of the Info
                        console.log("Record Info MoreRecords: " + info.getMoreRecords().toString());
                    }
                }
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

    static async getContactRoleOfDeal(contactId, dealId) {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Call getContactRoleOfDeal method that takes Param instance as parameter 
        let response = await contactRolesOperations.getContactRoleOfDeal(contactId, dealId);

        if (response !== null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if (response.getStatusCode() == 204) {
                console.log("No Content");

                return;
            }

            //Get the object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof RecordResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the array of obtained Record instances
                let records = responseWrapper.getData();

                for (let record of records) {
                    //Get the ID of each Record
                    console.log("Record ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("Record Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("Record Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("Record Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("Record CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("Record Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("Record Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("Record Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("Record ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("Record Tag Name: " + tag.getName());

                            //Get the Id of each Tag
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

                //Get the obtained Info instance
                let info = responseWrapper.getInfo();

                if (info != null) {

                    if (info.getCount() != null) {
                        //Get the Count of the Info
                        console.log("Record Info Count: " + info.getCount().toString());
                    }

                    if (info.getMoreRecords() != null) {
                        //Get the MoreRecords of the Info
                        console.log("Record Info MoreRecords: " + info.getMoreRecords().toString());
                    }
                }
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

    static async addContactRoleToDeal(contactId, dealId) {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new RecordBodyWrapper();

        //Get instance of ContactRole Class
        let contactRole = new ContactRoleWrapper();

        //Set name of the Contact Role
        contactRole.setContactRole("contactRole-node4");

        //Set the list to contactRoles in BodyWrapper instance
        bodyWrapper.setData([contactRole]);

        //Call createContactRoles method that takes BodyWrapper instance as parameter
        let response = await contactRolesOperations.addContactRoleToDeal(contactId, dealId, bodyWrapper);

        if (response !== null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject !== null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof RecordActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getData();

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

                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
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

                            if (details !== null) {
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

                    if (details !== null) {
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

    static async removeContactRoleFromDeal(contactId, dealId) {
        //Get instance of ContactRolesOperations Class
        let contactRolesOperations = new ContactRolesOperations();

        //Call removeContactRoleFromDeal method that takes BodyWrapper instance as parameter
        let response = await contactRolesOperations.removeContactRoleFromDeal(contactId, dealId);

        if (response !== null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject !== null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof RecordActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getData();

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

                            if (details !== null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
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

                            if (details !== null) {
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

                    if (details !== null) {
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


module.exports = { ContactRole }