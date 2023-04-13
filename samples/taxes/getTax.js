import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetTax{
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
     * <h3> Get Tax </h3>
     * This method is used to get the Organization Tax with ID and print the response.
     * @param {BigInt} taxId The ID of the tax to be obtained
     */
    static async getTax(taxId) {
        //example
        //let taxId = 02317003n;
        let taxesOperations = new ZOHOCRMSDK.Taxes.TaxesOperations();
        //Call getTax method that takes taxId as parameter
        let response = await taxesOperations.getTax(taxId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Taxes.ResponseWrapper) {
                    let taxes = responseObject.getTaxes();
                    taxes.forEach(tax => {
                        console.log("Tax DisplayLabel: " + tax.getDisplayLabel());
                        console.log("Tax Name: " + tax.getName());
                        console.log("Tax ID: " + tax.getId());
                        console.log("Tax Value: " + tax.getValue().toString());
                    });
                    let preference = responseObject.getPreference();
                    if (preference != null) {
                        console.log("Preference AutoPopulateTax: " + preference.getAutoPopulateTax().toString());
                        console.log("Preference ModifyTaxRates: " + preference.getModifyTaxRates().toString());
                    }
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
await GetTax.initialize();
let taxId = 1321n;
await GetTax.getTax(taxId);
export {
    GetTax as GetTax
}
