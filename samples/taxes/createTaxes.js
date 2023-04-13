import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class CreateTaxes{
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
     * <h3> Create Taxes </h3>
     * This method is used to create Organization Taxes and print the response.
     */
    static async createTaxes() {
        let taxesOperations = new ZOHOCRMSDK.Taxes.TaxesOperations();
        let request = new ZOHOCRMSDK.Taxes.BodyWrapper();
        //Array to hold Tax instances
        let taxArray = [];
        let tax = new ZOHOCRMSDK.Taxes.Tax();
        tax.setName("MyTax11");
        tax.setSequenceNumber(2);
        tax.setValue(10.0);
        //Add the instance to array
        taxArray.push(tax);
        tax = new ZOHOCRMSDK.Taxes.Tax();
        tax.setName("MyTax21");
        tax.setValue(12.0);
        //Add the instance to array
        taxArray.push(tax);
        request.setTaxes(taxArray);
        //Call createTaxes method that takes BodyWrapper class instance as parameter
        let response = await taxesOperations.createTaxes(request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Taxes.ActionWrapper) {
                    let actionResponses = responseObject.getTaxes();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Taxes.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Taxes.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Taxes.APIException) {
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
await CreateTaxes.initialize();
await CreateTaxes.createTaxes();
export {
    CreateTaxes as CreateTaxes
}
