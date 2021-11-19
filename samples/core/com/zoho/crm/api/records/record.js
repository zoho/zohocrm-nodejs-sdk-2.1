const fs = require("fs");
const path = require("path");
const { RecordOperations, DeleteRecordParam, DeleteRecordsParam, GetDeletedRecordsHeader, GetDeletedRecordsParam, GetMassUpdateStatusParam, GetRecordHeader, GetRecordParam, GetRecordsHeader, GetRecordsParam, SearchRecordsParam, UpdateRecordHeader, DeleteRecordHeader, CreateRecordsHeader, UpdateRecordsHeader, DeleteRecordsHeader, UpsertRecordsHeader, SearchRecordsHeader, RecordCountParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/record_operations");
const Participants = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/participants").Participants;
const Territory = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/territory").Territory;
const StreamWrapper = require("@zohocrm/nodejs-sdk-2.1/utils/util/stream_wrapper").StreamWrapper;
const FileBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/file_body_wrapper").FileBodyWrapper;
const ZCRMUser = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/users/user").User;
const FileDetails = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/file_details").FileDetails;
const RemindAt = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/remind_at").RemindAt;
const Participant = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/participants").Participants;
const RecurringActivity = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/recurring_activity").RecurringActivity;
const ZCRMRecord = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/record").MasterModel;
const ZCRMLayout = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/layouts/layout").Layout;
const PricingDetails = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/pricing_details").PricingDetails;
const LineItemProduct = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/line_item_product").LineItemProduct;
const Tag = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/tags/tag").Tag;
const LineTax = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/line_tax").LineTax;
const InventoryLineItems = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/inventory_line_items").InventoryLineItems;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/response_wrapper").ResponseWrapper;
const DeletedRecordsWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/deleted_records_wrapper").DeletedRecordsWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/body_wrapper").BodyWrapper;
const MassUpdateBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/mass_update_body_wrapper").MassUpdateBodyWrapper;
const MassUpdateActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/mass_update_action_wrapper").MassUpdateActionWrapper;
const MassUpdateResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/mass_update_response_wrapper").MassUpdateResponseWrapper;
const MassUpdateSuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/mass_update_success_response").MassUpdateSuccessResponse;
const MassUpdate = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/mass_update").MassUpdate;
const ConvertBodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/convert_body_wrapper").ConvertBodyWrapper;
const LeadConverter = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/lead_converter").LeadConverter;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/action_wrapper").ActionWrapper;
const ConvertActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/convert_action_wrapper").ConvertActionWrapper;
const RecordField = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field").Field;
const Consent = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/consent").Consent;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/success_response").SuccessResponse;
const SuccessfulConvert = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/successful_convert").SuccessfulConvert;
const Comment = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/comment").Comment;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const HeaderMap = require("@zohocrm/nodejs-sdk-2.1/routes/header_map").HeaderMap;
const Choice = require("@zohocrm/nodejs-sdk-2.1/utils/util/choice").Choice;
const Reminder = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/reminder").Reminder;
const Attachment = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/attachments/attachment").Attachment;
const ImageUpload = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/image_upload").ImageUpload;
const Tax = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/tax").Tax;
const CarryOverTags = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/carry_over_tags").CarryOverTags;
const CountWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/count_wrapper").CountWrapper;

class Record {
    /**
     * <h3> Get Record</h3>
     * This method is used to get a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {BigInt} recordId The ID of the record to be obtained.
     * @param {String} destinationFolder The absolute path of the destination folder to store the attachment
     */
    static async getRecord(moduleAPIName, recordId, destinationFolder) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 03276n;

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Record operation*/
        await paramInstance.add(GetRecordParam.APPROVED, "true");

        await paramInstance.add(GetRecordParam.CONVERTED, "false");

        await paramInstance.add(GetRecordParam.CVID, "34096430087501");

        let fieldsArray = ["id", "Company"];

        await paramInstance.add(GetRecordParam.FIELDS, fieldsArray.toString());

        /* Month is zero-indexed.
        0 . January ..... 11 . December
        */
        let startDateTime = new Date(2020, 7, 10, 10, 10, 10);

        await paramInstance.add(GetRecordParam.STARTDATETIME, startDateTime);

        let endDateTime = new Date(2020, 7, 10, 12, 12, 12);

        await paramInstance.add(GetRecordParam.ENDDATETIME, endDateTime);

        await paramInstance.add(GetRecordParam.TERRITORY_ID, "34096430505351");

        await paramInstance.add(GetRecordParam.INCLUDE_CHILD, "true");

        await paramInstance.add(GetRecordParam.UID, "34096430500741");

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Record operation*/
        await headerInstance.add(GetRecordHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T01:01:01+05:30"));

        // headerInstance.add(GetRecordHeader.X_EXTERNAL, "Leads.External");

        //Call getRecord method that takes recordId, moduleAPIName, paramInstance and headerInstance as parameter
        let response = await recordOperations.getRecord(recordId, moduleAPIName, paramInstance, headerInstance);

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
                //Check if ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Record instances
                    let records = responseObject.getData();

                    records.forEach(record => {
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

                        keyArray.forEach(keyName => {
                            let value = keyValues.get(keyName);

                            if (value != null) {
                                if (Array.isArray(value)) {
                                    if (value.length > 0) {
                                        if (value[0] instanceof FileDetails) {
                                            let fileDetails = value;

                                            fileDetails.forEach(fileDetail => {
                                                //Get the Extn of each FileDetails
                                                console.log("Record FileDetails Extn: " + fileDetail.getExtn());

                                                //Get the IsPreviewAvailable of each FileDetails
                                                console.log("Record FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                                //Get the DownloadUrl of each FileDetails
                                                console.log("Record FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                                //Get the DeleteUrl of each FileDetails
                                                console.log("Record FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                                //Get the EntityId of each FileDetails
                                                console.log("Record FileDetails EntityId: " + fileDetail.getEntityId());

                                                //Get the Mode of each FileDetails
                                                console.log("Record FileDetails Mode: " + fileDetail.getMode());

                                                //Get the OriginalSizeByte of each FileDetails
                                                console.log("Record FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                                //Get the PreviewUrl of each FileDetails
                                                console.log("Record FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                                //Get the FileName of each FileDetails
                                                console.log("Record FileDetails FileName: " + fileDetail.getFileName());

                                                //Get the FileId of each FileDetails
                                                console.log("Record FileDetails FileId: " + fileDetail.getFileId());

                                                //Get the AttachmentId of each FileDetails
                                                console.log("Record FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                                //Get the FileSize of each FileDetails
                                                console.log("Record FileDetails FileSize: " + fileDetail.getFileSize());

                                                //Get the CreatorId of each FileDetails
                                                console.log("Record FileDetails CreatorId: " + fileDetail.getCreatorId());

                                                //Get the LinkDocs of each FileDetails
                                                console.log("Record FileDetails LinkDocs: " + fileDetail.getLinkDocs());
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
                                        else if (value[0] instanceof Tag) {
                                            let tags1 = value;

                                            tags1.forEach(tag => {
                                                //Get the Name of each Tag
                                                console.log("Record Tag Name: " + tag.getName());

                                                //Get the Id of each Tag
                                                console.log("Record Tag ID: " + tag.getId());
                                            });
                                        }
                                        else if (value[0] instanceof PricingDetails) {
                                            let pricingDetails = value;

                                            pricingDetails.forEach(pricingDetail => {
                                                console.log("Record PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                                console.log("Record PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                                console.log("Record PricingDetails ID: " + pricingDetail.getId());

                                                console.log("Record PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
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

                                            recordArray.forEach(record1 => {
                                                Array.from(record1.getKeyValues().keys()).forEach(key => {
                                                    console.log(key + ": " + JSON.stringify(record1.getKeyValues().get(key), (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a));
                                                });
                                            });
                                        }
                                        else if (value[0] instanceof LineTax) {
                                            let lineTaxes = value;

                                            lineTaxes.forEach(lineTax => {
                                                console.log("Record ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                                console.log("Record ProductDetails LineTax Name: " + lineTax.getName());

                                                console.log("Record ProductDetails LineTax Id: " + lineTax.getId());

                                                console.log("Record ProductDetails LineTax Value: " + lineTax.getValue().toString());
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
                                        else if (value[0] instanceof Attachment) {
                                            let attachments = value;

                                            attachments.forEach(attachment => {
                                                //Get the ID of each attachment
                                                console.log("Record Attachment ID: " + attachment.getId());

                                                //Get the owner User instance of each attachment
                                                let owner = attachment.getOwner();

                                                //Check if owner is not null
                                                if (owner != null) {
                                                    //Get the Name of the Owner
                                                    console.log("Record Attachment Owner - Name: " + owner.getName());

                                                    //Get the ID of the Owner
                                                    console.log("Record Attachment Owner ID: " + owner.getId());

                                                    //Get the Email of the Owner
                                                    console.log("Record Attachment Owner Email: " + owner.getEmail());
                                                }

                                                //Get the modified time of each attachment
                                                console.log("Record Attachment Modified Time: " + attachment.getModifiedTime().toString());

                                                //Get the name of the File
                                                console.log("Record Attachment File Name: " + attachment.getFileName());

                                                //Get the created time of each attachment
                                                console.log("Record Attachment Created Time: " + attachment.getCreatedTime());

                                                //Get the Attachment file size
                                                console.log("Record Attachment File Size: " + attachment.getSize());

                                                //Get the parentId Record instance of each attachment
                                                let parentId = attachment.getParentId();

                                                //Check if parentId is not null
                                                if (parentId != null) {
                                                    //Get the parent record Name of each attachment
                                                    console.log("Record Attachment parent record Name: " + parentId.getKeyValue("name"));

                                                    //Get the parent record ID of each attachment
                                                    console.log("Record Attachment parent record ID: " + parentId.getId());
                                                }

                                                //Check if the attachment is Editable
                                                console.log("Record Attachment is Editable: " + attachment.getEditable().toString());

                                                //Get the file ID of each attachment
                                                console.log("Record Attachment File ID: " + attachment.getFileId());

                                                //Get the type of each attachment
                                                console.log("Record Attachment File Type: " + attachment.getType());

                                                //Get the seModule of each attachment
                                                console.log("Record Attachment seModule: " + attachment.getSeModule());

                                                //Get the modifiedBy User instance of each attachment
                                                let modifiedBy1 = attachment.getModifiedBy();

                                                //Check if modifiedBy is not null
                                                if (modifiedBy1 != null) {
                                                    //Get the Name of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Name: " + modifiedBy1.getName());

                                                    //Get the ID of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-ID: " + modifiedBy1.getId());

                                                    //Get the Email of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Email: " + modifiedBy1.getEmail());
                                                }

                                                //Get the state of each attachment
                                                console.log("Record Attachment State: " + attachment.getState());

                                                //Get the createdBy User instance of each attachment
                                                let createdBy1 = attachment.getCreatedBy();

                                                //Check if createdBy is not null
                                                if (createdBy1 != null) {
                                                    //Get the name of the createdBy User
                                                    console.log("Record Attachment Created By User-Name: " + createdBy1.getName());

                                                    //Get the ID of the createdBy User
                                                    console.log("Record Attachment Created By User-ID: " + createdBy1.getId());

                                                    //Get the Email of the createdBy User
                                                    console.log("Record Attachment Created By User-Email: " + createdBy1.getEmail());
                                                }

                                                //Get the linkUrl of each attachment
                                                console.log("Record Attachment LinkUrl: " + attachment.getLinkUrl());
                                            });
                                        }
                                        else if (value[0] instanceof ImageUpload) {
                                            let imageUploads = value;

                                            imageUploads.forEach(imageUpload => {
                                                console.log("Record " + keyName + " Description: " + imageUpload.getDescription());

                                                console.log("Record " + keyName + " PreviewId: " + imageUpload.getPreviewId());

                                                console.log("Record " + keyName + " File_Name: " + imageUpload.getFileName());

                                                console.log("Record " + keyName + " State: " + imageUpload.getState());

                                                console.log("Record " + keyName + " Size: " + imageUpload.getSize());

                                                console.log("Record " + keyName + " SequenceNumber: " + imageUpload.getSequenceNumber());

                                                console.log("Record " + keyName + " Id: " + imageUpload.getId());

                                                console.log("Record " + keyName + " FileId: " + imageUpload.getFileId());
                                            });
                                        }
                                        else if (value[0] instanceof Reminder) {
                                            let reminders = value;

                                            reminders.forEach(reminder => {
                                                console.log("Reminder Period: " + reminder.getPeriod());

                                                console.log("Reminder Unit: " + reminder.getUnit());
                                            });
                                        }
                                        else {
                                            console.log(keyName + ": " + value);
                                        }
                                    }
                                }
                                else if (value instanceof ZCRMUser) {
                                    console.log("Record " + keyName + " User-ID: " + value.getId());

                                    console.log("Record " + keyName + " User-Name: " + value.getName());

                                    console.log("Record " + keyName + " User-Email: " + value.getEmail());

                                }
                                else if (value instanceof ZCRMLayout) {
                                    console.log(keyName + " ID: " + value.getId());

                                    console.log(keyName + " Name: " + value.getName());
                                }
                                else if (value instanceof ZCRMRecord) {
                                    console.log(keyName + " Record ID: " + value.getId());

                                    console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                                }
                                else if (value instanceof Choice) {
                                    console.log(keyName + ": " + value.getValue());
                                }
                                else if (value instanceof RemindAt) {
                                    console.log(keyName + ": " + value.getAlarm());
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
    }

    /**
     * <h3> Update Record</h3>
     * This method is used to update a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {BigInt} recordId The ID of the record to be updated
     */
    static async updateRecord(moduleAPIName, recordId) {
        //API Name of the module to update record
        //let moduleAPIName = "module_api_name";
        //let recordId = 177002n;

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record = new ZCRMRecord();

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record.addFieldValue(RecordField.Leads.CITY, "City");

        record.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("Custom_field", "Value");

        record.addKeyValue("Custom_field_2", "value");

        record.addKeyValue("Date_1", new Date(2017, 1, 13));

        let fileDetails = [];

        let fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32537b7c2400dadca8ff55f620c65357da");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32e0063e7321b5b4ca878a934519e6cdb2");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c323daf4780bfe0058133556f155795981f");

        fileDetails.push(fileDetail);

        record.addKeyValue("File_Upload", fileDetails);

        let recordOwner = new ZCRMUser();

        recordOwner.setEmail("abc@zoho.com");

        record.addKeyValue("Owner", recordOwner);

        //Used when GDPR is enabled
        let dataConsent = new Consent();

        dataConsent.setConsentRemarks("Approved.");

        dataConsent.setConsentThrough("Email");

        dataConsent.setContactThroughEmail(true);

        dataConsent.setContactThroughSocial(false);

        record.addKeyValue("Data_Processing_Basis_Details", dataConsent);

        /** Following methods are being used only by Inventory modules */

        let dealName = new ZCRMRecord();

        dealName.addFieldValue(RecordField.Deals.ID, 347706112416012n);

        record.addFieldValue(RecordField.Sales_Orders.DEAL_NAME, dealName);

        let contactName = new ZCRMRecord();

        contactName.addFieldValue(RecordField.Contacts.ID, 347706112263005n);

        contactName.addFieldValue(RecordField.Sales_Orders.CONTACT_NAME, contactName);

        let accountName = new ZCRMRecord();

        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);

        accountName.addKeyValue("name", "automatedAccount");

        record.addFieldValue(RecordField.Sales_Orders.ACCOUNT_NAME, accountName);

        record.addKeyValue("Discount", 10.5);

        let inventoryLineItemArray = [];

        let inventoryLineItem = new ZCRMRecord();

        let lineItemProduct = new LineItemProduct();

        lineItemProduct.setId(347706112402032n);

        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");

        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);

        inventoryLineItem.addKeyValue("Quantity", 3);

        inventoryLineItem.addKeyValue("Description", "productDescription");

        inventoryLineItem.addKeyValue("ListPrice", 10.0);

        inventoryLineItem.addKeyValue("Discount", "5.%");

        let productLineTaxes = [];

        let productLineTax = new LineTax();

        productLineTax.setName("MyTax1134");

        productLineTax.setPercentage(20.0);

        productLineTaxes.push(productLineTax);

        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);

        inventoryLineItemArray.push(inventoryLineItem);

        record.addKeyValue("Quoted_Items", inventoryLineItemArray);

        let lineTaxes = [];

        let lineTax = new LineTax();

        lineTax.setName("MyTax1134");

        lineTax.setPercentage(20.0);

        lineTaxes.push(lineTax);

        record.addKeyValue("$line_tax", lineTaxes);

        /** End Inventory **/

        //Add Record instance to the array
        recordsArray.push(record);

        //Set the array to Records in BodyWrapper instance
        request.setData(recordsArray);

        let trigger = [];

        trigger.push("approval");

        trigger.push("workflow");

        trigger.push("blueprint");

        request.setTrigger(trigger);

        let headerInstance = new HeaderMap();

        // headerInstance.add(UpdateRecordHeader.X_EXTERNAL, "Leads.External");
        // headerInstance.add(UpdateRecordHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");

        //Call updateRecord method that takes recordId, ModuleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response = await recordOperations.updateRecord(recordId, moduleAPIName, request, headerInstance);

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
     * <h3> Delete Record</h3>
     * This method is used to delete a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {BigInt} recordId The ID of the record to be deleted
     */
    static async deleteRecord(moduleAPIName, recordId) {
        //API Name of the module to delete record
        //let moduleAPIName = "module_api_name";
        //let recordId = 77002n;

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        //Possible parameters for Delete Record operation
        await paramInstance.add(DeleteRecordParam.WF_TRIGGER, true);

        let headerInstance = new HeaderMap();

        // headerInstance.add(DeleteRecordHeader.X_EXTERNAL, "Leads.External");

        //Call deleteRecord method that takes recordId, ModuleAPIName, paramInstance and headerInstance as parameter.
        let response = await recordOperations.deleteRecord(recordId, moduleAPIName, paramInstance, headerInstance);

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
     * <h3> Get Record Using External Id </h3>
     * This method is used to get a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {String} externalFieldValue 
     * @param {String} destinationFolder The absolute path of the destination folder to store the attachment
     */
    static async getRecordUsingExternalId(moduleAPIName, externalFieldValue, destinationFolder) {
        //example
        //let moduleAPIName = "module_api_name";
        //let externalFieldValue = "34770616603276";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Record operation*/
        await paramInstance.add(GetRecordParam.APPROVED, "true");

        await paramInstance.add(GetRecordParam.CONVERTED, "false");

        await paramInstance.add(GetRecordParam.CVID, "34096430087501");

        let fieldsArray = ["id", "Company"];

        await paramInstance.add(GetRecordParam.FIELDS, fieldsArray.toString());

        /* Month is zero-indexed.
        0 . January ..... 11 . December
        */
        let startDateTime = new Date(2020, 7, 10, 10, 10, 10);

        await paramInstance.add(GetRecordParam.STARTDATETIME, startDateTime);

        let endDateTime = new Date(2020, 7, 10, 12, 12, 12);

        await paramInstance.add(GetRecordParam.ENDDATETIME, endDateTime);

        await paramInstance.add(GetRecordParam.TERRITORY_ID, "34096430505351");

        await paramInstance.add(GetRecordParam.INCLUDE_CHILD, "true");

        await paramInstance.add(GetRecordParam.UID, "34096430500741");

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Record operation*/
        await headerInstance.add(GetRecordHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T01:01:01+05:30"));

        headerInstance.add(GetRecordHeader.X_EXTERNAL, "Leads.External");

        //Call getRecordUsingExternalId method that takes externalFieldValue, moduleAPIName, paramInstance and headerInstance as parameter
        let response = await recordOperations.getRecordUsingExternalId(externalFieldValue, moduleAPIName, paramInstance, headerInstance);

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
                //Check if ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Record instances
                    let records = responseObject.getData();

                    records.forEach(record => {
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

                        keyArray.forEach(keyName => {
                            let value = keyValues.get(keyName);

                            if (value != null) {
                                if (Array.isArray(value)) {
                                    if (value.length > 0) {
                                        if (value[0] instanceof FileDetails) {
                                            let fileDetails = value;

                                            fileDetails.forEach(fileDetail => {
                                                //Get the Extn of each FileDetails
                                                console.log("Record FileDetails Extn: " + fileDetail.getExtn());

                                                //Get the IsPreviewAvailable of each FileDetails
                                                console.log("Record FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                                //Get the DownloadUrl of each FileDetails
                                                console.log("Record FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                                //Get the DeleteUrl of each FileDetails
                                                console.log("Record FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                                //Get the EntityId of each FileDetails
                                                console.log("Record FileDetails EntityId: " + fileDetail.getEntityId());

                                                //Get the Mode of each FileDetails
                                                console.log("Record FileDetails Mode: " + fileDetail.getMode());

                                                //Get the OriginalSizeByte of each FileDetails
                                                console.log("Record FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                                //Get the PreviewUrl of each FileDetails
                                                console.log("Record FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                                //Get the FileName of each FileDetails
                                                console.log("Record FileDetails FileName: " + fileDetail.getFileName());

                                                //Get the FileId of each FileDetails
                                                console.log("Record FileDetails FileId: " + fileDetail.getFileId());

                                                //Get the AttachmentId of each FileDetails
                                                console.log("Record FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                                //Get the FileSize of each FileDetails
                                                console.log("Record FileDetails FileSize: " + fileDetail.getFileSize());

                                                //Get the CreatorId of each FileDetails
                                                console.log("Record FileDetails CreatorId: " + fileDetail.getCreatorId());

                                                //Get the LinkDocs of each FileDetails
                                                console.log("Record FileDetails LinkDocs: " + fileDetail.getLinkDocs());
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
                                        else if (value[0] instanceof Tag) {
                                            let tags1 = value;

                                            tags1.forEach(tag => {
                                                //Get the Name of each Tag
                                                console.log("Record Tag Name: " + tag.getName());

                                                //Get the Id of each Tag
                                                console.log("Record Tag ID: " + tag.getId());
                                            });
                                        }
                                        else if (value[0] instanceof PricingDetails) {
                                            let pricingDetails = value;

                                            pricingDetails.forEach(pricingDetail => {
                                                console.log("Record PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                                console.log("Record PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                                console.log("Record PricingDetails ID: " + pricingDetail.getId());

                                                console.log("Record PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
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

                                            recordArray.forEach(record1 => {
                                                Array.from(record1.getKeyValues().keys()).forEach(key => {
                                                    console.log(key + ": " + JSON.stringify(record1.getKeyValues().get(key), (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a));
                                                });
                                            });
                                        }
                                        else if (value[0] instanceof LineTax) {
                                            let lineTaxes = value;

                                            lineTaxes.forEach(lineTax => {
                                                console.log("Record ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                                console.log("Record ProductDetails LineTax Name: " + lineTax.getName());

                                                console.log("Record ProductDetails LineTax Id: " + lineTax.getId());

                                                console.log("Record ProductDetails LineTax Value: " + lineTax.getValue().toString());
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
                                        else if (value[0] instanceof Attachment) {
                                            let attachments = value;

                                            attachments.forEach(attachment => {
                                                //Get the ID of each attachment
                                                console.log("Record Attachment ID: " + attachment.getId());

                                                //Get the owner User instance of each attachment
                                                let owner = attachment.getOwner();

                                                //Check if owner is not null
                                                if (owner != null) {
                                                    //Get the Name of the Owner
                                                    console.log("Record Attachment Owner - Name: " + owner.getName());

                                                    //Get the ID of the Owner
                                                    console.log("Record Attachment Owner ID: " + owner.getId());

                                                    //Get the Email of the Owner
                                                    console.log("Record Attachment Owner Email: " + owner.getEmail());
                                                }

                                                //Get the modified time of each attachment
                                                console.log("Record Attachment Modified Time: " + attachment.getModifiedTime().toString());

                                                //Get the name of the File
                                                console.log("Record Attachment File Name: " + attachment.getFileName());

                                                //Get the created time of each attachment
                                                console.log("Record Attachment Created Time: " + attachment.getCreatedTime());

                                                //Get the Attachment file size
                                                console.log("Record Attachment File Size: " + attachment.getSize());

                                                //Get the parentId Record instance of each attachment
                                                let parentId = attachment.getParentId();

                                                //Check if parentId is not null
                                                if (parentId != null) {
                                                    //Get the parent record Name of each attachment
                                                    console.log("Record Attachment parent record Name: " + parentId.getKeyValue("name"));

                                                    //Get the parent record ID of each attachment
                                                    console.log("Record Attachment parent record ID: " + parentId.getId());
                                                }

                                                //Check if the attachment is Editable
                                                console.log("Record Attachment is Editable: " + attachment.getEditable().toString());

                                                //Get the file ID of each attachment
                                                console.log("Record Attachment File ID: " + attachment.getFileId());

                                                //Get the type of each attachment
                                                console.log("Record Attachment File Type: " + attachment.getType());

                                                //Get the seModule of each attachment
                                                console.log("Record Attachment seModule: " + attachment.getSeModule());

                                                //Get the modifiedBy User instance of each attachment
                                                let modifiedBy1 = attachment.getModifiedBy();

                                                //Check if modifiedBy is not null
                                                if (modifiedBy1 != null) {
                                                    //Get the Name of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Name: " + modifiedBy1.getName());

                                                    //Get the ID of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-ID: " + modifiedBy1.getId());

                                                    //Get the Email of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Email: " + modifiedBy1.getEmail());
                                                }

                                                //Get the state of each attachment
                                                console.log("Record Attachment State: " + attachment.getState());

                                                //Get the createdBy User instance of each attachment
                                                let createdBy1 = attachment.getCreatedBy();

                                                //Check if createdBy is not null
                                                if (createdBy1 != null) {
                                                    //Get the name of the createdBy User
                                                    console.log("Record Attachment Created By User-Name: " + createdBy1.getName());

                                                    //Get the ID of the createdBy User
                                                    console.log("Record Attachment Created By User-ID: " + createdBy1.getId());

                                                    //Get the Email of the createdBy User
                                                    console.log("Record Attachment Created By User-Email: " + createdBy1.getEmail());
                                                }

                                                //Get the linkUrl of each attachment
                                                console.log("Record Attachment LinkUrl: " + attachment.getLinkUrl());
                                            });
                                        }
                                        else if (value[0] instanceof ImageUpload) {
                                            let imageUploads = value;

                                            imageUploads.forEach(imageUpload => {
                                                console.log("Record " + keyName + " Description: " + imageUpload.getDescription());

                                                console.log("Record " + keyName + " PreviewId: " + imageUpload.getPreviewId());

                                                console.log("Record " + keyName + " File_Name: " + imageUpload.getFileName());

                                                console.log("Record " + keyName + " State: " + imageUpload.getState());

                                                console.log("Record " + keyName + " Size: " + imageUpload.getSize());

                                                console.log("Record " + keyName + " SequenceNumber: " + imageUpload.getSequenceNumber());

                                                console.log("Record " + keyName + " Id: " + imageUpload.getId());

                                                console.log("Record " + keyName + " FileId: " + imageUpload.getFileId());
                                            });
                                        }
                                        else if (value[0] instanceof Reminder) {
                                            let reminders = value;

                                            reminders.forEach(reminder => {
                                                console.log("Reminder Period: " + reminder.getPeriod());

                                                console.log("Reminder Unit: " + reminder.getUnit());
                                            });
                                        }
                                        else {
                                            console.log(keyName + ": " + value);
                                        }
                                    }
                                }
                                else if (value instanceof ZCRMUser) {
                                    console.log("Record " + keyName + " User-ID: " + value.getId());

                                    console.log("Record " + keyName + " User-Name: " + value.getName());

                                    console.log("Record " + keyName + " User-Email: " + value.getEmail());

                                }
                                else if (value instanceof ZCRMLayout) {
                                    console.log(keyName + " ID: " + value.getId());

                                    console.log(keyName + " Name: " + value.getName());
                                }
                                else if (value instanceof ZCRMRecord) {
                                    console.log(keyName + " Record ID: " + value.getId());

                                    console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                                }
                                else if (value instanceof Choice) {
                                    console.log(keyName + ": " + value.getValue());
                                }
                                else if (value instanceof RemindAt) {
                                    console.log(keyName + ": " + value.getAlarm());
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
    }

    /**
     * <h3> Update Record Using External Id</h3>
     * This method is used to update a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {String} externalFieldValue 
     */
    static async updateRecordUsingExternalId(moduleAPIName, externalFieldValue) {
        //API Name of the module to update record
        //let moduleAPIName = "module_api_name";
        //let externalFieldValue = "34770615177002";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record = new ZCRMRecord();

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record.addFieldValue(RecordField.Leads.CITY, "City");

        record.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("Custom_field", "Value");

        record.addKeyValue("Custom_field_2", "value");

        record.addKeyValue("Date_1", new Date(2017, 1, 13));

        let fileDetails = [];

        let fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32537b7c2400dadca8ff55f620c65357da");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32e0063e7321b5b4ca878a934519e6cdb2");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c323daf4780bfe0058133556f155795981f");

        fileDetails.push(fileDetail);

        // record.addKeyValue("File_Upload", fileDetails);

        let recordOwner = new ZCRMUser();

        recordOwner.setEmail("abc@zoho.com");

        record.addKeyValue("Owner", recordOwner);

        //Used when GDPR is enabled
        let dataConsent = new Consent();

        dataConsent.setConsentRemarks("Approved.");

        dataConsent.setConsentThrough("Email");

        dataConsent.setContactThroughEmail(true);

        dataConsent.setContactThroughSocial(false);

        record.addKeyValue("Data_Processing_Basis_Details", dataConsent);

        /** Following methods are being used only by Inventory modules */

        let dealName = new ZCRMRecord();

        dealName.addFieldValue(RecordField.Deals.ID, 347706112416012n);

        record.addFieldValue(RecordField.Sales_Orders.DEAL_NAME, dealName);

        let contactName = new ZCRMRecord();

        contactName.addFieldValue(RecordField.Contacts.ID, 347706112263005n);

        contactName.addFieldValue(RecordField.Sales_Orders.CONTACT_NAME, contactName);

        let accountName = new ZCRMRecord();

        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);

        accountName.addKeyValue("name", "automatedAccount");

        record.addFieldValue(RecordField.Sales_Orders.ACCOUNT_NAME, accountName);

        record.addKeyValue("Discount", 10.5);

        let inventoryLineItemArray = [];

        let inventoryLineItem = new ZCRMRecord();

        let lineItemProduct = new LineItemProduct();

        lineItemProduct.setId(347706112402032n);

        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);

        inventoryLineItem.addKeyValue("Quantity", 3);

        inventoryLineItem.addKeyValue("Description", "productDescription");

        inventoryLineItem.addKeyValue("ListPrice", 10.0);

        inventoryLineItem.addKeyValue("Discount", "5.%");

        let productLineTaxes = [];

        let productLineTax = new LineTax();

        productLineTax.setName("MyTax2122");

        productLineTax.setPercentage(20.0);

        productLineTaxes.push(productLineTax);

        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);

        inventoryLineItemArray.push(inventoryLineItem);

        record.addKeyValue("Quoted_Items", inventoryLineItemArray);

        let lineTaxes = [];

        let lineTax = new LineTax();

        lineTax.setName("MyTax2122");

        lineTax.setPercentage(20.0);

        lineTaxes.push(lineTax);

        record.addKeyValue("$line_tax", lineTaxes);

        /** End Inventory **/

        //Add Record instance to the array
        recordsArray.push(record);

        //Set the array to Records in BodyWrapper instance
        request.setData(recordsArray);

        let trigger = [];

        trigger.push("approval");

        trigger.push("workflow");

        trigger.push("blueprint");

        request.setTrigger(trigger);

        let headerInstance = new HeaderMap();

        headerInstance.add(UpdateRecordHeader.X_EXTERNAL, "Leads.External");

        //Call updateRecordUsingExternalId method that takes externalFieldValue, ModuleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response = await recordOperations.updateRecordUsingExternalId(externalFieldValue, moduleAPIName, request, headerInstance);

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
     * <h3> Delete Record Using External Id </h3>
     * This method is used to delete a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {String} externalFieldValue 
     */
    static async deleteRecordUsingExternalId(moduleAPIName, externalFieldValue) {
        //API Name of the module to delete record
        //let moduleAPIName = "module_api_name";
        //let externalFieldValue = "34770615177002";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        //Possible parameters for Delete Record operation
        await paramInstance.add(DeleteRecordParam.WF_TRIGGER, true);

        let headerInstance = new HeaderMap();

        headerInstance.add(DeleteRecordHeader.X_EXTERNAL, "Leads.External");

        //Call deleteRecordUsingExternalId method that takes recordId, ModuleAPIName, paramInstance and headerInstance as parameter.
        let response = await recordOperations.deleteRecordUsingExternalId(externalFieldValue, moduleAPIName, paramInstance, headerInstance);

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
     * <h3> Get Records</h3>
     * This method is used to get all the records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to fetch records
     */
    static async getRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Records operation*/
        await paramInstance.add(GetRecordsParam.APPROVED, "both");

        await paramInstance.add(GetRecordsParam.CONVERTED, "both");

        await paramInstance.add(GetRecordsParam.CVID, "34770610087501");

        let ids = ["External121123456", "34770614352001n"];

        for (let id of ids) {
            await paramInstance.add(GetRecordsParam.IDS, id);
        }

        await paramInstance.add(GetRecordsParam.UID, "34770615181008");

        let fieldNames = ["Company", "Email"];

        await paramInstance.add(GetRecordsParam.FIELDS, fieldNames.toString());

        await paramInstance.add(GetRecordsParam.SORT_BY, "Email");

        await paramInstance.add(GetRecordsParam.SORT_ORDER, "desc");

        await paramInstance.add(GetRecordsParam.PAGE, 1);

        await paramInstance.add(GetRecordsParam.PER_PAGE, 1);

        let startDateTime = new Date(2020, 1, 10, 10, 10, 10);

        await paramInstance.add(GetRecordsParam.STARTDATETIME, startDateTime);

        let endDateTime = new Date(2020, 7, 10, 12, 12, 12);

        await paramInstance.add(GetRecordsParam.ENDDATETIME, endDateTime);

        await paramInstance.add(GetRecordsParam.TERRITORY_ID, "34096430505351");

        await paramInstance.add(GetRecordsParam.INCLUDE_CHILD, "true");

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Record operation*/
        await headerInstance.add(GetRecordsHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T00:00:00+05:30"));

        // headerInstance.add(GetRecordsHeader.X_EXTERNAL, "Leads.External");

        //Call getRecords method that takes moduleAPIName, paramInstance and headerInstance as parameters
        let response = await recordOperations.getRecords(moduleAPIName, paramInstance, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get the object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Record instances
                    let records = responseObject.getData();

                    records.forEach(record => {
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

                        keyArray.forEach(keyName => {
                            let value = keyValues.get(keyName);

                            if (value != null) {
                                if (Array.isArray(value)) {
                                    if (value.length > 0) {
                                        if (value[0] instanceof FileDetails) {
                                            let fileDetails = value;

                                            fileDetails.forEach(fileDetail => {
                                                //Get the Extn of each FileDetails
                                                console.log("Record FileDetails Extn: " + fileDetail.getExtn());

                                                //Get the IsPreviewAvailable of each FileDetails
                                                console.log("Record FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                                //Get the DownloadUrl of each FileDetails
                                                console.log("Record FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                                //Get the DeleteUrl of each FileDetails
                                                console.log("Record FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                                //Get the EntityId of each FileDetails
                                                console.log("Record FileDetails EntityId: " + fileDetail.getEntityId());

                                                //Get the Mode of each FileDetails
                                                console.log("Record FileDetails Mode: " + fileDetail.getMode());

                                                //Get the OriginalSizeByte of each FileDetails
                                                console.log("Record FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                                //Get the PreviewUrl of each FileDetails
                                                console.log("Record FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                                //Get the FileName of each FileDetails
                                                console.log("Record FileDetails FileName: " + fileDetail.getFileName());

                                                //Get the FileId of each FileDetails
                                                console.log("Record FileDetails FileId: " + fileDetail.getFileId());

                                                //Get the AttachmentId of each FileDetails
                                                console.log("Record FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                                //Get the FileSize of each FileDetails
                                                console.log("Record FileDetails FileSize: " + fileDetail.getFileSize());

                                                //Get the CreatorId of each FileDetails
                                                console.log("Record FileDetails CreatorId: " + fileDetail.getCreatorId());

                                                //Get the LinkDocs of each FileDetails
                                                console.log("Record FileDetails LinkDocs: " + fileDetail.getLinkDocs());
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
                                        else if (value[0] instanceof Tag) {
                                            let tags1 = value;

                                            tags1.forEach(tag => {
                                                //Get the Name of each Tag
                                                console.log("Record Tag Name: " + tag.getName());

                                                //Get the Id of each Tag
                                                console.log("Record Tag ID: " + tag.getId());
                                            });
                                        }
                                        else if (value[0] instanceof PricingDetails) {
                                            let pricingDetails = value;

                                            pricingDetails.forEach(pricingDetail => {
                                                console.log("Record PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                                console.log("Record PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                                console.log("Record PricingDetails ID: " + pricingDetail.getId());

                                                console.log("Record PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
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

                                            recordArray.forEach(record1 => {
                                                Array.from(record1.getKeyValues().keys()).forEach(key => {
                                                    console.log(key + ": " + record1.getKeyValues().get(key));
                                                });
                                            });
                                        }
                                        else if (value[0] instanceof LineTax) {
                                            let lineTaxes = value;

                                            lineTaxes.forEach(lineTax => {
                                                console.log("Record ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                                console.log("Record ProductDetails LineTax Name: " + lineTax.getName());

                                                console.log("Record ProductDetails LineTax Id: " + lineTax.getId());

                                                console.log("Record ProductDetails LineTax Value: " + lineTax.getValue().toString());
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
                                        else if (value[0] instanceof Attachment) {
                                            let attachments = value;

                                            attachments.forEach(attachment => {
                                                //Get the ID of each attachment
                                                console.log("Record Attachment ID: " + attachment.getId());

                                                //Get the owner User instance of each attachment
                                                let owner = attachment.getOwner();

                                                //Check if owner is not null
                                                if (owner != null) {
                                                    //Get the Name of the Owner
                                                    console.log("Record Attachment Owner - Name: " + owner.getName());

                                                    //Get the ID of the Owner
                                                    console.log("Record Attachment Owner ID: " + owner.getId());

                                                    //Get the Email of the Owner
                                                    console.log("Record Attachment Owner Email: " + owner.getEmail());
                                                }

                                                //Get the modified time of each attachment
                                                console.log("Record Attachment Modified Time: " + attachment.getModifiedTime().toString());

                                                //Get the name of the File
                                                console.log("Record Attachment File Name: " + attachment.getFileName());

                                                //Get the created time of each attachment
                                                console.log("Record Attachment Created Time: " + attachment.getCreatedTime());

                                                //Get the Attachment file size
                                                console.log("Record Attachment File Size: " + attachment.getSize());

                                                //Get the parentId Record instance of each attachment
                                                let parentId = attachment.getParentId();

                                                //Check if parentId is not null
                                                if (parentId != null) {
                                                    //Get the parent record Name of each attachment
                                                    console.log("Record Attachment parent record Name: " + parentId.getKeyValue("name"));

                                                    //Get the parent record ID of each attachment
                                                    console.log("Record Attachment parent record ID: " + parentId.getId());
                                                }

                                                //Check if the attachment is Editable
                                                console.log("Record Attachment is Editable: " + attachment.getEditable().toString());

                                                //Get the file ID of each attachment
                                                console.log("Record Attachment File ID: " + attachment.getFileId());

                                                //Get the type of each attachment
                                                console.log("Record Attachment File Type: " + attachment.getType());

                                                //Get the seModule of each attachment
                                                console.log("Record Attachment seModule: " + attachment.getSeModule());

                                                //Get the modifiedBy User instance of each attachment
                                                let modifiedBy1 = attachment.getModifiedBy();

                                                //Check if modifiedBy is not null
                                                if (modifiedBy1 != null) {
                                                    //Get the Name of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Name: " + modifiedBy1.getName());

                                                    //Get the ID of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-ID: " + modifiedBy1.getId());

                                                    //Get the Email of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Email: " + modifiedBy1.getEmail());
                                                }

                                                //Get the state of each attachment
                                                console.log("Record Attachment State: " + attachment.getState());

                                                //Get the createdBy User instance of each attachment
                                                let createdBy1 = attachment.getCreatedBy();

                                                //Check if createdBy is not null
                                                if (createdBy1 != null) {
                                                    //Get the name of the createdBy User
                                                    console.log("Record Attachment Created By User-Name: " + createdBy1.getName());

                                                    //Get the ID of the createdBy User
                                                    console.log("Record Attachment Created By User-ID: " + createdBy1.getId());

                                                    //Get the Email of the createdBy User
                                                    console.log("Record Attachment Created By User-Email: " + createdBy1.getEmail());
                                                }

                                                //Get the linkUrl of each attachment
                                                console.log("Record Attachment LinkUrl: " + attachment.getLinkUrl());
                                            });
                                        }
                                        else if (value[0] instanceof ImageUpload) {
                                            let imageUploads = value;

                                            imageUploads.forEach(imageUpload => {
                                                console.log("Record " + keyName + " Description: " + imageUpload.getDescription());

                                                console.log("Record " + keyName + " PreviewId: " + imageUpload.getPreviewId());

                                                console.log("Record " + keyName + " File_Name: " + imageUpload.getFileName());

                                                console.log("Record " + keyName + " State: " + imageUpload.getState());

                                                console.log("Record " + keyName + " Size: " + imageUpload.getSize());

                                                console.log("Record " + keyName + " SequenceNumber: " + imageUpload.getSequenceNumber());

                                                console.log("Record " + keyName + " Id: " + imageUpload.getId());

                                                console.log("Record " + keyName + " FileId: " + imageUpload.getFileId());
                                            });
                                        }
                                        else if (value[0] instanceof Reminder) {
                                            let reminders = value;

                                            reminders.forEach(reminder => {
                                                console.log("Reminder Period: " + reminder.getPeriod());

                                                console.log("Reminder Unit: " + reminder.getUnit());
                                            });
                                        }
                                        else {
                                            console.log(keyName + ": " + value);
                                        }
                                    }
                                }
                                else if (value instanceof ZCRMUser) {
                                    console.log("Record " + keyName + " User-ID: " + value.getId());

                                    console.log("Record " + keyName + " User-Name: " + value.getName());

                                    console.log("Record " + keyName + " User-Email: " + value.getEmail());

                                }
                                else if (value instanceof ZCRMLayout) {
                                    console.log(keyName + " ID: " + value.getId());

                                    console.log(keyName + " Name: " + value.getName());
                                }
                                else if (value instanceof ZCRMRecord) {
                                    console.log(keyName + " Record ID: " + value.getId());

                                    console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                                }
                                else if (value instanceof Choice) {
                                    console.log(keyName + ": " + value.getValue());
                                }
                                else if (value instanceof RemindAt) {
                                    console.log(keyName + ": " + value.getAlarm());
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

                    let info = responseObject.getInfo();

                    console.log("Record Info PerPage : " + info.getPerPage());

                    console.log("Record Info Count : " + info.getCount());

                    console.log("Record Info Page : " + info.getPage());

                    console.log("Record Info MoreRecords : " + info.getMoreRecords());
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
    }

    /**
     * <h3> Create Records</h3>
     * This method is used to create records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to create records.
     */
    static async createRecords(moduleAPIName) {

        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record = new ZCRMRecord();

        /* Value to Record's fields can be provided in any of the following ways */

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record.addFieldValue(RecordField.Leads.LAST_NAME, "Node JS SDK");

        record.addFieldValue(RecordField.Leads.FIRST_NAME, "Node");

        record.addFieldValue(RecordField.Leads.COMPANY, "ZCRM");

        record.addFieldValue(RecordField.Leads.CITY, "City");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("Custom_field", "Value");

        record.addKeyValue("Custom_field_2", "value");

        record.addKeyValue("Date_1", new Date(2020, 10, 20));

        record.addKeyValue("Subject", "AutomatedSDK");

        let tax = new Tax();

        tax.setValue("MyTax1134 - 15.0 %");

        record.addKeyValue("Tax", [tax]);

        record.addKeyValue("Product_Name", "AutomatedSDK");

        let imageUpload = new ImageUpload();

        imageUpload.setEncryptedId("ae9c7cefa418aec1d6a5cc2d9ab35c3272835b7346ccdfe18f80ea3bc40d5f01");

        record.addKeyValue("Image_Upload", [imageUpload]);

        let fileDetails = [];

        let fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32196420ac6fbc01d10b0ac1e4808c9b3c");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c3257343887127572f1f052be51bf0ddc70");

        fileDetails.push(fileDetail);

        fileDetail = new FileDetails();

        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c326025b541cb4566802a96faf5fa449638");

        fileDetails.push(fileDetail);

        record.addKeyValue("File_Upload", fileDetails);

        let recordOwner = new ZCRMUser();

        recordOwner.setEmail("abc@zoho.com");

        record.addKeyValue("Owner", recordOwner);

        //Used when GDPR is enabled
        let dataConsent = new Consent();

        dataConsent.setConsentRemarks("Approved.");

        dataConsent.setConsentThrough("Email");

        dataConsent.setContactThroughEmail(true);

        dataConsent.setContactThroughSocial(false);

        record.addKeyValue("Data_Processing_Basis_Details", dataConsent);

        /** Following methods are being used only by Inventory modules */

        let dealName = new ZCRMRecord();

        dealName.addFieldValue(RecordField.Deals.ID, 347706112416012n);

        record.addFieldValue(RecordField.Sales_Orders.DEAL_NAME, dealName);

        let contactName = new ZCRMRecord();

        contactName.addFieldValue(RecordField.Contacts.ID, 347706112263005n);

        contactName.addFieldValue(RecordField.Sales_Orders.CONTACT_NAME, contactName);

        let accountName = new ZCRMRecord();

        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);

        accountName.addKeyValue("name", "automatedAccount");

        record.addFieldValue(RecordField.Sales_Orders.ACCOUNT_NAME, accountName);

        record.addKeyValue("Discount", 10.5);

        let inventoryLineItemArray = [];

        let inventoryLineItem = new ZCRMRecord();

        let lineItemProduct = new LineItemProduct();

        lineItemProduct.setId(347706112402032n);

        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");

        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);

        inventoryLineItem.addKeyValue("Quantity", 3);

        inventoryLineItem.addKeyValue("Description", "productDescription");

        inventoryLineItem.addKeyValue("ListPrice", 10.0);

        inventoryLineItem.addKeyValue("Discount", "5.%");

        let productLineTaxes = [];

        let productLineTax = new LineTax();

        productLineTax.setName("MyTax1134");

        productLineTax.setPercentage(20.0);

        productLineTaxes.push(productLineTax);

        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);

        inventoryLineItemArray.push(inventoryLineItem);

        record.addKeyValue("Quoted_Items", inventoryLineItemArray);

        // record.addKeyValue("Invoiced_Items", inventoryLineItemArray);

        // record.addKeyValue("Purchase_Items", inventoryLineItemArray);

        // record.addKeyValue("Ordered_Items", inventoryLineItemArray);

        let lineTaxes = [];

        let lineTax = new LineTax();

        lineTax.setName("MyTax1134");

        lineTax.setPercentage(20.0);

        lineTaxes.push(lineTax);

        record.addKeyValue("$line_tax", lineTaxes);

        /** End Inventory **/

        /** Following methods are being used only by Activity modules */

        record.addFieldValue(RecordField.Tasks.DESCRIPTION, "New Task");

        record.addKeyValue("Currency", new Choice("INR"));

        let remindAt = new RemindAt();

        remindAt.setAlarm("FREQ=NONE;ACTION=EMAILANDPOPUP;TRIGGER=DATE-TIME:2020-07-03T12:30:00+05:30");

        record.addFieldValue(RecordField.Tasks.REMIND_AT, remindAt);

        let whoId = new ZCRMRecord();

        whoId.setId(347706112263005n);

        record.addFieldValue(RecordField.Tasks.WHO_ID, whoId);

        record.addFieldValue(RecordField.Tasks.STATUS, new Choice("Waiting for input"));

        record.addFieldValue(RecordField.Tasks.DUE_DATE, new Date(2022, 10, 10));

        record.addFieldValue(RecordField.Tasks.PRIORITY, new Choice("High"));

        let whatId = new ZCRMRecord();

        whatId.setId(347706112263002n);

        record.addFieldValue(RecordField.Tasks.WHAT_ID, whatId);

        record.addKeyValue("$se_module", "Accounts");

        /** Recurring Activity can be provided in any activity module*/

        let recurringActivity = new RecurringActivity();

        recurringActivity.setRrule("FREQ=DAILY;INTERVAL=10;UNTIL=2020-08-14;DTSTART=2020-07-03");

        record.addFieldValue(RecordField.Events.RECURRING_ACTIVITY, recurringActivity);

        record.addFieldValue(RecordField.Events.DESCRIPTION, "My Event");

        let startDateTime = new Date('October 15, 2020 05:35:32');

        record.addFieldValue(RecordField.Events.START_DATETIME, startDateTime);

        let participantsArray = [];

        let participant = new Participant();

        participant.setParticipant("test@gmail.com");

        participant.setType("email");

        participantsArray.push(participant);

        participant = new Participant();

        participant.setParticipant("347706112263005");

        participant.setType("contact");

        participantsArray.push(participant);

        record.addFieldValue(RecordField.Events.PARTICIPANTS, participantsArray);

        record.addKeyValue("send_notification", true);

        record.addFieldValue(RecordField.Events.EVENT_TITLE, "New Automated Event");

        let endDateTime = new Date('November 15, 2020 05:35:32');

        record.addFieldValue(RecordField.Events.END_DATETIME, endDateTime);

        let remindAt1 = new Date('October 15, 2020 04:35:32');

        record.addFieldValue(RecordField.Events.REMIND_AT, remindAt1);

        record.addFieldValue(RecordField.Events.CHECK_IN_STATUS, "PLANNED");

        let whatId1 = new ZCRMRecord();

        whatId1.setId(347706112419002n);

        record.addFieldValue(RecordField.Tasks.WHAT_ID, whatId1);

        record.addKeyValue("$se_module", "Leads");

        /** End Activity **/

        /** Following methods are being used only by Price_Books module */

        let pricingDetailsArray = [];

        let pricingDetail = new PricingDetails();

        pricingDetail.setFromRange(1.0);

        pricingDetail.setToRange(5.0);

        pricingDetail.setDiscount(2.0);

        pricingDetailsArray.push(pricingDetail);

        pricingDetail = new PricingDetails();

        pricingDetail.addKeyValue("from_range", 6.0);

        pricingDetail.addKeyValue("to_range", 11.0);

        pricingDetail.addKeyValue("discount", 3.0);

        pricingDetailsArray.push(pricingDetail);

        record.addFieldValue(RecordField.Price_Books.PRICING_DETAILS, pricingDetailsArray);

        record.addKeyValue("Email", "abc@zoho.com");

        record.addFieldValue(RecordField.Price_Books.DESCRIPTION, "TEST");

        record.addFieldValue(RecordField.Price_Books.PRICE_BOOK_NAME, "book_name");

        record.addFieldValue(RecordField.Price_Books.PRICING_MODEL, new Choice("Flat"));

        /** End of Price_Books */

        let tagsArray = [];

        let tag = new Tag();

        tag.setName("Testtask");

        tagsArray.push(tag);

        //Set the list to Tags in Record instance
        record.setTag(tagsArray);

        //Add Record instance to the array
        recordsArray.push(record);

        //Set the array to data in BodyWrapper instance
        request.setData(recordsArray);

        let trigger = [];

        trigger.push("approval");

        trigger.push("workflow");

        trigger.push("blueprint");

        //Set the array containing the trigger operations to be run
        request.setTrigger(trigger);

        // let larId = "34096432157065";

        //Set the larId
        // request.setLarId(larId);

		let headerInstance = new HeaderMap();
		
        // headerInstance.add(CreateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
                
        //Call createRecords method that takes BodyWrapper instance and moduleAPIName as parameters
        let response = await recordOperations.createRecords(moduleAPIName, request, headerInstance);

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
     * <h3> Update Records</h3>
     * This method is used to update the records of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the module to update records.
     */
    static async updateRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        let record1 = new ZCRMRecord();

        //ID of the record to be updated
        record1.setId(347706112566015n);

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record1.addFieldValue(RecordField.Leads.CITY, "City");

        record1.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record1.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record1.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record1.addKeyValue("Custom_field", "Custom val");

        record1.addKeyValue("Custom_field_2", 10);

        //Used when GDPR is enabled
        let dataConsent = new Consent();

        dataConsent.setConsentRemarks("Approved.");

        dataConsent.setConsentThrough("Email");

        dataConsent.setContactThroughEmail(true);

        dataConsent.setContactThroughSocial(false);

        record1.addKeyValue("Data_Processing_Basis_Details", dataConsent);

        let recordOwner = new ZCRMUser();

        recordOwner.setEmail("abc@zoho.com");

        record1.addKeyValue("Owner", recordOwner);

        /** Following methods are being used only by Inventory modules */

        let dealName = new ZCRMRecord();

        dealName.addFieldValue(RecordField.Deals.ID, 347706112416012n);

        record1.addFieldValue(RecordField.Sales_Orders.DEAL_NAME, dealName);

        let contactName = new ZCRMRecord();

        contactName.addFieldValue(RecordField.Contacts.ID, 347706112263005n);

        contactName.addFieldValue(RecordField.Sales_Orders.CONTACT_NAME, contactName);

        let accountName = new ZCRMRecord();

        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);

        accountName.addKeyValue("name", "automatedAccount");

        record1.addFieldValue(RecordField.Sales_Orders.ACCOUNT_NAME, accountName);

        record1.addKeyValue("Discount", 10.5);

        let inventoryLineItemArray = [];

        let inventoryLineItem = new ZCRMRecord();

        let lineItemProduct = new LineItemProduct();

        lineItemProduct.setId(347706112402032n);

        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");

        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);

        inventoryLineItem.addKeyValue("Quantity", 3);

        inventoryLineItem.addKeyValue("Description", "productDescription");

        inventoryLineItem.addKeyValue("ListPrice", 10.0);

        inventoryLineItem.addKeyValue("Discount", "5.%");

        let productLineTaxes = [];

        let productLineTax = new LineTax();

        productLineTax.setName("MyTax1134");

        productLineTax.setPercentage(20.0);

        productLineTaxes.push(productLineTax);

        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);

        inventoryLineItemArray.push(inventoryLineItem);

        record1.addKeyValue("Quoted_Items", inventoryLineItemArray);

        let lineTaxes = [];

        let lineTax = new LineTax();

        lineTax.setName("MyTax1134");

        lineTax.setPercentage(20.0);

        lineTaxes.push(lineTax);

        record1.addKeyValue("$line_tax", lineTaxes);

        /** End Inventory **/

        recordsArray.push(record1);

        let record2 = new ZCRMRecord();

        //ID of the record to be updated
        record2.addFieldValue(RecordField.Leads.ID, 347706110152007n);

        /*
         * Call addFieldValue method that takes two arguments
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record2.addFieldValue(RecordField.Leads.CITY, "City");

        record2.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record2.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record2.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record2.addKeyValue("Custom_field", "Value");

        record2.addKeyValue("Custom_field_2", "value");

        //Add Record instance to the array
        recordsArray.push(record2);

        //Set the array to data in BodyWrapper instance
        request.setData(recordsArray);

        let trigger = [];

        trigger.push("approval");

        trigger.push("workflow");

        trigger.push("blueprint");

        //Set the array containing the trigger operations to be run
        request.setTrigger(trigger);

		let headerInstance = new HeaderMap();
		
        // headerInstance.add(UpdateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");              

        //Call updateRecords method that takes moduleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response = await recordOperations.updateRecords(moduleAPIName, request, headerInstance);

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
     * <h3> Delete Records</h3>
     * This method is used to delete records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to delete records.
     * @param {Array} recordIds The array of record IDs to be deleted
     */
    static async deleteRecords(moduleAPIName, recordIds) {
        //example
        //let moduleAPIName = "module_api_name";
        // let recordIds = [3756050n, 3729017n, 3989009n];

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Delete Records operation */
        for (let recordId of recordIds) {
            await paramInstance.add(DeleteRecordsParam.IDS, recordId);
        }

        await paramInstance.add(DeleteRecordsParam.WF_TRIGGER, true);


		let headerInstance = new HeaderMap();
		
        // headerInstance.add(DeleteRecordsHeader.X_EXTERNAL, "Leads.External");              

        //Call deleteRecords method that takes paramInstance and moduleAPIName as parameter.
        let response = await recordOperations.deleteRecords(moduleAPIName, paramInstance, headerInstance);

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
     * <h3> Upsert Records</h3>
     * This method is used to Upsert records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to upsert records.
     */
    static async upsertRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class that takes moduleAPIName as parameter
        let recordOperations = new RecordOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record1 = new ZCRMRecord();

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record1.addFieldValue(RecordField.Leads.CITY, "City");

        record1.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record1.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record1.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record1.addKeyValue("Custom_field", "Custom val");

        record1.addKeyValue("Custom_field_2", 10);

        //Add the record to array
        recordsArray.push(record1);

        let record2 = new ZCRMRecord();

        /*
         * Call addFieldValue method that takes two arguments
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record2.addFieldValue(RecordField.Leads.CITY, "City");

        record2.addFieldValue(RecordField.Leads.LAST_NAME, "Last Name");

        record2.addFieldValue(RecordField.Leads.FIRST_NAME, "First Name");

        record2.addFieldValue(RecordField.Leads.COMPANY, "KKRNP");

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record2.addKeyValue("Custom_field", "Value");

        record2.addKeyValue("Custom_field_2", "value");

        //Add the record to array
        recordsArray.push(record2);

        //Set the array to data in BodyWrapper instance
        request.setData(recordsArray);

        let duplicateCheckFields = ["City", "Last_Name", "First_Name"];

        //Set the array containing duplicate check fiels to BodyWrapper instance
        request.setDuplicateCheckFields(duplicateCheckFields);

		let headerInstance = new HeaderMap();
		
        headerInstance.add(UpsertRecordsHeader.X_EXTERNAL, "Leads.External");
                
        //Call upsertRecords method that takes BodyWrapper instance and moduleAPIName as parameter.
        let response = await recordOperations.upsertRecords(moduleAPIName, request, headerInstance);

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
     * <h3> Get Deleted Records</h3>
     * This method is used to get the deleted records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to get the deleted records.
     */
    static async getDeletedRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get Deleted Records operation */

        //can be all/recycle/permanent
        await paramInstance.add(GetDeletedRecordsParam.TYPE, "permanent");

        await paramInstance.add(GetDeletedRecordsParam.PAGE, 1);

        await paramInstance.add(GetDeletedRecordsParam.PER_PAGE, 200);

        //Get instance of HeaderMap Class
        let headerInstance = new HeaderMap();

        /* Possible headers for Get Deleted Records operation */
        await headerInstance.add(GetDeletedRecordsHeader.IF_MODIFIED_SINCE, new Date('January 15, 2020 10:35:32'));

        //Call getDeletedRecords method that takes paramInstance, headerInstance and moduleAPIName as parameter
        let response = await recordOperations.getDeletedRecords(moduleAPIName, paramInstance, headerInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get the object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected DeletedRecordsWrapper instance is received
                if (responseObject instanceof DeletedRecordsWrapper) {
                    //Get the array of obtained DeletedRecord instances
                    let deletedRecords = responseObject.getData();

                    deletedRecords.forEach(deletedRecord => {
                        //Get the deletedBy User instance of each DeletedRecord
                        let deletedBy = deletedRecord.getDeletedBy();

                        //Check if deletedBy is not null
                        if (deletedBy != null) {
                            //Get the name of the deletedBy User
                            console.log("DeletedRecord Deleted By User-Name: " + deletedBy.getName());

                            //Get the ID of the deletedBy User
                            console.log("DeletedRecord Deleted By User-ID: " + deletedBy.getId());
                        }

                        //Get the ID of each DeletedRecord
                        console.log("DeletedRecord ID: " + deletedRecord.getId());

                        //Get the DisplayName of each DeletedRecord
                        console.log("DeletedRecord DisplayName: " + deletedRecord.getDisplayName());

                        //Get the Type of each DeletedRecord
                        console.log("DeletedRecord Type: " + deletedRecord.getType());

                        //Get the createdBy User instance of each DeletedRecord
                        let createdBy = deletedRecord.getCreatedBy();

                        //Check if createdBy is not null
                        if (createdBy != null) {
                            //Get the name of the createdBy User
                            console.log("DeletedRecord Created By User-Name: " + createdBy.getName());

                            //Get the ID of the createdBy User
                            console.log("DeletedRecord Created By User-ID: " + createdBy.getId());
                        }

                        //Get the DeletedTime of each DeletedRecord
                        console.log("DeletedRecord DeletedTime: " + deletedRecord.getDeletedTime());
                    });

                    //Get the obtained Info object
                    let info = responseObject.getInfo();

                    if (info != null) {
                        if (info.getPerPage() != null) {
                            //Get the PerPage of the Info
                            console.log("Record Info PerPage: " + info.getPerPage().toString());
                        }

                        if (info.getCount() != null) {
                            //Get the Count of the Info
                            console.log("Record Info Count: " + info.getCount().toString());
                        }

                        if (info.getPage() != null) {
                            //Get the Page of the Info
                            console.log("Record Info Page: " + info.getPage().toString());
                        }

                        if (info.getMoreRecords() != null) {
                            //Get the MoreRecords of the Info
                            console.log("Record Info MoreRecords: " + info.getMoreRecords().toString());
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
     * <h3> Search Records</h3>
     * This method is used to search records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to search records.
     */
    static async searchRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Search Records operation */
        await paramInstance.add(SearchRecordsParam.EMAIL, "user@zoho.com");

        await paramInstance.add(SearchRecordsParam.PHONE, "234567890");

        await paramInstance.add(SearchRecordsParam.WORD, "First Name Last Name");

        await paramInstance.add(SearchRecordsParam.CONVERTED, "both");

        await paramInstance.add(SearchRecordsParam.APPROVED, "both");

        await paramInstance.add(SearchRecordsParam.PAGE, 1);

        await paramInstance.add(SearchRecordsParam.PER_PAGE, 2);

        //Encoding must be done for parentheses or comma
        await paramInstance.add(SearchRecordsParam.CRITERIA, "((Last_Name:starts_with:Last Name) or (Company:starts_with:fasf\\(123\\) K))");

        // await paramInstance.add(SearchRecordsParam.CRITERIA, "(External:in:TestExternal123)");

		let headerInstance = new HeaderMap();
		
        // headerInstance.add(SearchRecordsHeader.X_EXTERNAL, "Leads.External");              

        //Call searchRecords method that takes moduleAPIName, ParameterMap Instance and headerInstance as parameter
        let response = await recordOperations.searchRecords(moduleAPIName, paramInstance, headerInstance);

        if (response != null) {

            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get the object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Record instances
                    let records = responseObject.getData();

                    records.forEach(record => {
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

                        keyArray.forEach(keyName => {
                            let value = keyValues.get(keyName);

                            if (value != null) {
                                if (Array.isArray(value)) {
                                    if (value.length > 0) {
                                        if (value[0] instanceof FileDetails) {
                                            let fileDetails = value;

                                            fileDetails.forEach(fileDetail => {
                                                //Get the Extn of each FileDetails
                                                console.log("Record FileDetails Extn: " + fileDetail.getExtn());

                                                //Get the IsPreviewAvailable of each FileDetails
                                                console.log("Record FileDetails IsPreviewAvailable: " + fileDetail.getIsPreviewAvailable());

                                                //Get the DownloadUrl of each FileDetails
                                                console.log("Record FileDetails DownloadUrl: " + fileDetail.getDownloadUrl());

                                                //Get the DeleteUrl of each FileDetails
                                                console.log("Record FileDetails DeleteUrl: " + fileDetail.getDeleteUrl());

                                                //Get the EntityId of each FileDetails
                                                console.log("Record FileDetails EntityId: " + fileDetail.getEntityId());

                                                //Get the Mode of each FileDetails
                                                console.log("Record FileDetails Mode: " + fileDetail.getMode());

                                                //Get the OriginalSizeByte of each FileDetails
                                                console.log("Record FileDetails OriginalSizeByte: " + fileDetail.getOriginalSizeByte());

                                                //Get the PreviewUrl of each FileDetails
                                                console.log("Record FileDetails PreviewUrl: " + fileDetail.getPreviewUrl());

                                                //Get the FileName of each FileDetails
                                                console.log("Record FileDetails FileName: " + fileDetail.getFileName());

                                                //Get the FileId of each FileDetails
                                                console.log("Record FileDetails FileId: " + fileDetail.getFileId());

                                                //Get the AttachmentId of each FileDetails
                                                console.log("Record FileDetails AttachmentId: " + fileDetail.getAttachmentId());

                                                //Get the FileSize of each FileDetails
                                                console.log("Record FileDetails FileSize: " + fileDetail.getFileSize());

                                                //Get the CreatorId of each FileDetails
                                                console.log("Record FileDetails CreatorId: " + fileDetail.getCreatorId());

                                                //Get the LinkDocs of each FileDetails
                                                console.log("Record FileDetails LinkDocs: " + fileDetail.getLinkDocs());
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
                                        else if (value[0] instanceof Tag) {
                                            let tags1 = value;

                                            tags1.forEach(tag => {
                                                //Get the Name of each Tag
                                                console.log("Record Tag Name: " + tag.getName());

                                                //Get the Id of each Tag
                                                console.log("Record Tag ID: " + tag.getId());
                                            });
                                        }
                                        else if (value[0] instanceof PricingDetails) {
                                            let pricingDetails = value;

                                            pricingDetails.forEach(pricingDetail => {
                                                console.log("Record PricingDetails ToRange: " + pricingDetail.getToRange().toString());

                                                console.log("Record PricingDetails Discount: " + pricingDetail.getDiscount().toString());

                                                console.log("Record PricingDetails ID: " + pricingDetail.getId());

                                                console.log("Record PricingDetails FromRange: " + pricingDetail.getFromRange().toString());
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

                                            recordArray.forEach(record1 => {
                                                Array.from(record1.getKeyValues().keys()).forEach(key => {
                                                    console.log(key + ": " + record1.getKeyValues().get(key));
                                                });
                                            });
                                        }
                                        else if (value[0] instanceof LineTax) {
                                            let lineTaxes = value;

                                            lineTaxes.forEach(lineTax => {
                                                console.log("Record ProductDetails LineTax Percentage: " + lineTax.getPercentage().toString());

                                                console.log("Record ProductDetails LineTax Name: " + lineTax.getName());

                                                console.log("Record ProductDetails LineTax Id: " + lineTax.getId());

                                                console.log("Record ProductDetails LineTax Value: " + lineTax.getValue().toString());
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
                                        else if (value[0] instanceof Attachment) {
                                            let attachments = value;

                                            attachments.forEach(attachment => {
                                                //Get the ID of each attachment
                                                console.log("Record Attachment ID: " + attachment.getId());

                                                //Get the owner User instance of each attachment
                                                let owner = attachment.getOwner();

                                                //Check if owner is not null
                                                if (owner != null) {
                                                    //Get the Name of the Owner
                                                    console.log("Record Attachment Owner - Name: " + owner.getName());

                                                    //Get the ID of the Owner
                                                    console.log("Record Attachment Owner ID: " + owner.getId());

                                                    //Get the Email of the Owner
                                                    console.log("Record Attachment Owner Email: " + owner.getEmail());
                                                }

                                                //Get the modified time of each attachment
                                                console.log("Record Attachment Modified Time: " + attachment.getModifiedTime().toString());

                                                //Get the name of the File
                                                console.log("Record Attachment File Name: " + attachment.getFileName());

                                                //Get the created time of each attachment
                                                console.log("Record Attachment Created Time: " + attachment.getCreatedTime());

                                                //Get the Attachment file size
                                                console.log("Record Attachment File Size: " + attachment.getSize());

                                                //Get the parentId Record instance of each attachment
                                                let parentId = attachment.getParentId();

                                                //Check if parentId is not null
                                                if (parentId != null) {
                                                    //Get the parent record Name of each attachment
                                                    console.log("Record Attachment parent record Name: " + parentId.getKeyValue("name"));

                                                    //Get the parent record ID of each attachment
                                                    console.log("Record Attachment parent record ID: " + parentId.getId());
                                                }

                                                //Check if the attachment is Editable
                                                console.log("Record Attachment is Editable: " + attachment.getEditable().toString());

                                                //Get the file ID of each attachment
                                                console.log("Record Attachment File ID: " + attachment.getFileId());

                                                //Get the type of each attachment
                                                console.log("Record Attachment File Type: " + attachment.getType());

                                                //Get the seModule of each attachment
                                                console.log("Record Attachment seModule: " + attachment.getSeModule());

                                                //Get the modifiedBy User instance of each attachment
                                                let modifiedBy1 = attachment.getModifiedBy();

                                                //Check if modifiedBy is not null
                                                if (modifiedBy1 != null) {
                                                    //Get the Name of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Name: " + modifiedBy1.getName());

                                                    //Get the ID of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-ID: " + modifiedBy1.getId());

                                                    //Get the Email of the modifiedBy User
                                                    console.log("Record Attachment Modified By User-Email: " + modifiedBy1.getEmail());
                                                }

                                                //Get the state of each attachment
                                                console.log("Record Attachment State: " + attachment.getState());

                                                //Get the createdBy User instance of each attachment
                                                let createdBy1 = attachment.getCreatedBy();

                                                //Check if createdBy is not null
                                                if (createdBy1 != null) {
                                                    //Get the name of the createdBy User
                                                    console.log("Record Attachment Created By User-Name: " + createdBy1.getName());

                                                    //Get the ID of the createdBy User
                                                    console.log("Record Attachment Created By User-ID: " + createdBy1.getId());

                                                    //Get the Email of the createdBy User
                                                    console.log("Record Attachment Created By User-Email: " + createdBy1.getEmail());
                                                }

                                                //Get the linkUrl of each attachment
                                                console.log("Record Attachment LinkUrl: " + attachment.getLinkUrl());
                                            });
                                        }
                                        else if (value[0] instanceof ImageUpload) {
                                            let imageUploads = value;

                                            imageUploads.forEach(imageUpload => {
                                                console.log("Record " + keyName + " Description: " + imageUpload.getDescription());

                                                console.log("Record " + keyName + " PreviewId: " + imageUpload.getPreviewId());

                                                console.log("Record " + keyName + " File_Name: " + imageUpload.getFileName());

                                                console.log("Record " + keyName + " State: " + imageUpload.getState());

                                                console.log("Record " + keyName + " Size: " + imageUpload.getSize());

                                                console.log("Record " + keyName + " SequenceNumber: " + imageUpload.getSequenceNumber());

                                                console.log("Record " + keyName + " Id: " + imageUpload.getId());

                                                console.log("Record " + keyName + " FileId: " + imageUpload.getFileId());
                                            });
                                        }
                                        else if (value[0] instanceof Reminder) {
                                            let reminders = value;

                                            reminders.forEach(reminder => {
                                                console.log("Reminder Period: " + reminder.getPeriod());

                                                console.log("Reminder Unit: " + reminder.getUnit());
                                            });
                                        }
                                        else {
                                            console.log(keyName + ": " + value);
                                        }
                                    }
                                }
                                else if (value instanceof ZCRMUser) {
                                    console.log("Record " + keyName + " User-ID: " + value.getId());

                                    console.log("Record " + keyName + " User-Name: " + value.getName());

                                    console.log("Record " + keyName + " User-Email: " + value.getEmail());

                                }
                                else if (value instanceof ZCRMLayout) {
                                    console.log(keyName + " ID: " + value.getId());

                                    console.log(keyName + " Name: " + value.getName());
                                }
                                else if (value instanceof ZCRMRecord) {
                                    console.log(keyName + " Record ID: " + value.getId());

                                    console.log(keyName + " Record Name: " + value.getKeyValue("name"));
                                }
                                else if (value instanceof Choice) {
                                    console.log(keyName + ": " + value.getValue());
                                }
                                else if (value instanceof RemindAt) {
                                    console.log(keyName + ": " + value.getAlarm());
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
    }

    /**
     * <h3> Convert Lead</h3>
     * This method is used to Convert a Lead record and print the response.
     * @param {BigInt} leadId The ID of the Lead to be converted.
     */
    static async convertLead(leadId) {
        //example
        //let leadId = 02034003n;

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ConvertBodyWrapper Class that will contain the request body
        let request = new ConvertBodyWrapper();

        //Array to hold LeadConverter instances
        let data = [];

        //Get instance of LeadConverter Class
        let record = new LeadConverter();

        record.setOverwrite(true);

        record.setNotifyLeadOwner(true);

        record.setNotifyNewEntityOwner(true);

        record.setAccounts("34770615848125");

        record.setContacts("34770610358009");

        record.setAssignTo("34770610173021");

        let deals = new ZCRMRecord();

        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        deals.addFieldValue(RecordField.Deals.DEAL_NAME, "deal_name");

        deals.addFieldValue(RecordField.Deals.DESCRIPTION, "deals description");

        deals.addFieldValue(RecordField.Deals.CLOSING_DATE, new Date(2021, 2, 13));

        deals.addFieldValue(RecordField.Deals.STAGE, new Choice("Closed Won"));

        deals.addFieldValue(RecordField.Deals.AMOUNT, 50.7);

        deals.addKeyValue("Pipeline", new Choice("Qualification"));

        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        deals.addKeyValue("Custom_field", "Value");

        deals.addKeyValue("Custom_field_2", "value");

        //Set the Deal record to deals in LeadConverter instance
        record.setDeals(deals);

        let carryOverTags = new CarryOverTags();

        carryOverTags.setAccounts(["Test"]);

        carryOverTags.setContacts(["Test"]);

        carryOverTags.setDeals(["Test"]);

        record.setCarryOverTags(carryOverTags);

        //Add the instance to array
        data.push(record);

        //Set the array to data ConvertBodyWrapper instance
        request.setData(data);

        //Call convertLead method that takes ConvertBodyWrapper instance and leadId as parameter
        let response = await recordOperations.convertLead(leadId, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ResponseWrapper instance is received
                if (responseObject instanceof ConvertActionWrapper) {
                    //Get the array of ConvertActionResponses from object
                    let convertActionResponses = responseObject.getData();

                    convertActionResponses.forEach(convertActionResponse => {
                        //Check if the request is successful
                        if (convertActionResponse instanceof SuccessfulConvert) {
                            //Get the Accounts ID of  Record
                            console.log("LeadConvert Accounts ID: " + convertActionResponse.getAccounts());

                            //Get the Contacts ID of  Record
                            console.log("LeadConvert Contacts ID: " + convertActionResponse.getContacts());

                            //Get the Deals ID of  Record
                            console.log("LeadConvert Deals ID: " + convertActionResponse.getDeals());
                        }
                        //Check if the request returned an exception
                        else if (convertActionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + convertActionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + convertActionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = convertActionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + convertActionResponse.getMessage().getValue());
                        }
                    });
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
            }
        }
    }

    /**
     * This method is used to download a photo associated with a module.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record
     * @param {String} destinationFolder The absolute path of the destination folder to store the photo.
     */
    static async getPhoto(moduleAPIName, recordId, destinationFolder) {
        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 5177002;
        // let destinationFolder = "/Users/user-name/Documents";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Call getPhoto method that takes moduleAPIName and recordId as parameters
        let response = await recordOperations.getPhoto(recordId, moduleAPIName);

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
                //Check if expected FileBodyWrapper instance is received
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

                    let details = responseObject.getDetails();

                    //Get the details map
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
     * This method is used to attach a photo to a record. You must include the file in the request
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record
     * @param {String} absoluteFilePath The absolute file path of the file to be uploaded
     */
    static async uploadPhoto(moduleAPIName, recordId, absoluteFilePath) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 177002n;
        //let absoluteFilePath = "/Users/user_name/Desktop/image.png";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of FileBodyWrapper class that will contain the request file
        let request = new FileBodyWrapper();

        /** StreamWrapper can be initialized in any of the following ways */

        /**
         * param 1 . fileName
         * param 2 . Read Stream.
         */
        let streamWrapper = new StreamWrapper(null, fs.createReadStream(absoluteFilePath));

        /**
         * param 1 . fileName
         * param 2 . Read Stream
         * param 3 . Absolute File Path of the file to be attached
         */
        // let streamWrapper = new StreamWrapper(null, null, absoluteFilePath);

        //Set file to the FileBodyWrapper instance
        request.setFile(streamWrapper);

        //Call uploadPhoto method that takes FileBodyWrapper instance, moduleAPIName and recordId as parameter
        let response = await recordOperations.uploadPhoto(recordId, moduleAPIName, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if the request is successful
                if (responseObject instanceof SuccessResponse) {
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

                    console.log("Message: " + responseObject.getMessage().getValue());
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
     * This method is used to delete a photo from a record in a module.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to delete photo
     */
    static async deletePhoto(moduleAPIName, recordId) {
        //example
        //let moduleAPIName = "module_api_name";
        //let recordId = 005177002n;

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Call deletePhoto method that takes moduleAPIName and recordId as parameter
        let response = await recordOperations.deletePhoto(recordId, moduleAPIName);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if the request is successful
                if (responseObject instanceof SuccessResponse) {
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

                    console.log("Message: " + responseObject.getMessage().getValue());
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
     * This method is used to update the values of specific fields for multiple records and print the response.
     * @param {String} moduleAPIName The API Name of the module to mass update records.
     */
    static async massUpdateRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of MassUpdateBodyWrapper Class that will contain the request body
        let request = new MassUpdateBodyWrapper();

        //Array to hold Record instances
        let recordsArray = [];

        //Get instance of Record Class
        let record = new ZCRMRecord();

        record.addFieldValue(RecordField.Leads.CITY, "Chennai");

        //Add the record instance to array
        recordsArray.push(record);

        //Set the array to data in MassUpdateBodyWrapper instance
        request.setData(recordsArray);

        //Set the cvid to MassUpdateBodyWrapper instance
        // request.setCvid("34096430087501");

        let ids = ["34770616916059"];

        //Set the array of IDs to MassUpdateBodyWrapper instance
        request.setIds(ids);

        //Set the value to over write
        request.setOverWrite(true);

        //Get instance of Territory Class
        let territory = new Territory();

        //Set ID to Territory
        territory.setId(34096430505351n);

        // request.setTerritory(territory);

        //Call massUpdateRecords method that takes MassUpdateBodyWrapper instance, ModuleAPIName as parameter.
        let response = await recordOperations.massUpdateRecords(moduleAPIName, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected MassUpdateActionWrapper instance is received
                if (responseObject instanceof MassUpdateActionWrapper) {
                    //Get the array of MassUpdate ActionResponses
                    let massUpdateActionResponses = responseObject.getData();

                    massUpdateActionResponses.forEach(massUpdateActionResponse => {

                        //Check if the request is successful
                        if (massUpdateActionResponse instanceof MassUpdateSuccessResponse) {
                            //Get the Status
                            console.log("Status: " + massUpdateActionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + massUpdateActionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = massUpdateActionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + massUpdateActionResponse.getMessage().getValue());
                        }
                        //Check if the request returned an exception
                        else if (massUpdateActionResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + massUpdateActionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + massUpdateActionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = massUpdateActionResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + massUpdateActionResponse.getMessage().getValue());
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
     * This method is used to get the status of the mass update job scheduled previously and print the response.
     * @param {String} moduleAPIName  The API Name of the module to obtain status of Mass Update.
     * @param {String} jobId The ID of the job obtained from the response of Mass Update Records.
     */
    static async getMassUpdateStatus(moduleAPIName, jobId) {
        //example
        //let moduleAPIName = "module_api_name";
        //let jobId = "77002";

        //Get instance of RecordOperations Class
        let recordOperations = new RecordOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        /* Possible parameters for Get MassUpdate Status operation */
        await paramInstance.add(GetMassUpdateStatusParam.JOB_ID, jobId);

        //Call getMassUpdateStatus method that takes ParameterMap instance and moduleAPIName as parameter
        let response = await recordOperations.getMassUpdateStatus(moduleAPIName, paramInstance);

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
                //Check if expected MassUpdateResponseWrapper instance is received
                if (responseObject instanceof MassUpdateResponseWrapper) {
                    //Get the array of MassUpdate ActionResponse data
                    let massUpdateResponses = responseObject.getData();

                    massUpdateResponses.forEach(massUpdateResponse => {
                        //Check if the request is successful
                        if (massUpdateResponse instanceof MassUpdate) {
                            //Get the Status of each MassUpdate
                            console.log("MassUpdate Status: " + massUpdateResponse.getStatus().getValue());

                            //Get the FailedCount of each MassUpdate
                            console.log("MassUpdate FailedCount: " + massUpdateResponse.getFailedCount().toString());

                            //Get the UpdatedCount of each MassUpdate
                            console.log("MassUpdate UpdatedCount: " + massUpdateResponse.getUpdatedCount().toString());

                            //Get the NotUpdatedCount of each MassUpdate
                            console.log("MassUpdate NotUpdatedCount: " + massUpdateResponse.getNotUpdatedCount());

                            //Get the TotalCount of each MassUpdate
                            console.log("MassUpdate TotalCount: " + massUpdateResponse.getTotalCount().toString());
                        }
                        //Check if the request returned an exception
                        else if (massUpdateResponse instanceof APIException) {
                            //Get the Status
                            console.log("Status: " + massUpdateResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + massUpdateResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = massUpdateResponse.getDetails();

                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }

                            //Get the Message
                            console.log("Message: " + massUpdateResponse.getMessage().getValue());
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

    static async getRecordCount() {
		//Get instance of RecordOperations Class
		let recordOperations = new RecordOperations();
		
		let moduleAPIName = "Leads";
				
		let paramInstance = new ParameterMap();
		
		await paramInstance.add(RecordCountParam.PHONE, "(990) -");
		
		let response = await recordOperations.recordCount(moduleAPIName, paramInstance);
		
		if(response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }
            //Get object from response
            let countHandler = response.getObject();
            
            if(countHandler instanceof CountWrapper) {
                //Get the received CountWrapper instance
                let countWrapper = countHandler;
                
                //Get the Count of Tag
                console.log("Record Count: " + countWrapper.getCount());
            }
            //Check if the request returned an exception
            else if(countHandler instanceof APIException)
            {
                //Get the received APIException instance
                let exception = countHandler;

                //Get the Status
                console.log("Status: " + exception.getStatus().getValue());

                //Get the Code
                console.log("Code: " + exception.getCode().getValue());

                console.log("Details: " );

                //Get the details map
                let details = exception.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + exception.getMessage().getValue());
            }
		}
	}
	
	static async assignTerritoriesToMultipleRecords(moduleAPIName) {
		//API Name of the module to assignTerritoriesToMultipleRecords
		//let moduleAPIName = "Leads";
		
		//Get instance of RecordOperations Class
		let recordOperations = new RecordOperations();
		
		//Get instance of BodyWrapper Class that will contain the request body
		let request = new BodyWrapper();
		
		//List of Record instances
		let records = [];

		//Get instance of Record Class
		let record1 = new ZCRMRecord();
		
		record1.setId(347706112107002n);
	
		/*
		 * Call addKeyValue method that takes two arguments
		 * 1 . A string that is the Field's API Name
		 * 2 . Value
		 */
		
		let territory = new Territory();
		
		territory.setId(34770613051397n);
		
		record1.addKeyValue("Territories", [territory]);
		
		//Add Record instance to the list
		records.push(record1);
		
		//Set the list to Records in BodyWrapper instance
		request.setData(records);
		
		//Call assignTerritoriesToMultipleRecords method that takes ModuleAPIName and  BodyWrapper instance as parameter.
		let response = await recordOperations.assignTerritoriesToMultipleRecords(moduleAPIName, request);
		
        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
				if(responseObject instanceof ActionWrapper) {
					//Get the list of obtained ActionResponse instances
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

	static async assignTerritoryToRecord(moduleAPIName, id) {
		//API Name of the module to assignTerritoryToRecord
		//let moduleAPIName = "Leads";
		
		//Get instance of RecordOperations Class
		let recordOperations = new RecordOperations();
		
		//Get instance of BodyWrapper Class that will contain the request body
		let request = new BodyWrapper();
		
		//List of Record instances
		let records = [];

		//Get instance of Record Class
		let record1 = new ZCRMRecord();
		
		/*
		 * Call addKeyValue method that takes two arguments
		 * 1 . A string that is the Field's API Name
		 * 2 . Value
		 */
		
		let territory = new Territory();
		
		territory.setId(34770613051397n);
		
		record1.addKeyValue("Territories", [territory]);
		
		//Add Record instance to the list
		records.push(record1);
		
		//Set the list to Records in BodyWrapper instance
		request.setData(records);
		
		//Call assignTerritoryToRecord method that takes ModuleAPIName, id and  BodyWrapper instance as parameter.
		let response = await recordOperations.assignTerritoryToRecord(moduleAPIName, id, request);
		
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
	
	static async removeTerritoriesFromMultipleRecords(moduleAPIName) {
		//example
		//let moduleAPIName = "Leads";
		//let recordId = 34770615177002L;
		
		//Get instance of RecordOperations Class
		let recordOperations = new RecordOperations();
		
		//Get instance of BodyWrapper Class that will contain the request body
		let request = new BodyWrapper();
		
		//List of Record instances
		let records = [];

        //Get instance of Record Class
        let record1 = new ZCRMRecord();
		
		record1.setId(347706112107002n);
	
		/*
		 * Call addKeyValue method that takes two arguments
		 * 1 . A string that is the Field's API Name
		 * 2 . Value
		 */
		
		let territory = new Territory();
		
		territory.setId(34770613051397n);
		
		record1.addKeyValue("Territories", [territory]);
		
		//Add Record instance to the list
		records.push(record1);
		
		//Set the list to Records in BodyWrapper instance
		request.setData(records);
		
		//Call removeTerritoriesFromMultipleRecords method that takes moduleAPIName and BodyWrapper instance as parameter
		let response = await recordOperations.removeTerritoriesFromMultipleRecords(moduleAPIName, request);
		
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
	
	static async removeTerritoriesFromRecord(moduleAPIName, id) {
		//example
		//let moduleAPIName = "Leads";
		//let recordId = 34770615177002L;
		
		//Get instance of RecordOperations Class
		let recordOperations = new RecordOperations();
		
		//Get instance of BodyWrapper Class that will contain the request body
		let request = new BodyWrapper();
		
		//List of Record instances
		let records = [];

        //Get instance of Record Class
        let record1 = new ZCRMRecord();
	
		/*
		 * Call addKeyValue method that takes two arguments
		 * 1 . A string that is the Field's API Name
		 * 2 . Value
		 */
		
		let territory = new Territory();
		
		territory.setId(34770613051397n);
		
		record1.addKeyValue("Territories", [territory]);
		
		//Add Record instance to the list
		records.push(record1);
		
		//Set the list to Records in BodyWrapper instance
		request.setData(records);
		
		//Call removeTerritoriesFromRecord method that takes moduleAPIName, recordId and BodyWrapper instance as parameter
		let response = await recordOperations.removeTerritoriesFromRecord(moduleAPIName, id, request);
		
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

module.exports = { Record }