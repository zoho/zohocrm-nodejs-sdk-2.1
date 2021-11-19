const { RelatedRecordsOperations, DelinkRecordsParam, GetRelatedRecordHeader, GetRelatedRecordsHeader, GetRelatedRecordsParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/related_records_operations");
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/response_wrapper").ResponseWrapper;
const FileBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/file_body_wrapper").FileBodyWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/body_wrapper").BodyWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/action_wrapper").ActionWrapper;
const ZCRMRecord = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/record").Record;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_records/success_response").SuccessResponse;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const HeaderMap = require("@zohocrm/nodejs-sdk-2.1/routes/header_map").HeaderMap;
const fs = require("fs");
const path = require("path");
const ZCRMUser = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/users/user").User;
const FileDetails = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/file_details").FileDetails;
const RemindAt = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/remind_at").RemindAt;
const Reminder = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/reminder").Reminder;
const Participants = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/participants").Participants;
const RecurringActivity = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/recurring_activity").RecurringActivity;
const ZCRMLayout = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/layouts/layout").Layout;
const PricingDetails = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/pricing_details").PricingDetails;
const Tag = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/tag").Tag;
const LineTax = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/line_tax").LineTax;
const Comment = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/comment").Comment;
const InventoryLineItems = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/inventory_line_items").InventoryLineItems;
const Choice = require("@zohocrm/nodejs-sdk-2.1/utils/util/choice").Choice;
const Consent = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/consent").Consent;

class RelatedRecord {

    /**
     * <h3> Get Related Records </h3>
     * This method is used to get the related list records and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related records.
     * @param {BigInt} recordId The ID of the record to be obtained.
     * @param {String} relatedListAPIName The API name of the related list
     */
    static async getRelatedRecords(moduleAPIName, recordId, relatedListAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 798007n;
        // let relatedListAPIName = "module_api_name";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Related Records operation */
        await paramInstance.add(GetRelatedRecordsParam.PAGE, 1);

        await paramInstance.add(GetRelatedRecordsParam.PER_PAGE, 200);

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Related Records operation */
        await headerInstance.add(GetRelatedRecordsHeader.IF_MODIFIED_SINCE, new Date('October 15, 2019 05:35:32'));

        //Call getRelatedRecords method that takes ParameterMap instance and HeaderMap instance as parameter
        let response = await relatedRecordsOperations.getRelatedRecords(recordId, paramInstance, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            //Check if expected ResponseWrapper instance is received
            if (responseObject instanceof ResponseWrapper) {
                //Get the array of obtained
                let records = responseObject.getData();

                records.forEach(record => {
                    //Get the ID of each Record
                    console.log("RelatedRecord ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("RelatedRecord Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("RelatedRecord Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("RelatedRecord Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("RelatedRecord CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("RelatedRecord Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("RelatedRecord ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("RelatedRecord Tag Name: " + tag.getName());

                            //Get the Id of each Tag
                            console.log("RelatedRecord Tag ID: " + tag.getId());
                        });
                    }

                    //To get particular field value
                    console.log("RelatedRecord Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName

                    console.log("RelatedRecord KeyValues: ");

                    let keyValues = record.getKeyValues();

                    let keyArray = Array.from(keyValues.keys());

                    keyArray.forEach(keyName => {
                        let value = keyValues.get(keyName);

                        if (value != null) {
                            if (Array.isArray(value)) {

                                if (value.length > 0) {
                                    if (value[0] instanceof FileDetails) {
                                        let fileDetails = value;

                                        fileDetails.forEach(fileDetail => {
                                            //Get the Extn of each FileDetails
                                            console.log("RelatedRecord FileDetails Extn: " + fileDetail.getExtn());

                                            //Get the IsPreviewAvailable of each FileDetails
                                            console.log("RelatedRecord FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                            //Get the DownloadUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                            //Get the DeleteUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                            //Get the EntityId of each FileDetails
                                            console.log("RelatedRecord FileDetails EntityId: " + fileDetail.getEntityId());

                                            //Get the Mode of each FileDetails
                                            console.log("RelatedRecord FileDetails Mode: " + fileDetail.getMode());

                                            //Get the OriginalSizeByte of each FileDetails
                                            console.log("RelatedRecord FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                            //Get the PreviewUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                            //Get the FileName of each FileDetails
                                            console.log("RelatedRecord FileDetails FileName: " + fileDetail.getFileName());

                                            //Get the FileId of each FileDetails
                                            console.log("RelatedRecord FileDetails FileId: " + fileDetail.getFileId());

                                            //Get the AttachmentId of each FileDetails
                                            console.log("RelatedRecord FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                            //Get the FileSize of each FileDetails
                                            console.log("RelatedRecord FileDetails FileSize: " + fileDetail.getFileSize());

                                            //Get the CreatorId of each FileDetails
                                            console.log("RelatedRecord FileDetails CreatorId: " + fileDetail.getCreatorId());

                                            //Get the LinkDocs of each FileDetails
                                            console.log("RelatedRecord FileDetails LinkDocs: " + fileDetail.getLinkDocs());
                                        });
                                    }
                                    else if (value[0] instanceof Tag) {
                                        let tags = value;

                                        tags.forEach(tag => {
                                            //Get the Name of each Tag
                                            console.log("RelatedRecord Tag Name: " + tag.getName());

                                            //Get the Id of each Tag
                                            console.log("RelatedRecord Tag ID: " + tag.getId());
                                        });
                                    }
                                    else if (value[0] instanceof PricingDetails) {
                                        let pricingDetails = value;

                                        pricingDetails.forEach(pricingDetail => {
                                            console.log("RelatedRecord PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                            console.log("RelatedRecord PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                            console.log("RelatedRecord PricingDetails ID: " + pricingDetail.getId());

                                            console.log("RelatedRecord PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Participants) {
                                        let participants = value;

                                        participants.forEach(participant => {
                                            console.log("Record Participants Name: " + participant.getName());

                                            console.log("Record Participants Invited: " + participant.getInvited().toString());

                                            console.log("Record Participants ID: " + participant.getId());

                                            console.log("Record Participants Type: " + participant.getType());

                                            console.log("Record Participants Participant: " + participant.getParticipant());

                                            console.log("Record Participants Status: " + participant.getStatus());
                                        });
                                    }
                                    else if (value[0] instanceof ZCRMRecord) {
                                        let recordArray = value;

                                        recordArray.forEach(record => {
                                            Array.from(record.getKeyValues().keys()).forEach(key => {
                                                console.log(key + ": " + record.getKeyValues().get(key));
                                            });
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Choice) {
                                        let choiceArray = value;

                                        console.log(keyName);

                                        console.log("Values");

                                        choiceArray.forEach(eachChoice => {
                                            console.log(eachChoice.getValue());
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Reminder) {
                                        let reminders = value;

                                        reminders.forEach(reminder => {
                                            console.log("Reminder Period: " + reminder.getPeriod());

                                            console.log("Reminder Unit: " + reminder.getUnit());
                                        });
                                    }
                                    else if (value[0] instanceof Comment) {
                                        let comments = value;

                                        comments.forEach(comment => {
                                            console.log("Record Comment CommentedBy: " + comment.getCommentedBy());

                                            console.log("Record Comment CommentedTime: " + comment.getCommentedTime().toString());

                                            console.log("Record Comment CommentContent: " + comment.getCommentContent());

                                            console.log("Record Comment Id: " + comment.getId());
                                        });
                                    }
                                    else {
                                        console.log(keyName + ": " + value);
                                    }
                                }

                            }
                            else if (value instanceof ZCRMLayout) {
                                console.log(keyName + " ID: " + value.getId());

                                console.log(keyName + " Name: " + value.getName());
                            }
                            else if (value instanceof ZCRMUser) {
                                console.log("RelatedRecord " + keyName + " User-ID: " + value.getId());

                                console.log("RelatedRecord " + keyName + " User-Name: " + value.getName());

                                console.log("RelatedRecord " + keyName + " User-Email: " + value.getEmail());

                            }
                            else if (value instanceof Choice) {
                                console.log(keyName + ": " + value.getValue());
                            }
                            else if (value instanceof RemindAt) {
                                console.log(keyName + ": " + value.getAlarm());
                            }
                            else if (value instanceof ZCRMRecord) {
                                console.log(keyName + " Record ID: " + value.getId());

                                console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                            }
                            else if (value instanceof RecurringActivity) {
                                console.log(keyName);

                                console.log("RRULE: " + value.getRrule());
                            }
                            else if (value instanceof Consent) {

                                console.log("Record Consent ID: " + value.getId());

                                //Get the Owner User instance of each attachment
                                let owner = value.getOwner();

                                //Check if owner is not null
                                if (owner != null) {
                                    //Get the name of the owner User
                                    console.log("Record Consent Owner Name: " + owner.getName());

                                    //Get the ID of the owner User
                                    console.log("Record Consent Owner ID: " + owner.getId());

                                    //Get the Email of the owner User
                                    console.log("Record Consent Owner Email: " + owner.getEmail());
                                }

                                let consentCreatedBy = value.getCreatedBy();

                                //Check if createdBy is not null
                                if (consentCreatedBy != null) {
                                    //Get the name of the CreatedBy User
                                    console.log("Record Consent CreatedBy Name: " + consentCreatedBy.getName());

                                    //Get the ID of the CreatedBy User
                                    console.log("Record Consent CreatedBy ID: " + consentCreatedBy.getId());

                                    //Get the Email of the CreatedBy User
                                    console.log("Record Consent CreatedBy Email: " + consentCreatedBy.getEmail());
                                }

                                let consentModifiedBy = value.getModifiedBy();

                                //Check if createdBy is not null
                                if (consentModifiedBy != null) {
                                    //Get the name of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Name: " + consentModifiedBy.getName());

                                    //Get the ID of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy ID: " + consentModifiedBy.getId());

                                    //Get the Email of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Email: " + consentModifiedBy.getEmail());
                                }

                                console.log("Record Consent CreatedTime: " + value.getCreatedTime());

                                console.log("Record Consent ModifiedTime: " + value.getModifiedTime());

                                console.log("Record Consent ContactThroughEmail: " + value.getContactThroughEmail());

                                console.log("Record Consent ContactThroughSocial: " + value.getContactThroughSocial());

                                console.log("Record Consent ContactThroughSurvey: " + value.getContactThroughSurvey());

                                console.log("Record Consent ContactThroughPhone: " + value.getContactThroughPhone());

                                console.log("Record Consent MailSentTime: " + value.getMailSentTime().toString());

                                console.log("Record Consent ConsentDate: " + value.getConsentDate().toString());

                                console.log("Record Consent ConsentRemarks: " + value.getConsentRemarks());

                                console.log("Record Consent ConsentThrough: " + value.getConsentThrough());

                                console.log("Record Consent DataProcessingBasis: " + value.getDataProcessingBasis());

                                //To get custom values
                                console.log("Record Consent Lawful Reason: " + value.getKeyValue("Lawful_Reason"));
                            }
                            else if (value instanceof Map) {
                                console.log(keyName);

                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + ": " + value.get(key));
                                });
                            }
                            else {
                                console.log(keyName + ": " + value);
                            }
                        }
                    });
                });

                //Get the obtained Info Object
                let info = responseObject.getInfo();

                if (info != null) {

                    if (info.getPerPage() != null) {
                        //Get the PerPage of the Info
                        console.log("RelatedRecord Info PerPage: " + info.getPerPage().toString());
                    }

                    if (info.getCount() != null) {
                        //Get the Count of the Info
                        console.log("RelatedRecord Info Count: " + info.getCount().toString());
                    }

                    if (info.getPage() != null) {
                        //Get the Page of the Info
                        console.log("RelatedRecord Info Page: " + info.getPage().toString());
                    }

                    if (info.getMoreRecords() != null) {
                        //Get the MoreRecords of the Info
                        console.log("RelatedRecord Info MoreRecords: " + info.getMoreRecords().toString());
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

    /**
     * <h3> Update Related Record </h3>
     * This method is used to update the relation between the records and print the response.
     * @param {String} moduleAPIName The API Name of the module to update related record.
     * @param {BigInt} recordId The ID of the record to be update Related List.
     * @param {String} relatedListAPIName The API name of the related list.
     */
    static async updateRelatedRecords(moduleAPIName, recordId, relatedListAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 007n;
        // let relatedModuleAPIName = "module_api_name";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record1 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record1.addKeyValue("id", 34770614994113n);

        record1.addKeyValue("list_price", 50.56);

        //Add Record instance to the array
        recordsArray.push(record1);

        let record2 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record2.addKeyValue("id", 34096432414001n);

        record2.addKeyValue("list_price", 100.56);

        //Add Record instance to the array
        recordsArray.push(record2);

        //Set the array to Records in BodyWrapper instance
        request.setData(recordsArray);

        //Call updateRelatedRecords method that takes recordId and BodyWrapper instance
        let response = await relatedRecordsOperations.updateRelatedRecords(recordId, request);

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
     * <h3> Delink Records </h3>
     * This method is used to delete the association between modules and print the response.
     * @param {String} moduleAPIName The API Name of the module to delink related records.
     * @param {BigInt} recordId The ID of the record
     * @param {String} relatedListAPIName The API name of the related list
     * @param {Array} relatedListIds The array of related record IDs.
     */
    static async deLinkRecords(moduleAPIName, recordId, relatedListAPIName, relatedListIds) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 0798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedIds = [002414001n, 32414002n, 02414020n];

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters of Delink Records operation */
        for (let relatedListId of relatedListIds) {
            await paramInstance.add(DelinkRecordsParam.IDS, relatedListId);
        }

        //Call delinkRecords method that takes recordId and ParameterMap instance as parameter.
        let response = await relatedRecordsOperations.delinkRecords(recordId, paramInstance);

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
     * <h3> Get Related Records Using External Id </h3>
     * This method is used to get the related list records and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related records.
     * @param {String} externalValue 
     * @param {String} relatedListAPIName The API name of the related list
     */
    static async getRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedListAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 798007n;
        // let relatedListAPIName = "module_api_name";
        let xExternal = "Leads.External";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName, moduleAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Related Records operation */
        await paramInstance.add(GetRelatedRecordsParam.PAGE, 1);

        await paramInstance.add(GetRelatedRecordsParam.PER_PAGE, 200);

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Related Records operation */
        await headerInstance.add(GetRelatedRecordsHeader.IF_MODIFIED_SINCE, new Date('October 15, 2019 05:35:32'));

        //Call getRelatedRecordsUsingExternalId method that takes externalValue, ParameterMap instance and HeaderMap instance as parameter
        let response = await relatedRecordsOperations.getRelatedRecordsUsingExternalId(externalValue, paramInstance, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            //Check if expected ResponseWrapper instance is received
            if (responseObject instanceof ResponseWrapper) {
                //Get the array of obtained
                let records = responseObject.getData();

                records.forEach(record => {
                    //Get the ID of each Record
                    console.log("RelatedRecord ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("RelatedRecord Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("RelatedRecord Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("RelatedRecord Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("RelatedRecord CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("RelatedRecord Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("RelatedRecord ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("RelatedRecord Tag Name: " + tag.getName());

                            //Get the Id of each Tag
                            console.log("RelatedRecord Tag ID: " + tag.getId());
                        });
                    }

                    //To get particular field value
                    console.log("RelatedRecord Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName

                    console.log("RelatedRecord KeyValues: ");

                    let keyValues = record.getKeyValues();

                    let keyArray = Array.from(keyValues.keys());

                    keyArray.forEach(keyName => {
                        let value = keyValues.get(keyName);

                        if (value != null) {
                            if (Array.isArray(value)) {

                                if (value.length > 0) {
                                    if (value[0] instanceof FileDetails) {
                                        let fileDetails = value;

                                        fileDetails.forEach(fileDetail => {
                                            //Get the Extn of each FileDetails
                                            console.log("RelatedRecord FileDetails Extn: " + fileDetail.getExtn());

                                            //Get the IsPreviewAvailable of each FileDetails
                                            console.log("RelatedRecord FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                            //Get the DownloadUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                            //Get the DeleteUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                            //Get the EntityId of each FileDetails
                                            console.log("RelatedRecord FileDetails EntityId: " + fileDetail.getEntityId());

                                            //Get the Mode of each FileDetails
                                            console.log("RelatedRecord FileDetails Mode: " + fileDetail.getMode());

                                            //Get the OriginalSizeByte of each FileDetails
                                            console.log("RelatedRecord FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                            //Get the PreviewUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                            //Get the FileName of each FileDetails
                                            console.log("RelatedRecord FileDetails FileName: " + fileDetail.getFileName());

                                            //Get the FileId of each FileDetails
                                            console.log("RelatedRecord FileDetails FileId: " + fileDetail.getFileId());

                                            //Get the AttachmentId of each FileDetails
                                            console.log("RelatedRecord FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                            //Get the FileSize of each FileDetails
                                            console.log("RelatedRecord FileDetails FileSize: " + fileDetail.getFileSize());

                                            //Get the CreatorId of each FileDetails
                                            console.log("RelatedRecord FileDetails CreatorId: " + fileDetail.getCreatorId());

                                            //Get the LinkDocs of each FileDetails
                                            console.log("RelatedRecord FileDetails LinkDocs: " + fileDetail.getLinkDocs());
                                        });
                                    }
                                    else if (value[0] instanceof Tag) {
                                        let tags = value;

                                        tags.forEach(tag => {
                                            //Get the Name of each Tag
                                            console.log("RelatedRecord Tag Name: " + tag.getName());

                                            //Get the Id of each Tag
                                            console.log("RelatedRecord Tag ID: " + tag.getId());
                                        });
                                    }
                                    else if (value[0] instanceof PricingDetails) {
                                        let pricingDetails = value;

                                        pricingDetails.forEach(pricingDetail => {
                                            console.log("RelatedRecord PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                            console.log("RelatedRecord PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                            console.log("RelatedRecord PricingDetails ID: " + pricingDetail.getId());

                                            console.log("RelatedRecord PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Participants) {
                                        let participants = value;

                                        participants.forEach(participant => {
                                            console.log("Record Participants Name: " + participant.getName());

                                            console.log("Record Participants Invited: " + participant.getInvited().toString());

                                            console.log("Record Participants ID: " + participant.getId());

                                            console.log("Record Participants Type: " + participant.getType());

                                            console.log("Record Participants Participant: " + participant.getParticipant());

                                            console.log("Record Participants Status: " + participant.getStatus());
                                        });
                                    }
                                    else if (value[0] instanceof ZCRMRecord) {
                                        let recordArray = value;

                                        recordArray.forEach(record => {
                                            Array.from(record.getKeyValues().keys()).forEach(key => {
                                                console.log(key + ": " + record.getKeyValues().get(key));
                                            });
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Choice) {
                                        let choiceArray = value;

                                        console.log(keyName);

                                        console.log("Values");

                                        choiceArray.forEach(eachChoice => {
                                            console.log(eachChoice.getValue());
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Reminder) {
                                        let reminders = value;

                                        reminders.forEach(reminder => {
                                            console.log("Reminder Period: " + reminder.getPeriod());

                                            console.log("Reminder Unit: " + reminder.getUnit());
                                        });
                                    }
                                    else if (value[0] instanceof Comment) {
                                        let comments = value;

                                        comments.forEach(comment => {
                                            console.log("Record Comment CommentedBy: " + comment.getCommentedBy());

                                            console.log("Record Comment CommentedTime: " + comment.getCommentedTime().toString());

                                            console.log("Record Comment CommentContent: " + comment.getCommentContent());

                                            console.log("Record Comment Id: " + comment.getId());
                                        });
                                    }
                                    else {
                                        console.log(keyName + ": " + value);
                                    }
                                }

                            }
                            else if (value instanceof ZCRMLayout) {
                                console.log(keyName + " ID: " + value.getId());

                                console.log(keyName + " Name: " + value.getName());
                            }
                            else if (value instanceof ZCRMUser) {
                                console.log("RelatedRecord " + keyName + " User-ID: " + value.getId());

                                console.log("RelatedRecord " + keyName + " User-Name: " + value.getName());

                                console.log("RelatedRecord " + keyName + " User-Email: " + value.getEmail());

                            }
                            else if (value instanceof Choice) {
                                console.log(keyName + ": " + value.getValue());
                            }
                            else if (value instanceof RemindAt) {
                                console.log(keyName + ": " + value.getAlarm());
                            }
                            else if (value instanceof ZCRMRecord) {
                                console.log(keyName + " Record ID: " + value.getId());

                                console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                            }
                            else if (value instanceof RecurringActivity) {
                                console.log(keyName);

                                console.log("RRULE: " + value.getRrule());
                            }
                            else if (value instanceof Consent) {

                                console.log("Record Consent ID: " + value.getId());

                                //Get the Owner User instance of each attachment
                                let owner = value.getOwner();

                                //Check if owner is not null
                                if (owner != null) {
                                    //Get the name of the owner User
                                    console.log("Record Consent Owner Name: " + owner.getName());

                                    //Get the ID of the owner User
                                    console.log("Record Consent Owner ID: " + owner.getId());

                                    //Get the Email of the owner User
                                    console.log("Record Consent Owner Email: " + owner.getEmail());
                                }

                                let consentCreatedBy = value.getCreatedBy();

                                //Check if createdBy is not null
                                if (consentCreatedBy != null) {
                                    //Get the name of the CreatedBy User
                                    console.log("Record Consent CreatedBy Name: " + consentCreatedBy.getName());

                                    //Get the ID of the CreatedBy User
                                    console.log("Record Consent CreatedBy ID: " + consentCreatedBy.getId());

                                    //Get the Email of the CreatedBy User
                                    console.log("Record Consent CreatedBy Email: " + consentCreatedBy.getEmail());
                                }

                                let consentModifiedBy = value.getModifiedBy();

                                //Check if createdBy is not null
                                if (consentModifiedBy != null) {
                                    //Get the name of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Name: " + consentModifiedBy.getName());

                                    //Get the ID of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy ID: " + consentModifiedBy.getId());

                                    //Get the Email of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Email: " + consentModifiedBy.getEmail());
                                }

                                console.log("Record Consent CreatedTime: " + value.getCreatedTime());

                                console.log("Record Consent ModifiedTime: " + value.getModifiedTime());

                                console.log("Record Consent ContactThroughEmail: " + value.getContactThroughEmail());

                                console.log("Record Consent ContactThroughSocial: " + value.getContactThroughSocial());

                                console.log("Record Consent ContactThroughSurvey: " + value.getContactThroughSurvey());

                                console.log("Record Consent ContactThroughPhone: " + value.getContactThroughPhone());

                                console.log("Record Consent MailSentTime: " + value.getMailSentTime().toString());

                                console.log("Record Consent ConsentDate: " + value.getConsentDate().toString());

                                console.log("Record Consent ConsentRemarks: " + value.getConsentRemarks());

                                console.log("Record Consent ConsentThrough: " + value.getConsentThrough());

                                console.log("Record Consent DataProcessingBasis: " + value.getDataProcessingBasis());

                                //To get custom values
                                console.log("Record Consent Lawful Reason: " + value.getKeyValue("Lawful_Reason"));
                            }
                            else if (value instanceof Map) {
                                console.log(keyName);

                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + ": " + value.get(key));
                                });
                            }
                            else {
                                console.log(keyName + ": " + value);
                            }
                        }
                    });
                });

                //Get the obtained Info Object
                let info = responseObject.getInfo();

                if (info != null) {

                    if (info.getPerPage() != null) {
                        //Get the PerPage of the Info
                        console.log("RelatedRecord Info PerPage: " + info.getPerPage().toString());
                    }

                    if (info.getCount() != null) {
                        //Get the Count of the Info
                        console.log("RelatedRecord Info Count: " + info.getCount().toString());
                    }

                    if (info.getPage() != null) {
                        //Get the Page of the Info
                        console.log("RelatedRecord Info Page: " + info.getPage().toString());
                    }

                    if (info.getMoreRecords() != null) {
                        //Get the MoreRecords of the Info
                        console.log("RelatedRecord Info MoreRecords: " + info.getMoreRecords().toString());
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

    /**
     * <h3> Update Related Records Using External Id</h3>
     * This method is used to update the relation between the records and print the response.
     * @param {String} moduleAPIName The API Name of the module to update related record.
     * @param {String} externalValue 
     * @param {String} relatedListAPIName The API name of the related list.
     */
    static async updateRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedListAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordId = 007n;
        // let relatedModuleAPIName = "module_api_name";
        let xExternal = "Leads.External,Products.Products_External";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName, moduleAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record1 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record1.addKeyValue("id", 34770615917011n);

        record1.addKeyValue("list_price", 50.56);

        // record1.addKeyValue("Products_External", "Products_External");

        //Add Record instance to the array
        recordsArray.push(record1);

        let record2 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record2.addKeyValue("id", 34096432414001n);

        record2.addKeyValue("list_price", 100.56);

        //Add Record instance to the array
        recordsArray.push(record2);

        //Set the array to Records in BodyWrapper instance
        request.setData(recordsArray);

        //Call updateRelatedRecordsUsingExternalId method that takes externalValue and BodyWrapper instance
        let response = await relatedRecordsOperations.updateRelatedRecordsUsingExternalId(externalValue, request);

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
     * <h3> Delete RelatedRecords Using External Id </h3>
     * This method is used to delete the association between modules and print the response.
     * @param {String} moduleAPIName The API Name of the module to delink related records.
     * @param {String} externalValue The ID of the record
     * @param {String} relatedListAPIName The API name of the related list
     * @param {Array} relatedListIds The array of related record IDs.
     */
    static async deleteRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedListAPIName, relatedListIds) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 0798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedIds = [002414001n, 32414002n, 02414020n];
        let xExternal = "Leads.External,Products.Products_External";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName, moduleAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters of Delink Records operation */
        for (let relatedListId of relatedListIds) {
            await paramInstance.add(DelinkRecordsParam.IDS, relatedListId);
        }

        //Call deleteRelatedRecordsUsingExternalId method that takes externalValue and ParameterMap instance as parameter.
        let response = await relatedRecordsOperations.deleteRelatedRecordsUsingExternalId(externalValue, paramInstance);

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
     * <h3> Get Related Record </h3>
     * This method is used to get the single related list record and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related record.
     * @param {BigInt} recordId The ID of the record to be get Related List.
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {BigInt} relatedListId The ID of the related record.
     * @param {String} destinationFolder The absolute path of the folder to store the obtained file
     */
    static async getRelatedRecord(moduleAPIName, recordId, relatedListAPIName, relatedListId, destinationFolder) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedListId = 414001n;
        //let destinationFolder = "/Users/user/Desktop"

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible parameters for Get Related Record operation */

        await headerInstance.add(GetRelatedRecordHeader.IF_MODIFIED_SINCE, new Date('June 15, 2020 05:35:32'));

        //Call getRelatedRecord method that takes relatedListId, recordId and headerInstance as parameter
        let response = await relatedRecordsOperations.getRelatedRecord(relatedListId, recordId, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            //Check if ResponseWrapper instance is received
            if (responseObject instanceof ResponseWrapper) {
                //Get the array of obtained Record instances
                let records = responseObject.getData();

                records.forEach(record => {
                    //Get the ID of each Record
                    console.log("RelatedRecord ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("RelatedRecord Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("RelatedRecord Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("RelatedRecord Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("RelatedRecord CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("RelatedRecord Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("RelatedRecord ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("RelatedRecord Tag Name: " + tag.getName());

                            //Get the Id of each Tag
                            console.log("RelatedRecord Tag ID: " + tag.getId());

                        });
                    }

                    //To get particular field value
                    console.log("RelatedRecord Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName

                    console.log("RelatedRecord KeyValues: ");

                    let keyValues = record.getKeyValues();

                    let keyArray = Array.from(keyValues.keys());

                    keyArray.forEach(keyName => {
                        let value = keyValues.get(keyName);

                        if (value != null) {
                            if (Array.isArray(value)) {

                                if (value.length > 0) {
                                    if (value[0] instanceof FileDetails) {
                                        let fileDetails = value;

                                        fileDetails.forEach(fileDetail => {
                                            //Get the Extn of each FileDetails
                                            console.log("RelatedRecord FileDetails Extn: " + fileDetail.getExtn());

                                            //Get the IsPreviewAvailable of each FileDetails
                                            console.log("RelatedRecord FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                            //Get the DownloadUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                            //Get the DeleteUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                            //Get the EntityId of each FileDetails
                                            console.log("RelatedRecord FileDetails EntityId: " + fileDetail.getEntityId());

                                            //Get the Mode of each FileDetails
                                            console.log("RelatedRecord FileDetails Mode: " + fileDetail.getMode());

                                            //Get the OriginalSizeByte of each FileDetails
                                            console.log("RelatedRecord FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                            //Get the PreviewUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                            //Get the FileName of each FileDetails
                                            console.log("RelatedRecord FileDetails FileName: " + fileDetail.getFileName());

                                            //Get the FileId of each FileDetails
                                            console.log("RelatedRecord FileDetails FileId: " + fileDetail.getFileId());

                                            //Get the AttachmentId of each FileDetails
                                            console.log("RelatedRecord FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                            //Get the FileSize of each FileDetails
                                            console.log("RelatedRecord FileDetails FileSize: " + fileDetail.getFileSize());

                                            //Get the CreatorId of each FileDetails
                                            console.log("RelatedRecord FileDetails CreatorId: " + fileDetail.getCreatorId());

                                            //Get the LinkDocs of each FileDetails
                                            console.log("RelatedRecord FileDetails LinkDocs: " + fileDetail.getLinkDocs());
                                        });
                                    }
                                    else if (value[0] instanceof Tag) {
                                        let tags = value;

                                        tags.forEach(tag => {
                                            //Get the Name of each Tag
                                            console.log("RelatedRecord Tag Name: " + tag.getName());

                                            //Get the Id of each Tag
                                            console.log("RelatedRecord Tag ID: " + tag.getId());
                                        });
                                    }
                                    else if (value[0] instanceof PricingDetails) {
                                        let pricingDetails = value;

                                        pricingDetails.forEach(pricingDetail => {
                                            console.log("RelatedRecord PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                            console.log("RelatedRecord PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                            console.log("RelatedRecord PricingDetails ID: " + pricingDetail.getId());

                                            console.log("RelatedRecord PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Participants) {
                                        let participants = value;

                                        participants.forEach(participant => {
                                            console.log("Record Participants Name: " + participant.getName());

                                            console.log("Record Participants Invited: " + participant.getInvited().toString());

                                            console.log("Record Participants ID: " + participant.getId());

                                            console.log("Record Participants Type: " + participant.getType());

                                            console.log("Record Participants Participant: " + participant.getParticipant());

                                            console.log("Record Participants Status: " + participant.getStatus());
                                        });
                                    }
                                    else if (value[0] instanceof ZCRMRecord) {
                                        let recordArray = value;

                                        recordArray.forEach(record => {
                                            Array.from(record.getKeyValues().keys()).forEach(key => {
                                                console.log(key + ": " + record.getKeyValues().get(key));
                                            });
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Choice) {
                                        let choiceArray = value;

                                        console.log(keyName);

                                        console.log("Values");

                                        choiceArray.forEach(eachChoice => {
                                            console.log(eachChoice.getValue());
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Reminder) {
                                        let reminders = value;

                                        reminders.forEach(reminder => {
                                            console.log("Reminder Period: " + reminder.getPeriod());

                                            console.log("Reminder Unit: " + reminder.getUnit());
                                        });
                                    }
                                    else if (value[0] instanceof Comment) {
                                        let comments = value;

                                        comments.forEach(comment => {
                                            console.log("Record Comment CommentedBy: " + comment.getCommentedBy());

                                            console.log("Record Comment CommentedTime: " + comment.getCommentedTime().toString());

                                            console.log("Record Comment CommentContent: " + comment.getCommentContent());

                                            console.log("Record Comment Id: " + comment.getId());
                                        });
                                    }
                                    else {
                                        console.log(keyName + ": " + value);
                                    }
                                }

                            }
                            else if (value instanceof ZCRMLayout) {
                                console.log(keyName + " ID: " + value.getId());

                                console.log(keyName + " Name: " + value.getName());
                            }
                            else if (value instanceof ZCRMUser) {
                                console.log("RelatedRecord " + keyName + " User-ID: " + value.getId());

                                console.log("RelatedRecord " + keyName + " User-Name: " + value.getName());

                                console.log("RelatedRecord " + keyName + " User-Email: " + value.getEmail());

                            }
                            else if (value instanceof Choice) {
                                console.log(keyName + ": " + value.getValue());
                            }
                            else if (value instanceof RemindAt) {
                                console.log(keyName + ": " + value.getAlarm());
                            }
                            else if (value instanceof ZCRMRecord) {
                                console.log(keyName + " Record ID: " + value.getId());

                                console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                            }
                            else if (value instanceof RecurringActivity) {
                                console.log(keyName);

                                console.log("RRULE: " + value.getRrule());
                            }
                            else if (value instanceof Consent) {

                                console.log("Record Consent ID: " + value.getId());

                                //Get the Owner User instance of each attachment
                                let owner = value.getOwner();

                                //Check if owner is not null
                                if (owner != null) {
                                    //Get the name of the owner User
                                    console.log("Record Consent Owner Name: " + owner.getName());

                                    //Get the ID of the owner User
                                    console.log("Record Consent Owner ID: " + owner.getId());

                                    //Get the Email of the owner User
                                    console.log("Record Consent Owner Email: " + owner.getEmail());
                                }

                                let consentCreatedBy = value.getCreatedBy();

                                //Check if createdBy is not null
                                if (consentCreatedBy != null) {
                                    //Get the name of the CreatedBy User
                                    console.log("Record Consent CreatedBy Name: " + consentCreatedBy.getName());

                                    //Get the ID of the CreatedBy User
                                    console.log("Record Consent CreatedBy ID: " + consentCreatedBy.getId());

                                    //Get the Email of the CreatedBy User
                                    console.log("Record Consent CreatedBy Email: " + consentCreatedBy.getEmail());
                                }

                                let consentModifiedBy = value.getModifiedBy();

                                //Check if createdBy is not null
                                if (consentModifiedBy != null) {
                                    //Get the name of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Name: " + consentModifiedBy.getName());

                                    //Get the ID of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy ID: " + consentModifiedBy.getId());

                                    //Get the Email of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Email: " + consentModifiedBy.getEmail());
                                }

                                console.log("Record Consent CreatedTime: " + value.getCreatedTime());

                                console.log("Record Consent ModifiedTime: " + value.getModifiedTime());

                                console.log("Record Consent ContactThroughEmail: " + value.getContactThroughEmail());

                                console.log("Record Consent ContactThroughSocial: " + value.getContactThroughSocial());

                                console.log("Record Consent ContactThroughSurvey: " + value.getContactThroughSurvey());

                                console.log("Record Consent ContactThroughPhone: " + value.getContactThroughPhone());

                                console.log("Record Consent MailSentTime: " + value.getMailSentTime().toString());

                                console.log("Record Consent ConsentDate: " + value.getConsentDate().toString());

                                console.log("Record Consent ConsentRemarks: " + value.getConsentRemarks());

                                console.log("Record Consent ConsentThrough: " + value.getConsentThrough());

                                console.log("Record Consent DataProcessingBasis: " + value.getDataProcessingBasis());

                                //To get custom values
                                console.log("Record Consent Lawful Reason: " + value.getKeyValue("Lawful_Reason"));
                            }
                            else if (value instanceof Map) {
                                console.log(keyName);

                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + ": " + value.get(key));
                                });
                            }
                            else {
                                console.log(keyName + ": " + value);
                            }
                        }
                    });
                });

            }
            //Check if FileBodyWrapper instance is received
            else if (responseObject instanceof FileBodyWrapper) {
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

    /**
     * <h3> Update Related Record </h3>
     * This method is used to update the relation between the records and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related record.
     * @param {BigInt} recordId The ID of the record to be get Related List.
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {BigInt} relatedListId The ID of the related record.
     */
    static async updateRelatedRecord(moduleAPIName, recordId, relatedListAPIName, relatedListId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 30798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedId = 314001n;

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record class
        let record1 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record1.addKeyValue("list_price", 50.56);

        //Add the record to array
        recordsArray.push(record1);

        //Set the array to data of BodyWrapper instance
        request.setData(recordsArray);

        //Call updateRelatedRecord method that takes relatedRecordId, recordId and BodyWrapper instance as parameter.
        let response = await relatedRecordsOperations.updateRelatedRecord(relatedListId, recordId, request);

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
     * <h3> Delink Record </h3>
     * This method is used to delete the association between modules and print the response.s
     * @param {String} moduleAPIName The API Name of the module to delink related record.
     * @param {BigInt} recordId The ID of the record
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {BigInt} relatedListId The ID of the related record.
     */
    static async deLinkRecord(moduleAPIName, recordId, relatedListAPIName, relatedListId) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 798007n;
        // let relatedModuleAPIName = "module_api_name";
        // let relatedListId = 70614994115;

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName and moduleAPIName as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, null);

        //Call delinkRecord method that takes relatedListId and recordId as parameter.
        let response = await relatedRecordsOperations.delinkRecord(relatedListId, recordId);

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
     * <h3> Get Related Record Using External Id </h3>
     * This method is used to get the single related list record and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related record.
     * @param {String} externalValue 
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {String} externalFieldValue 
     * @param {String} destinationFolder The absolute path of the folder to store the obtained file
     */
    static async getRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedListAPIName, externalFieldValue, destinationFolder) {
        //example
        // let moduleAPIName = "module_api_name";
        // let externalValue = "798007";
        // let relatedModuleAPIName = "module_api_name";
        // let externalFieldValue = "414001";
        //let destinationFolder = "/Users/user/Desktop"
        let xExternal = "Leads.External,Products.Products_External";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName, moduleAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible parameters for Get Related Record operation */

        await headerInstance.add(GetRelatedRecordHeader.IF_MODIFIED_SINCE, new Date('June 15, 2020 05:35:32'));

        //Call getRelatedRecord method that takes externalFieldValue, externalValue and headerInstance as parameter
        let response = await relatedRecordsOperations.getRelatedRecordUsingExternalId(externalFieldValue, externalValue, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            //Check if ResponseWrapper instance is received
            if (responseObject instanceof ResponseWrapper) {
                //Get the array of obtained Record instances
                let records = responseObject.getData();

                records.forEach(record => {
                    //Get the ID of each Record
                    console.log("RelatedRecord ID: " + record.getId());

                    //Get the createdBy User instance of each Record
                    let createdBy = record.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the ID of the createdBy User
                        console.log("RelatedRecord Created By User-ID: " + createdBy.getId());

                        //Get the name of the createdBy User
                        console.log("RelatedRecord Created By User-Name: " + createdBy.getName());

                        //Get the Email of the createdBy User
                        console.log("RelatedRecord Created By User-Email: " + createdBy.getEmail());
                    }

                    //Get the CreatedTime of each Record
                    console.log("RelatedRecord CreatedTime: " + record.getCreatedTime());

                    //Get the modifiedBy User instance of each Record
                    let modifiedBy = record.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the ID of the modifiedBy User
                        console.log("RelatedRecord Modified By User-ID: " + modifiedBy.getId());

                        //Get the name of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Name: " + modifiedBy.getName());

                        //Get the Email of the modifiedBy User
                        console.log("RelatedRecord Modified By User-Email: " + modifiedBy.getEmail());
                    }

                    //Get the ModifiedTime of each Record
                    console.log("RelatedRecord ModifiedTime: " + record.getModifiedTime());

                    //Get the list of Tag instance each Record
                    let tags = record.getTag();

                    //Check if tags is not null
                    if (tags != null) {
                        tags.forEach(tag => {
                            //Get the Name of each Tag
                            console.log("RelatedRecord Tag Name: " + tag.getName());

                            //Get the Id of each Tag
                            console.log("RelatedRecord Tag ID: " + tag.getId());

                        });
                    }

                    //To get particular field value
                    console.log("RelatedRecord Field Value: " + record.getKeyValue("Last_Name"));// FieldApiName

                    console.log("RelatedRecord KeyValues: ");

                    let keyValues = record.getKeyValues();

                    let keyArray = Array.from(keyValues.keys());

                    keyArray.forEach(keyName => {
                        let value = keyValues.get(keyName);

                        if (value != null) {
                            if (Array.isArray(value)) {

                                if (value.length > 0) {
                                    if (value[0] instanceof FileDetails) {
                                        let fileDetails = value;

                                        fileDetails.forEach(fileDetail => {
                                            //Get the Extn of each FileDetails
                                            console.log("RelatedRecord FileDetails Extn: " + fileDetail.getExtn());

                                            //Get the IsPreviewAvailable of each FileDetails
                                            console.log("RelatedRecord FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                            //Get the DownloadUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                            //Get the DeleteUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                            //Get the EntityId of each FileDetails
                                            console.log("RelatedRecord FileDetails EntityId: " + fileDetail.getEntityId());

                                            //Get the Mode of each FileDetails
                                            console.log("RelatedRecord FileDetails Mode: " + fileDetail.getMode());

                                            //Get the OriginalSizeByte of each FileDetails
                                            console.log("RelatedRecord FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                            //Get the PreviewUrl of each FileDetails
                                            console.log("RelatedRecord FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                            //Get the FileName of each FileDetails
                                            console.log("RelatedRecord FileDetails FileName: " + fileDetail.getFileName());

                                            //Get the FileId of each FileDetails
                                            console.log("RelatedRecord FileDetails FileId: " + fileDetail.getFileId());

                                            //Get the AttachmentId of each FileDetails
                                            console.log("RelatedRecord FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                            //Get the FileSize of each FileDetails
                                            console.log("RelatedRecord FileDetails FileSize: " + fileDetail.getFileSize());

                                            //Get the CreatorId of each FileDetails
                                            console.log("RelatedRecord FileDetails CreatorId: " + fileDetail.getCreatorId());

                                            //Get the LinkDocs of each FileDetails
                                            console.log("RelatedRecord FileDetails LinkDocs: " + fileDetail.getLinkDocs());
                                        });
                                    }
                                    else if (value[0] instanceof Tag) {
                                        let tags = value;

                                        tags.forEach(tag => {
                                            //Get the Name of each Tag
                                            console.log("RelatedRecord Tag Name: " + tag.getName());

                                            //Get the Id of each Tag
                                            console.log("RelatedRecord Tag ID: " + tag.getId());
                                        });
                                    }
                                    else if (value[0] instanceof PricingDetails) {
                                        let pricingDetails = value;

                                        pricingDetails.forEach(pricingDetail => {
                                            console.log("RelatedRecord PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                            console.log("RelatedRecord PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                            console.log("RelatedRecord PricingDetails ID: " + pricingDetail.getId());

                                            console.log("RelatedRecord PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Participants) {
                                        let participants = value;

                                        participants.forEach(participant => {
                                            console.log("Record Participants Name: " + participant.getName());

                                            console.log("Record Participants Invited: " + participant.getInvited().toString());

                                            console.log("Record Participants ID: " + participant.getId());

                                            console.log("Record Participants Type: " + participant.getType());

                                            console.log("Record Participants Participant: " + participant.getParticipant());

                                            console.log("Record Participants Status: " + participant.getStatus());
                                        });
                                    }
                                    else if (value[0] instanceof ZCRMRecord) {
                                        let recordArray = value;

                                        recordArray.forEach(record => {
                                            Array.from(record.getKeyValues().keys()).forEach(key => {
                                                console.log(key + ": " + record.getKeyValues().get(key));
                                            });
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Choice) {
                                        let choiceArray = value;

                                        console.log(keyName);

                                        console.log("Values");

                                        choiceArray.forEach(eachChoice => {
                                            console.log(eachChoice.getValue());
                                        });
                                    }
                                    else if (value[0] instanceof LineTax) {
                                        let lineTaxes = value;

                                        lineTaxes.forEach(lineTax => {
                                            console.log("RelatedRecord ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                            console.log("RelatedRecord ProductDetails LineTax Name: " + lineTax.getName());

                                            console.log("RelatedRecord ProductDetails LineTax Id: " + lineTax.getId());

                                            console.log("RelatedRecord ProductDetails LineTax Value: " + lineTax.getValue().toString());
                                        });
                                    }
                                    else if (value[0] instanceof Reminder) {
                                        let reminders = value;

                                        reminders.forEach(reminder => {
                                            console.log("Reminder Period: " + reminder.getPeriod());

                                            console.log("Reminder Unit: " + reminder.getUnit());
                                        });
                                    }
                                    else if (value[0] instanceof Comment) {
                                        let comments = value;

                                        comments.forEach(comment => {
                                            console.log("Record Comment CommentedBy: " + comment.getCommentedBy());

                                            console.log("Record Comment CommentedTime: " + comment.getCommentedTime().toString());

                                            console.log("Record Comment CommentContent: " + comment.getCommentContent());

                                            console.log("Record Comment Id: " + comment.getId());
                                        });
                                    }
                                    else {
                                        console.log(keyName + ": " + value);
                                    }
                                }

                            }
                            else if (value instanceof ZCRMLayout) {
                                console.log(keyName + " ID: " + value.getId());

                                console.log(keyName + " Name: " + value.getName());
                            }
                            else if (value instanceof ZCRMUser) {
                                console.log("RelatedRecord " + keyName + " User-ID: " + value.getId());

                                console.log("RelatedRecord " + keyName + " User-Name: " + value.getName());

                                console.log("RelatedRecord " + keyName + " User-Email: " + value.getEmail());

                            }
                            else if (value instanceof Choice) {
                                console.log(keyName + ": " + value.getValue());
                            }
                            else if (value instanceof RemindAt) {
                                console.log(keyName + ": " + value.getAlarm());
                            }
                            else if (value instanceof ZCRMRecord) {
                                console.log(keyName + " Record ID: " + value.getId());

                                console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                            }
                            else if (value instanceof RecurringActivity) {
                                console.log(keyName);

                                console.log("RRULE: " + value.getRrule());
                            }
                            else if (value instanceof Consent) {

                                console.log("Record Consent ID: " + value.getId());

                                //Get the Owner User instance of each attachment
                                let owner = value.getOwner();

                                //Check if owner is not null
                                if (owner != null) {
                                    //Get the name of the owner User
                                    console.log("Record Consent Owner Name: " + owner.getName());

                                    //Get the ID of the owner User
                                    console.log("Record Consent Owner ID: " + owner.getId());

                                    //Get the Email of the owner User
                                    console.log("Record Consent Owner Email: " + owner.getEmail());
                                }

                                let consentCreatedBy = value.getCreatedBy();

                                //Check if createdBy is not null
                                if (consentCreatedBy != null) {
                                    //Get the name of the CreatedBy User
                                    console.log("Record Consent CreatedBy Name: " + consentCreatedBy.getName());

                                    //Get the ID of the CreatedBy User
                                    console.log("Record Consent CreatedBy ID: " + consentCreatedBy.getId());

                                    //Get the Email of the CreatedBy User
                                    console.log("Record Consent CreatedBy Email: " + consentCreatedBy.getEmail());
                                }

                                let consentModifiedBy = value.getModifiedBy();

                                //Check if createdBy is not null
                                if (consentModifiedBy != null) {
                                    //Get the name of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Name: " + consentModifiedBy.getName());

                                    //Get the ID of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy ID: " + consentModifiedBy.getId());

                                    //Get the Email of the ModifiedBy User
                                    console.log("Record Consent ModifiedBy Email: " + consentModifiedBy.getEmail());
                                }

                                console.log("Record Consent CreatedTime: " + value.getCreatedTime());

                                console.log("Record Consent ModifiedTime: " + value.getModifiedTime());

                                console.log("Record Consent ContactThroughEmail: " + value.getContactThroughEmail());

                                console.log("Record Consent ContactThroughSocial: " + value.getContactThroughSocial());

                                console.log("Record Consent ContactThroughSurvey: " + value.getContactThroughSurvey());

                                console.log("Record Consent ContactThroughPhone: " + value.getContactThroughPhone());

                                console.log("Record Consent MailSentTime: " + value.getMailSentTime().toString());

                                console.log("Record Consent ConsentDate: " + value.getConsentDate().toString());

                                console.log("Record Consent ConsentRemarks: " + value.getConsentRemarks());

                                console.log("Record Consent ConsentThrough: " + value.getConsentThrough());

                                console.log("Record Consent DataProcessingBasis: " + value.getDataProcessingBasis());

                                //To get custom values
                                console.log("Record Consent Lawful Reason: " + value.getKeyValue("Lawful_Reason"));
                            }
                            else if (value instanceof Map) {
                                console.log(keyName);

                                Array.from(value.keys()).forEach(key => {
                                    console.log(key + ": " + value.get(key));
                                });
                            }
                            else {
                                console.log(keyName + ": " + value);
                            }
                        }
                    });
                });

            }
            //Check if FileBodyWrapper instance is received
            else if (responseObject instanceof FileBodyWrapper) {
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

    /**
     * <h3> Update Related Record Using External Id </h3>
     * This method is used to update the relation between the records and print the response.
     * @param {String} moduleAPIName The API Name of the module to get related record.
     * @param {String} externalValue
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {String} externalFieldValue
     */
    static async updateRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedListAPIName, externalFieldValue) {
        //example
        // let moduleAPIName = "module_api_name";
        // let externalValue = "30798007";
        // let relatedModuleAPIName = "module_api_name";
        // let externalFieldValue = "314001";
        let xExternal = "Leads.External,Products.Products_External";

        //Get instance of RelatedRecordsOperations Class that takes moduleAPIName, relatedListAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record class
        let record1 = new ZCRMRecord();

        /*
         * Call addKeyValue method that takes two arguments
         * 1 -> A string that is the Field's API Name
         * 2 -> Value
         */
        record1.addKeyValue("list_price", 50.56);

        //Add the record to array
        recordsArray.push(record1);

        //Set the array to data of BodyWrapper instance
        request.setData(recordsArray);

        //Call updateRelatedRecord method that takes relatedRecordId, recordId and BodyWrapper instance as parameter.
        let response = await relatedRecordsOperations.updateRelatedRecordUsingExternalId(externalFieldValue, externalValue, request);

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
     * <h3> Delete Related Record Using External Id </h3>
     * This method is used to delete the association between modules and print the response.s
     * @param {String} moduleAPIName The API Name of the module to delink related record.
     * @param {String} externalValue
     * @param {String} relatedListAPIName  The API name of the related list.
     * @param {String} externalFieldValue
     */
    static async deleteRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedListAPIName, externalFieldValue) {
        //example
        // let moduleAPIName = "module_api_name";
        // let externalValue = "798007";
        // let relatedModuleAPIName = "module_api_name";
        // let externalFieldValue = "70614994115";
        let xExternal = "Leads.External,Products.Products_External";

        //Get instance of RelatedRecordsOperations Class that takes relatedListAPIName, moduleAPIName and xExternal as parameter
        let relatedRecordsOperations = new RelatedRecordsOperations(relatedListAPIName, moduleAPIName, xExternal);

        //Call deleteRelatedRecordUsingExternalId method that takes externalFieldValue and externalValue as parameter.
        let response = await relatedRecordsOperations.deleteRelatedRecordUsingExternalId(externalFieldValue, externalValue);

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
}

module.exports = { RelatedRecord }