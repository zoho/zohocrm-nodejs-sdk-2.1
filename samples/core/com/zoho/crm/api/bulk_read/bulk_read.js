const fs = require("fs");
const path = require("path");
const BulkReadOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/bulk_read_operations").BulkReadOperations;
const RequestWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/request_wrapper").RequestWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/action_wrapper").ActionWrapper;
const FileBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/file_body_wrapper").FileBodyWrapper;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/success_response").SuccessResponse;
const CallBack = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/call_back").CallBack;
const Criteria = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/criteria").Criteria;
const Query = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/bulk_read/query").Query;
const Choice = require("@zohocrm/nodejs-sdk-2.1/utils/util/choice").Choice;
const Module = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/modules/module").Module;
const Field = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/fields/field").Field;

class BulkRead {
    /**
     * <h3> Create BulkRead Job </h3>
     * This method is used to create a bulk read job to export records.
     * @param {String} moduleAPIName  The API Name of the record's module
     */
    static async createBulkReadJob(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of BulkReadOperations Class
        let bulkReadOperations = new BulkReadOperations();

        //Get instance of RequestWrapper Class that will contain the request body
        let requestWrapper = new RequestWrapper();

        //Specifies the API Name of the module to be read.
        let module = new Module();

        module.setAPIName(moduleAPIName);

        //Get instance of CallBack Class
        let callBack = new CallBack();

        //Set valid callback URL.
        callBack.setUrl("https://www.example.com/callback");

        //Set the HTTP method of the callback URL. The allowed value is post.
        callBack.setMethod(new Choice("post"));

        //The Bulk Read Job's details is posted to this URL on successful completion / failure of the job.
        requestWrapper.setCallback(callBack);

        //Get instance of Query Class
        let query = new Query();

        // Specifies the  the module to be read.
        query.setModule(module);

        //Specifies the unique ID of the custom view, whose records you want to export.
        // query.setCvid("0087501");

        //Array of field names
        let fieldAPINames = [];

        // fieldAPINames.push("Last_Name");

        //Specifies the API Name of the fields to be fetched.
        // query.setFields(fieldAPINames);

        //To set page value, By default value is 1.
        query.setPage(1);

        //Get instance of Criteria Class
        let criteria = new Criteria();

        criteria.setGroupOperator(new Choice("or"));

        let criteriaArray = [];

        let group11 = new Criteria();

        group11.setGroupOperator(new Choice("and"));

        let groupArray11 = [];

        let group111 = new Criteria();

        let field1 = new Field();

        field1.setAPIName("Company");

        group111.setField(field1);

        group111.setComparator(new Choice("equal"));

        group111.setValue("Zoho");

        groupArray11.push(group111);

        let group112 = new Criteria();

        let field2 = new Field();

        field2.setAPIName("Owner");

        group112.setField(field2);

        group112.setComparator(new Choice("in"));

        group112.setValue(["34770610173021"]);

        groupArray11.push(group112);

        group11.setGroup(groupArray11);

        criteriaArray.push(group11);

        let group12 = new Criteria();

        group12.setGroupOperator(new Choice("or"));

        let groupArray12 = [];

        let group121 = new Criteria();

        let field3 = new Field();

        field3.setAPIName("Paid");

        group121.setField(field3);

        group121.setComparator(new Choice("equal"));

        group121.setValue(true);

        groupArray12.push(group121);

        let group122 = new Criteria();

        let field4 = new Field();

        // To set API name of a field.
        field4.setAPIName("Created_Time");

        group122.setField(field4);

        // To set comparator(eg: equal, greater_than.).
        group122.setComparator(new Choice("between"));

        let time = ["2020-06-03T17:31:48+05:30", "2020-06-03T17:31:48+05:30"];

        // To set the value to be compared
        group122.setValue(time);

        groupArray12.push(group122);

        group12.setGroup(groupArray12);

        criteriaArray.push(group12);

        criteria.setGroup(criteriaArray);

        //To filter the records to be exported.
        query.setCriteria(criteria);

        //Set the query object
        requestWrapper.setQuery(query);

        //Specify the value for this key as "ics" to export all records in the Events module as an ICS file.
        //requestWrapper.setFileType(new Choice("ics"));

        //Call createBulkReadJob method that takes RequestWrapper instance as parameter
        let response = await bulkReadOperations.createBulkReadJob(requestWrapper);

        if (response != null) {

            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {

                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {

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
     * <h3> Get BulkRead Job Details</h3>
     * This method is used to get the details of a bulk read job performed previously.
     * @param {BigInt} jobId The unique ID of the bulk read job.
     */
    static async getBulkReadJobDetails(jobId) {

        //example
        // let jobId = 2461001n;

        //Get instance of BulkReadOperations Class
        let bulkReadOperations = new BulkReadOperations();

        //Call getBulkReadJobDetails method that takes jobId as parameter
        let response = await bulkReadOperations.getBulkReadJobDetails(jobId);

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

                //Check if expected ResponseWrapper instance is received.
                if (responseObject instanceof ResponseWrapper) {

                    //Get the array of obtained jobDetail instances
                    let jobDetails = responseObject.getData();

                    jobDetails.forEach(jobDetail => {

                        //Get the Job ID of each jobDetail
                        console.log("Bulk read Job ID: " + jobDetail.getId());

                        //Get the Operation of each jobDetail
                        console.log("Bulk read Operation: " + jobDetail.getOperation());

                        //Get the State of each jobDetail
                        console.log("Bulk read State: " + jobDetail.getState().getValue());

                        //Get the Result instance of each jobDetail
                        let result = jobDetail.getResult();

                        //Check if Result is not null
                        if (result != null) {
                            //Get the Page of the Result
                            console.log("Bulkread Result Page: " + result.getPage().toString());

                            //Get the Count of the Result
                            console.log("Bulkread Result Count: " + result.getCount().toString());

                            //Get the Download URL of the Result
                            console.log("Bulkread Result Download URL: " + result.getDownloadUrl());

                            //Get the Per_Page of the Result
                            console.log("Bulkread Result Per_Page: " + result.getPerPage().toString());

                            //Get the MoreRecords of the Result
                            console.log("Bulkread Result MoreRecords: " + result.getMoreRecords().toString());

                        }

                        // Get the Query instance of each jobDetail
                        let query = jobDetail.getQuery();

                        if (query != null) {
                            let module = query.getModule();

                            if (module != null) {
                                //Get the Module Name of the Query
                                console.log("Bulkread Query Module Name : " + module.getAPIName());

                                //Get the Module Id of the Query
                                console.log("Bulkread Query Module Id : " + module.getId());
                            }

                            //Get the Module Name of the Query
                            console.log("Bulk read Query Module: " + query.getModule());

                            //Get the Page of the Query
                            console.log("Bulk read Query Page: " + query.getPage().toString());

                            //Get the cvid of the Query
                            console.log("Bulk read Query cvid: " + query.getCvid());

                            //Get the fields List of each Query
                            let fields = query.getFields();

                            //Check if fields is not null
                            if (fields != null) {
                                fields.forEach(fieldName => {
                                    //Get the Field Name of the Query
                                    console.log("Bulk read Query Fields: " + fieldName);
                                });
                            }

                            // Get the Criteria instance of each Query
                            let criteria = query.getCriteria();

                            //Check if criteria is not null
                            if (criteria != null) {
                                this.printCriteria(criteria);
                            }
                        }

                        //Get the CreatedBy User instance of each jobDetail
                        let createdBy = jobDetail.getCreatedBy();

                        //Check if createdBy is not null
                        if (createdBy != null) {
                            //Get the ID of the CreatedBy User
                            console.log("Bulkread Created By User-ID: " + createdBy.getId());

                            //Get the Name of the CreatedBy User
                            console.log("Bulkread Created By user-Name: " + createdBy.getName());
                        }

                        //Get the CreatedTime of each jobDetail
                        console.log("Bulkread CreatedTime: " + jobDetail.getCreatedTime());

                        //Get the FileType of each jobDetail
                        console.log("Bulkread File Type: " + jobDetail.getFileType());
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

    static async printCriteria(criteria) {

        let field = criteria.getField();

        if (field != null) {
            //Get the Field Id of the Criteria
            console.log("Bulkread Query Criteria Field Id: " + field.getId());

            //Get the Field APIName of the Criteria
            console.log("Bulkread Query Criteria Field APIName: " + field.getAPIName());
        }

        if (criteria.getComparator() != null) {
            //Get the Comparator of the Criteria
            console.log("BulkRead Criteria Comparator: " + criteria.getComparator().getValue());
        }

        if (criteria.getValue() != null) {
            //Get the Value of the Criteria
            console.log("BulkRead Criteria Value: " + criteria.getValue().toString());
        }

        //Get the array of Criteria instance of each Criteria
        let criteriaGroup = criteria.getGroup();

        if (criteriaGroup != null) {
            criteriaGroup.forEach(eachCriteria => {
                this.printCriteria(eachCriteria);
            });
        }

        if (criteria.getGroupOperator() != null) {
            //Get the Group Operator of the Criteria
            console.log("BulkRead Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }

    /**
     * <h3> Download Result</h3>
     * This method is used to download the result of Bulk Read operation
     * @param {BigInt} jobId The unique ID of the bulk read job.
     * @param {String} destinationFolder The absolute path where downloaded file has to be stored.
     */
    static async downloadResult(jobId, destinationFolder) {
        //example
        //String jobId = 2461001n;
        //String destinationFolder = "/Users/user_name/Documents";

        //Get instance of BulkReadOperations Class
        let bulkReadOperations = new BulkReadOperations();

        //Call downloadResult method that takes jobId as parameter
        let response = await bulkReadOperations.downloadResult(jobId);

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
                //Check if expected FileBodyWrapper instance is received.
                if (responseObject instanceof FileBodyWrapper) {
                    //Get StreamWrapper instance from the returned FileBodyWrapper instance
                    let streamWrapper = responseObject.getFile();

                    //Construct the file name by joining the destinationFolder and the name from StreamWrapper instance
                    let fileName = path.join(destinationFolder, streamWrapper.getName());

                    //Get the stream from StreamWrapper instance
                    let readStream = streamWrapper.getStream();

                    //Write the stream to the destination file.
                    fs.writeFileSync(fileName, readStream);
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

module.exports = { BulkRead }