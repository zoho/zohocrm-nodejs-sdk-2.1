import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateRecords{
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
     * <h3> Create Records</h3>
     * This method is used to create records of a module and print the response.
     * @param {String} moduleAPIName The API Name of the module to create records.
     */
    static async createRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let request = new ZOHOCRMSDK.Records.BodyWrapper();
        //Array to hold Record instances
        let recordsArray = [];
        let record = new ZOHOCRMSDK.Records.Record();
        let applyFeatureExecution = new ZOHOCRMSDK.Records.ApplyFeatureExecution();
        let apply_feature_list = [];
        applyFeatureExecution.setName("layout_rules");
        apply_feature_list.push(applyFeatureExecution);
        request.setApplyFeatureExecution(apply_feature_list);
        /* Value to Record's fields can be provided in any of the following ways */
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Node JS SDK");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "Node");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "ZCRM");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "City");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.ANNUAL_REVENUE, 1231.1);
        //
        // record.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.LAST_NAME, "NOde js SDK");
        // record.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.FIRST_NAME, "Node");
        // record.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.EMAIL,"abc@gmail.com");
        // record.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.MOBILE, "1234221");
        // // record.addKeyValue("myfield","myvalue");
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("Custom_field", "Value");
        record.addKeyValue("Custom_field_2", "value");
        record.addKeyValue("Date_1", new Date(2020, 10, 20));
        record.addKeyValue("Subject", "AutomatedSDK");
        let tax = new ZOHOCRMSDK.Records.Tax();
        tax.setValue("MyTax1134 - 15.0 %");
        record.addKeyValue("Tax", [tax]);
        record.addKeyValue("Product_Name", "AutomatedSDK");
        let imageUpload = new ZOHOCRMSDK.Records.ImageUpload();
        imageUpload.setEncryptedId("ae9c7cefa418aec1d6a5cc2d9ab35c3272835b7346ccdfe18f80ea3bc40d5f01");
        record.addKeyValue("Image_Upload", [imageUpload]);
        let fileDetails = [];
        let fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32196420ac6fbc01d10b0ac1e4808c9b3c");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c3257343887127572f1f052be51bf0ddc70");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c326025b541cb4566802a96faf5fa449638");
        fileDetails.push(fileDetail);
        record.addKeyValue("File_Upload", fileDetails);
        let recordOwner = new ZOHOCRMSDK.Users.User();
        recordOwner.setEmail("abc@zoho.com");
        record.addKeyValue("Owner", recordOwner);
        //Used when GDPR is enabled
        let dataConsent = new ZOHOCRMSDK.Records.Consent();
        dataConsent.setConsentRemarks("Approved.");
        dataConsent.setConsentThrough("Email");
        dataConsent.setContactThroughEmail(true);
        dataConsent.setContactThroughSocial(false);
        record.addKeyValue("Data_Processing_Basis_Details", dataConsent);
        /** Following methods are being used only by Inventory modules */
        let dealName = new ZOHOCRMSDK.Records.Record();
        dealName.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.ID, 347706112416012n);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.DEAL_NAME, dealName);
        let contactName = new ZOHOCRMSDK.Records.Record();
        contactName.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.ID, 347706112263005n);
        contactName.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.CONTACT_NAME, contactName);
        let accountName = new ZOHOCRMSDK.Records.Record();
        accountName.addFieldValue(ZOHOCRMSDK.Records.Field.Accounts.ID, 440248000000884001n);
        accountName.addKeyValue("name", "automatedAccount");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.ACCOUNT_NAME, accountName);
        record.addKeyValue("Discount", 10.5);
        let inventoryLineItemArray = [];
        let inventoryLineItem = new ZOHOCRMSDK.Records.Record();
        let lineItemProduct = new ZOHOCRMSDK.Records.LineItemProduct();
        lineItemProduct.setId(440248000000954344n);
        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");
        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);
        inventoryLineItem.addKeyValue("Quantity", 1);
        inventoryLineItem.addKeyValue("Description", "productDescription");
        inventoryLineItem.addKeyValue("ListPrice", 10.0);
        inventoryLineItem.addKeyValue("Discount", "5.%");
        let productLineTaxes = [];
        let productLineTax = new ZOHOCRMSDK.Records.LineTax();
        productLineTax.setName("MyTax1134");
        productLineTax.setPercentage(20.0);
        productLineTaxes.push(productLineTax);
        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);
        inventoryLineItemArray.push(inventoryLineItem);
        record.addKeyValue("Quoted_Items", inventoryLineItemArray);
        record.addKeyValue("Invoiced_Items", inventoryLineItemArray);
        record.addKeyValue("Purchase_Items", inventoryLineItemArray);
        record.addKeyValue("Ordered_Items", inventoryLineItemArray);
        let lineTaxes = [];
        let lineTax = new ZOHOCRMSDK.Records.LineTax();
        lineTax.setName("MyTax1134");
        lineTax.setPercentage(20.0);
        lineTaxes.push(lineTax);
        record.addKeyValue("$line_tax", lineTaxes);
        /** End Inventory **/
        /** Following methods are being used only by Activity modules */
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.DESCRIPTION, "New Task");
        record.addKeyValue("Currency", new ZOHOCRMSDK.Choice("INR"));
        let remindAt = new ZOHOCRMSDK.Records.RemindAt();
        remindAt.setAlarm("FREQ=NONE;ACTION=EMAILANDPOPUP;TRIGGER=DATE-TIME:2020-07-03T12:30:00+05:30");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.REMIND_AT, remindAt);
        let whoId = new ZOHOCRMSDK.Records.Record();
        whoId.setId(347706112263005n);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.WHO_ID, whoId);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.STATUS, new ZOHOCRMSDK.Choice("Waiting for input"));
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.DUE_DATE, new Date(2022, 10, 10));
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.PRIORITY, new ZOHOCRMSDK.Choice("High"));
        let whatId = new ZOHOCRMSDK.Records.Record();
        whatId.setId(347706112263002n);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.WHAT_ID, whatId);
        record.addKeyValue("$se_module", "Accounts");
        /** Recurring Activity can be provided in any activity module*/
        let recurringActivity = new ZOHOCRMSDK.Records.RecurringActivity();
        recurringActivity.setRrule("FREQ=DAILY;INTERVAL=10;UNTIL=2020-08-14;DTSTART=2020-07-03");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.RECURRING_ACTIVITY, recurringActivity);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.DESCRIPTION, "My Event");
        let startDateTime = new Date('October 15, 2020 05:35:32');
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.START_DATETIME, startDateTime);
        let participantsArray = [];
        let participant = new ZOHOCRMSDK.Records.Participants();
        participant.setParticipant("test@gmail.com");
        participant.setType("email");
        participantsArray.push(participant);
        participant = new ZOHOCRMSDK.Records.Participants();
        participant.setParticipant("347706112263005");
        participant.setType("contact");
        participantsArray.push(participant);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.PARTICIPANTS, participantsArray);
        record.addKeyValue("send_notification", true);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.EVENT_TITLE, "New Automated Event");
        let endDateTime = new Date('November 15, 2020 05:35:32');
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.END_DATETIME, endDateTime);
        let remindAt1 = new Date('October 15, 2020 04:35:32');
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.REMIND_AT, remindAt1);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Events.CHECK_IN_STATUS, "PLANNED");
        let whatId1 = new ZOHOCRMSDK.Records.Record();
        whatId1.setId(347706112419002n);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Tasks.WHAT_ID, whatId1);
        record.addKeyValue("$se_module", "Leads");
        /** End Activity **/
        /** Following methods are being used only by Price_Books module */
        let pricingDetailsArray = [];
        let pricingDetail = new ZOHOCRMSDK.Records.PricingDetails();
        pricingDetail.setFromRange(1.0);
        pricingDetail.setToRange(5.0);
        pricingDetail.setDiscount(2.0);
        pricingDetailsArray.push(pricingDetail);
        pricingDetail = new ZOHOCRMSDK.Records.PricingDetails();
        pricingDetail.addKeyValue("from_range", 6.0);
        pricingDetail.addKeyValue("to_range", 11.0);
        pricingDetail.addKeyValue("discount", 3.0);
        pricingDetailsArray.push(pricingDetail);
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Price_Books.PRICING_DETAILS, pricingDetailsArray);
        record.addKeyValue("Email", "abc@zoho.com");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Price_Books.DESCRIPTION, "TEST");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Price_Books.PRICE_BOOK_NAME, "book_name");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Price_Books.PRICING_MODEL, new Choice("Flat"));
        /** End of Price_Books */
        let tagsArray = [];
        let tag = new ZOHOCRMSDK.Tags.Tag();
        tag.setName("Testtask");
        tagsArray.push(tag);
        record.setTag(tagsArray);
        // Add Record instance to the array
        recordsArray.push(record);
        request.setData(recordsArray);
        let trigger = [];
        
        trigger.push("approval");
        
        trigger.push("workflow");
        
        trigger.push("blueprint");
        request.setTrigger(trigger);
        let larId = "34096432157065";
        request.setLarId(larId);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        headerInstance.add(CreateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
        //Call createRecords method that takes BodyWrapper instance and moduleAPIName as parameters
        let response = await recordOperations.createRecords(moduleAPIName, request, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Records.ActionWrapper) {
                    let actionResponses = responseObject.getData();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Records.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Records.APIException) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if (details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    console.log(key + ": " + details.get(key));
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Records.APIException) {
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
await CreateRecords.initialize();
let moduleAPIName = "leads";
await CreateRecords.createRecords(moduleAPIName);
export {
    CreateRecords as CreateRecords
}