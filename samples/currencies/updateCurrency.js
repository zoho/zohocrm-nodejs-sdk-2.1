import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdateCurrency{
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
     * <h3> Update Currency </h3>
     * This method is used to update currency details.
     * @param {BigInt} currencyId Specify the unique ID of the currency.
     */
    static async updateCurrency(currencyId) {
        //example
        //let currencyId = 6011001n;
        let currenciesOperations = new ZOHOCRMSDK.Currencies.CurrenciesOperations();
        let request = new ZOHOCRMSDK.Currencies.BodyWrapper();
        //Array to hold Currency instances
        let currencies = [];
        let currency = new ZOHOCRMSDK.Currencies.Currency();
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);
        currency.setExchangeRate("5.00");
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);
        let format = new ZOHOCRMSDK.Currencies.Format();
        //It can be a Period or Comma, depending on the currency.
        format.setDecimalSeparator(new ZOHOCRMSDK.Choice("Period"));
        //It can be a Period, Comma, or Space, depending on the currency.
        format.setThousandSeparator(new ZOHOCRMSDK.Choice("Comma"));
        format.setDecimalPlaces(new ZOHOCRMSDK.Choice("2"));
        currency.setFormat(format);
        //Add the Currency instance to the array
        currencies.push(currency);
        request.setCurrencies(currencies);
        //Call updateCurrency method that takes BodyWrapper instance and currencyId as parameters
        let response = await currenciesOperations.updateCurrency(currencyId, request);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Currencies.ActionWrapper) {
                    let actionResponses = responseObject.getCurrencies();
                    actionResponses.forEach(actionResponse => {
                        if (actionResponse instanceof ZOHOCRMSDK.Currencies.SuccessResponse) {
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
                        else if (actionResponse instanceof ZOHOCRMSDK.Currencies.APIException) {
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
                else if (responseObject instanceof ZOHOCRMSDK.Currencies.APIException) {
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
await UpdateCurrency.initialize();
let currencyId = 1001n;
await UpdateCurrency.updateCurrency(currencyId);
export {
    UpdateCurrency as UpdateCurrency
}
