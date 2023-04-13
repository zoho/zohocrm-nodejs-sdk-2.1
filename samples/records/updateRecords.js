import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateRecords{
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
     * <h3> Update Records</h3>
     * This method is used to update the records of a module with ID and print the response.
     * @param {String} moduleAPIName The API Name of the module to update records.
     */
    static async updateRecords(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
        let request = new ZOHOCRMSDK.Records.BodyWrapper();
        //Array to hold Record instances
        let recordsArray = [];
        let record1 = new ZOHOCRMSDK.Records.Record();
        //ID of the record to be updated
        record1.setId(440248000000967024n);
        let applyFeatureExecution = new ZOHOCRMSDK.Records.ApplyFeatureExecution();
        let apply_feature_list = [];
        applyFeatureExecution.setName("layout_rules");
        apply_feature_list.push(applyFeatureExecution);
        request.setApplyFeatureExecution(apply_feature_list);
        /*
         * Call addFieldValue method that takes two arguments
         * Import the "@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/field" file
         * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
         * 2 . Value
         */
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Node JS SDK");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "Node");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "ZCRM");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "city");
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.ANNUAL_REVENUE, 1231.1);
        /*
         * Call addKeyValue method that takes two arguments
         * 1 . A string that is the Field's API Name
         * 2 . Value
         */
        record1.addKeyValue("Custom_field", "Custom val");
        
        record1.addKeyValue("Custom_field_2", 10);
        
        //Used when GDPR is enabled
        let dataConsent = new ZOHOCRMSDK.Records.Consent();
        
        dataConsent.setConsentRemarks("Approved.");
        
        dataConsent.setConsentThrough("Email");
        
        dataConsent.setContactThroughEmail(true);
        
        dataConsent.setContactThroughSocial(false);
        
        record1.addKeyValue("Data_Processing_Basis_Details", dataConsent);
        
        let recordOwner = new ZOHOCRMSDK.Users.User();
        
        recordOwner.setEmail("abc@zoho.com");
        
        record1.addKeyValue("Owner", recordOwner);
        
        /** Following methods are being used only by Inventory modules */
        
        let dealName = new ZOHOCRMSDK.Records.Record();
        
        dealName.addFieldValue(ZOHOCRMSDK.Records.Field.Deals.ID, 347706112416012n);
        
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.DEAL_NAME, dealName);
        
        let contactName = new ZOHOCRMSDK.Records.Record();
        
        contactName.addFieldValue(ZOHOCRMSDK.Records.Field.Contacts.ID, 347706112263005n);
        
        contactName.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.CONTACT_NAME, contactName);
        
        let accountName = new ZOHOCRMSDK.Records.Record();
        
        // accountName.addFieldValue(RecordField.Accounts.ID, 34770619326021n);
        
        accountName.addKeyValue("name", "automatedAccount");
        
        record1.addFieldValue(ZOHOCRMSDK.Records.Field.Sales_Orders.ACCOUNT_NAME, accountName);
        
        record1.addKeyValue("Discount", 10.5);
        
        let inventoryLineItemArray = [];
        
        let inventoryLineItem = new ZOHOCRMSDK.Records.Record();
        
        let lineItemProduct = new ZOHOCRMSDK.Records.LineItemProduct();
        
        lineItemProduct.setId(347706112402032n);
        
        // lineItemProduct.addKeyValue("Products_External", "ProductExternal");
        
        inventoryLineItem.addKeyValue("Product_Name", lineItemProduct);
        
        inventoryLineItem.addKeyValue("Quantity", 3);
        
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
        
        record1.addKeyValue("Quoted_Items", inventoryLineItemArray);
        
        let lineTaxes = [];
        
        let lineTax = new ZOHOCRMSDK.Records.LineTax();
        
        lineTax.setName("MyTax1134");
        
        lineTax.setPercentage(20.0);
        
        lineTaxes.push(lineTax);
        
        record1.addKeyValue("$line_tax", lineTaxes);
        
        // /** End Inventory **/

        recordsArray.push(record1);

        let record2 = new ZOHOCRMSDK.Records.Record();
        //
        //ID of the record to be updated
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.ID, 347706110152007n);
        //
        // /*
        //  * Call addFieldValue method that takes two arguments
        //  * 1 . Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
        //  * 2 . Value
        //  */
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.CITY, "City");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Last Name");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "First Name");
        
        record2.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.COMPANY, "KKRNP");
        //
        // /*
        //  * Call addKeyValue method that takes two arguments
        //  * 1 . A string that is the Field's API Name
        //  * 2 . Value
        //  */
        record2.addKeyValue("Custom_field", "Value");
        
        record2.addKeyValue("Custom_field_2", "value");
        //Add Record instance to the array
        recordsArray.push(record2);
        request.setData(recordsArray);

        let trigger = [];
        
        trigger.push("approval");
        
        trigger.push("workflow");
        
        trigger.push("blueprint");
        request.setTrigger(trigger);
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        // await headerInstance.add(ZOHOCRMSDK.Records.UpdateRecordsHeader.X_EXTERNAL, "Quotes.Quoted_Items.Product_Name.Products_External");
        //Call updateRecords method that takes moduleAPIName, BodyWrapper instance and headerInstance as parameter.
        let response = await recordOperations.updateRecords(moduleAPIName, request, headerInstance);
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
await UpdateRecords.initialize();
let moduleAPIName = "leads";
await UpdateRecords.updateRecords(moduleAPIName);
export {
    UpdateRecords as UpdateRecords
}