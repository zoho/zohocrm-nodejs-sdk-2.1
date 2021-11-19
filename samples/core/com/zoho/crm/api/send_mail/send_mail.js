const SendMailOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/send_mail_operations").SendMailOperations;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/response_wrapper").ResponseWrapper;
const Mail = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/mail").Mail;
const InventoryTemplate = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/inventory_templates/inventory_template").InventoryTemplate;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/body_wrapper").BodyWrapper;
const UserAddress = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/user_address").UserAddress;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/api_exception").APIException;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/action_wrapper").ActionWrapper;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/send_mail/success_response").SuccessResponse;

class SendMail {

    static async getEmailAddresses() {
        //Get instance of SendMailOperations Class
        let sendMailOperations = new SendMailOperations();

        //Call getEmailAddresses method that takes ParameterMap instance as parameter
        let response = await sendMailOperations.getEmailAddresses();

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

                let emails = responseWrapper.getFromAddresses();

                for (let email of emails) {
                    console.log("UserName: " + email.getUserName());

                    console.log("Mail Type: " + email.getType());

                    console.log("Mail : " + email.getEmail());

                    console.log("Mail ID: " + email.getId());

                    console.log("Mail Default: " + email.getDefault());
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

    static async sendMail(recordId, moduleAPIName) {
        //Get instance of SendMailOperations Class
        let sendMailOperations = new SendMailOperations();

        let mail = new Mail();

        let from = new UserAddress();

        from.setUserName("user");

        from.setEmail("user1@zoho.com");

        mail.setFrom(from);

        let to = new UserAddress();

        to.setUserName("user2");

        to.setEmail("user2@zoho.com");

        mail.setTo([to]);

        mail.setSubject("Mail subject");

        mail.setContent("<br><a href=\"{ConsentForm.en_US}\" id=\"ConsentForm\" class=\"en_US\" target=\"_blank\">Consent form link</a><br><br><br><br><br><h3><span style=\"background-color: rgb(254, 255, 102)\">REGARDS,</span></h3><div><span style=\"background-color: rgb(254, 255, 102)\">AZ</span></div><div><span style=\"background-color: rgb(254, 255, 102)\">ADMIN</span></div> <div></div>");

        mail.setConsentEmail(true);

        mail.setMailFormat("html");

        let template = new InventoryTemplate();

        template.setId(34770610174009n);

        mail.setTemplate(template);

        let wrapper = new BodyWrapper();

        wrapper.setData([mail]);

        //Call sendMail method
        let response = await sendMailOperations.sendMail(recordId, moduleAPIName, wrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

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
}

module.exports = { SendMail }