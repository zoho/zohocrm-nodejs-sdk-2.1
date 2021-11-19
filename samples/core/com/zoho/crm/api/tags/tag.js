const { TagsOperations, AddTagsToMultipleRecordsParam, AddTagsToRecordParam, CreateTagsParam, GetRecordCountForTagParam, GetTagsParam, RemoveTagsFromMultipleRecordsParam, RemoveTagsFromRecordParam, UpdateTagParam, UpdateTagsParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/tags_operations");
const ZCRMTag = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/tag").Tag;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/response_wrapper").ResponseWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/body_wrapper").BodyWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/action_wrapper").ActionWrapper;
const RecordActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/record_action_wrapper").RecordActionWrapper;
const MergeWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/merge_wrapper").MergeWrapper;
const CountWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/count_wrapper").CountWrapper;
const ConflictWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/conflict_wrapper").ConflictWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/success_response").SuccessResponse;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;

class Tag {

    /**
     * <h3> Get Tags </h3>
     * This method is used to get all the tags in a module
     * @param {String} moduleAPIName The API Name of the module to get tags.
     */
    static async getTags(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters of Get Tags operation */

        await paramInstance.add(GetTagsParam.MODULE, moduleAPIName);

        await paramInstance.add(GetTagsParam.MY_TAGS, "true");

        //Call getTags method that takes ParameterMap instance as parameter
        let response = await tagsOperations.getTags(paramInstance);

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
                    //Get the array of obtained Tag instances
                    let tags = responseObject.getTags();

                    tags.forEach(tag => {
                        //Get the CreatedTime of each Tag
                        console.log("Tag CreatedTime: " + tag.getCreatedTime());

                        //Get the ModifiedTime of each Tag
                        console.log("Tag ModifiedTime: " + tag.getModifiedTime());

                        //Get the Name of each Tag
                        console.log("Tag Name: " + tag.getName());

                        //Get the modifiedBy User instance of each Tag
                        let modifiedBy = tag.getModifiedBy();

                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            //Get the ID of the modifiedBy User
                            console.log("Tag Modified By User-ID: " + modifiedBy.getId());

                            //Get the name of the modifiedBy User
                            console.log("Tag Modified By User-Name: " + modifiedBy.getName());
                        }

                        //Get the ID of each Tag
                        console.log("Tag ID: " + tag.getId());

                        //Get the createdBy User instance of each Tag
                        let createdBy = tag.getCreatedBy();

                        //Check if createdBy is not null
                        if (createdBy != null) {
                            //Get the ID of the createdBy User
                            console.log("Tag Created By User-ID: " + createdBy.getId());

                            //Get the name of the createdBy User
                            console.log("Tag Created By User-Name: " + createdBy.getName());
                        }
                    });

                    //Get the obtained Info object
                    let info = responseObject.getInfo();

                    //Check if info is not null
                    if (info != null) {
                        if (info.getCount() != null) {
                            //Get the Count of the Info
                            console.log("Tag Info Count: " + info.getCount().toString());
                        }

                        if (info.getAllowedCount() != null) {
                            //Get the AllowedCount of the Info
                            console.log("Tag Info AllowedCount: " + info.getAllowedCount().toString());
                        }
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
     * <h3> Create Tags </h3>
     * This method is used to create new tags and print the response.
     * @param {String} moduleAPIName The API Name of the module to create tags.
     */
    static async createTags(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Create Tags operation */

        await paramInstance.add(CreateTagsParam.MODULE, moduleAPIName);

        //Array to hold Tag instances
        let tagsArray = [];

        for (let index = 0; index < 3; index++) {

            //Get instance of Tag Class
            let tag = new ZCRMTag();

            //Set Name to tag
            tag.setName("tag1" + index.toString());

            //Add the Tag instance to array
            tagsArray.push(tag);
        }

        //Set the array to tags in BodyWrapper instance
        request.setTags(tagsArray);

        //Call createTags method that takes BodyWrapper instance and ParameterMap instance as parameter
        let response = await tagsOperations.createTags(request, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getTags();

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
     * <h3> Update Tags </h3>
     * This method is used to update multiple tags simultaneously and print the response.
     * @param {String} moduleAPIName The API Name of the module to update tags
     */
    static async updateTags(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Update Tags operation */
        await paramInstance.add(UpdateTagsParam.MODULE, moduleAPIName);

        //Array to hold Tag instances
        let tagsArray = [];

        //Get instance of Tag Class
        let tag = new ZCRMTag();

        //Set ID to tag instance
        tag.setId(347706112581003n);

        //Set name
        tag.setName("edited-tagname1234");

        //Add the instance to array
        tagsArray.push(tag);

        //Set the array to tags in BodyWrapper instance
        request.setTags(tagsArray);

        //Call updateTags method that takes BodyWrapper instance and ParameterMap instance as parameter
        let response = await tagsOperations.updateTags(request, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getTags();

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
     * <h3> Update Tag </h3>
     * This method is used to update single tag and print the response.
     * @param {String} moduleAPIName The API Name of the module to update tag.
     * @param {BigInt} tagId The ID of the tag to be updated
     */
    static async updateTag(moduleAPIName, tagId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagId = 661047n;

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Update Tag operation */
        await paramInstance.add(UpdateTagParam.MODULE, moduleAPIName);

        //Array to hold Tag instances
        let tagsArray = [];

        //Get instance of Tag Class
        let tag = new ZCRMTag();

        //Set Name
        tag.setName("tagName12345");

        //Add the instance to array
        tagsArray.push(tag);

        //Set the array to tags in BodyWrapper instance
        request.setTags(tagsArray);

        //Call updateTag method that takes BodyWrapper instance, ParameterMap instance and tagId as parameter
        let response = await tagsOperations.updateTag(tagId, request, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getTags();

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
     * <h3> Delete Tag </h3>
     * This method is used to delete a tag from the module and print the response.
     * @param {BigInt} tagId The ID of the tag to be deleted
     */
    static async deleteTag(tagId) {
        //example
        //let tagId = 0661047n;

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Call deleteTag method that takes tag id as parameter
        let response = await tagsOperations.deleteTag(tagId);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getTags();

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
     * <h3> Merge Tag </h3>
     * This method is used to merge tags and put all the records under the two tags into a single tag and print the response.
     * @param {BigInt} tagId The ID of the tag
     * @param {String} conflictId The ID of the conflict tag.
     */
    static async mergeTags(tagId, conflictId) {
        //example
        //let tagId = 30661047n;
        //let conflictId = "3661026";

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of MergeWrapper Class that will contain the request body
        let request = new MergeWrapper();

        //Array to hold ConflictWrapper instances
        let tagsArray = [];

        //Get instance of ConflictWrapper Class
        let conflictWrapper = new ConflictWrapper();

        //Set the conflict ID
        conflictWrapper.setConflictId(conflictId);

        //Add the instance to array
        tagsArray.push(conflictWrapper);

        //Set the array to tags in BodyWrapper instance
        request.setTags(tagsArray);

        //Call mergeTags method that takes MergeWrapper instance and tag id as parameter
        let response = await tagsOperations.mergeTags(tagId, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getTags();

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
     * <h3> Add Tags To Record </h3>
     * This method is used to add tags to a specific record and print the response.
     * @param {String} moduleAPIName  The API Name of the module to add tag.
     * @param {BigInt} recordId The ID of the record to add tag
     * @param {Array} tagNames The array of tag names
     */
    static async addTagsToRecord(moduleAPIName, recordId, tagNames) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 2157023n;
        // let tagNames = ["addtag1,addtag12"];

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Add Tags to Record operation */

        await paramInstance.add(AddTagsToRecordParam.TAG_NAMES, tagNames.toString());

        await paramInstance.add(AddTagsToRecordParam.OVER_WRITE, "false");

        //Call addTagsToRecord method that takes paramInstance, moduleAPIName and recordId as parameter
        let response = await tagsOperations.addTagsToRecord(recordId, moduleAPIName, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected RecordActionWrapper instance is received
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
     * <h3> Remove Tags From Record </h3>
     * This method is used to delete the tags associated with a specific record and print the response.
     * @param {String} moduleAPIName The API Name of the module to remove tags
     * @param {BigInt} recordId The ID of the record to delete tags
     * @param {Array} tagNames The array of the tag names to be removed.
     */
    static async removeTagsFromRecord(moduleAPIName, recordId, tagNames) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 2157023n;
        // let tagNames = ["addtag1,addtag12"];

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Remove Tags From Record operation */
        await paramInstance.add(RemoveTagsFromRecordParam.TAG_NAMES, tagNames.toString());

        //Call removeTagsFromRecord method that takes paramInstance, moduleAPIName and recordId as parameter
        let response = await tagsOperations.removeTagsFromRecord(recordId, moduleAPIName, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
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
     * <h3> Add Tags To Multiple Records </h3>
     * This method is used to add tags to multiple records simultaneously and print the response.
     * @param {String} moduleAPIName The API Name of the module to add tags.
     * @param {Array} recordIds The array of the record IDs to add tags
     * @param {Array} tagNames The array of tag names to be added
     */
    static async addTagsToMultipleRecords(moduleAPIName, recordIds, tagNames) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagNames = ["addtag1,addtag12"];
        // let recordIds = [34023026n, 527003n, 344028n];

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Add Tags To Multiple Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(AddTagsToMultipleRecordsParam.IDS, recordId);
        }

        await paramInstance.add(AddTagsToMultipleRecordsParam.TAG_NAMES, tagNames.toString());

        await paramInstance.add(AddTagsToMultipleRecordsParam.OVER_WRITE, "false");

        //Call addTagsToMultipleRecords method that takes ParameterMap instance and moduleAPIName as parameter
        let response = await tagsOperations.addTagsToMultipleRecords(moduleAPIName, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
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
     * <h3> Remove Tags From Multiple Records </h3>
     * This method is used to delete the tags associated with multiple records and print the response.
     * @param {String} moduleAPIName The API Name of the module to remove tags.
     * @param {Array} recordIds The array of record IDs to be remove tags.
     * @param {Array} tagNames The array of tag names to be removed
     */
    static async removeTagsFromMultipleRecords(moduleAPIName, recordIds, tagNames) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagNames = ["addtag1,addtag12"];
        // let recordIds = [23026n, 27003n, 94028n];

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Remove Tags from Multiple Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(RemoveTagsFromMultipleRecordsParam.IDS, recordId);
        }

        await paramInstance.add(RemoveTagsFromMultipleRecordsParam.TAG_NAMES, tagNames.toString());

        //Call RemoveTagsFromMultipleRecordsParam method that takes ParameterMap instance, moduleAPIName as parameter
        let response = await tagsOperations.removeTagsFromMultipleRecords(moduleAPIName, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
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
     * <h3> Get Record Count For Tag </h3>
     * This method is used to get the total number of records under a tag and print the response.
     * @param {String} moduleAPIName The API Name of the module.
     * @param {BigInt} tagId The ID of the tag to get the count
     */
    static async getRecordCountForTag(moduleAPIName, tagId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let tagId = 0661047n;

        //Get instance of TagsOperations Class
        let tagsOperations = new TagsOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Record Count operation */
        await paramInstance.add(GetRecordCountForTagParam.MODULE, moduleAPIName);

        //Call getRecordCountForTag method that takes paramInstance and tagId as parameter
        let response = await tagsOperations.getRecordCountForTag(tagId, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected CountWrapper instance is received
                if (responseObject instanceof CountWrapper) {
                    console.log("Tag Count: " + responseObject.getCount());
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

module.exports = { Tag }