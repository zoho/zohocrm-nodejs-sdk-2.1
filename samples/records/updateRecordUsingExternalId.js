import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateRecordUsingExternalId{
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
     * <h3> Update Record Using External Id</h3>
     * This method is used to update a single record of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module.
     * @param {String} externalFieldValue
     */
    static async updateRecordUsingExternalId(moduleAPIName, externalFieldValue) {
        //API Name of the module to update record
        //let moduleAPIName = "module_api_name";
        //let externalFieldValue = "34770615177002";
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let request = new ZOHOCRMSDK.Records.BodyWrapper();
        //Array to hold Record instances
        let recordsArray = [];
        let record = new ZOHOCRMSDK.Records.Record();
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "City");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Last Name");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "First Name");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Last Name");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "KKRNP");
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record.addKeyValue("Custom_field", "Value");
        record.addKeyValue("Custom_field_2", "value");
        record.addKeyValue("Date_1", new Date(2017, 1, 13));
        let fileDetails = [];
        let fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32537b7c2400dadca8ff55f620c65357da");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c32e0063e7321b5b4ca878a934519e6cdb2");
        fileDetails.push(fileDetail);
        fileDetail = new ZOHOCRMSDK.Records.FileDetails();
        fileDetail.setFileId("ae9c7cefa418aec1d6a5cc2d9ab35c323daf4780bfe0058133556f155795981f");
        fileDetails.push(fileDetail);
        // record.addKeyValue("File_Upload", fileDetails);
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
        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);
        accountName.addKeyValue("name", "automatedAccount");
        record.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.ACCOUNT_NAME, accountName);
        record.addKeyValue("Discount", 10.5);
        let inventoryLineItemArray = [];
        let inventoryLineItem = new ZOHOCRMSDK.Records.Record();
        let lineItemProduct = new ZOHOCRMSDK.Records.LineItemProduct();
        lineItemProduct.setId(347706112402032n);
        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);
        inventoryLineItem.addKeyValue("Quantity", 3);
        inventoryLineItem.addKeyValue("Description", "productDescription");
        inventoryLineItem.addKeyValue("ListPrice", 10.0);
        inventoryLineItem.addKeyValue("Discount", "5.%");
        let productLineTaxes = [];
        let productLineTax = new ZOHOCRMSDK.Records.LineTax();
        productLineTax.setName("MyTax2122");
        productLineTax.setPercentage(20.0);
        productLineTaxes.push(productLineTax);
        inventoryLineItem.addKeyValue("Line_Tax", productLineTaxes);
        inventoryLineItemArray.push(inventoryLineItem);
        record.addKeyValue("Quoted_Items", inventoryLineItemArray);
        let lineTaxes = [];
        let lineTax = new ZOHOCRMSDK.Records.LineTax();
        lineTax.setName("MyTax2122");
        lineTax.setPercentage(20.0);
        lineTaxes.push(lineTax);
        record.addKeyValue("$line_tax", lineTaxes);
        /** End Inventory **/
        //Add Record instance to the array
        recordsArray.push(record);
        request.setData(recordsArray);
        let trigger = [];
        trigger.push("approval");
        trigger.push("workflow");
        trigger.push("blueprint");
        request.setTrigger(trigger);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        await headerInstance.add(ZOHOCRMSDK.Records.UpdateRecordHeader.X_EXTERNAL, "Leads.External");
        //Call updateRecordUsingExternalId method that takes externalFieldValue, ModuleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response = await recordOperations.updateRecordUsingExternalId(externalFieldValue, moduleAPIName, request, headerInstance);
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
await UpdateRecordUsingExternalId.initialize();
let moduleAPIName = "leads";
let externalFieldValue = "external";
await UpdateRecordUsingExternalId.updateRecordUsingExternalId(moduleAPIName,externalFieldValue);
export {
    UpdateRecordUsingExternalId as UpdateRecordUsingExternalId
}