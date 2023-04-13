import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetCurrency{
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
     * <h3> Get Currency </h3>
     * This method is used to get the details of a specific currency.
     * @param {BigInt} currencyId Specify the unique ID of the currency.
     */
    static async getCurrency(currencyId) {
        //example
        //let currencyId = 1001n;
        let currenciesOperations = new ZOHOCRMSDK.Currencies.CurrenciesOperations();
        //Call getCurrency method that takes currencyId as parameter
        let response = await currenciesOperations.getCurrency(currencyId);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Currencies.ResponseWrapper) {
                    let currencies = responseObject.getCurrencies();
                    currencies.forEach(currency => {
                        console.log("Currency Id: " + currency.getId());
                        console.log("Currency IsoCode: " + currency.getIsoCode());
                        console.log("Currency Symbol: " + currency.getSymbol());
                        console.log("Currency CreatedTime: " + currency.getCreatedTime());
                        console.log("Currency IsActive: " + currency.getIsActive().toString());
                        console.log("Currency ExchangeRate: " + currency.getExchangeRate());
                        let format = currency.getFormat();
                        if (format != null) {
                            console.log("Currency Format DecimalSeparator: " + format.getDecimalSeparator().getValue());
                            console.log("Currency Format ThousandSeparator: " + format.getThousandSeparator().getValue());
                            console.log("Currency Format DecimalPlaces: " + format.getDecimalPlaces().getValue());
                        }
                        let createdBy = currency.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Currency CreatedBy User-Name: " + createdBy.getName());
                            console.log("Currency CreatedBy User-ID: " + createdBy.getId());
                        }
                        console.log("Currency PrefixSymbol: " + currency.getPrefixSymbol().toString());
                        console.log("Currency IsBase: " + currency.getIsBase().toString());
                        console.log("Currency ModifiedTime: " + currency.getModifiedTime());
                        console.log("Currency Name: " + currency.getName());
                        let modifiedBy = currency.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Currency ModifiedBy User-Name: " + modifiedBy.getName());
                            console.log("Currency ModifiedBy User-ID: " + modifiedBy.getId());
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
await GetCurrency.initialize();
let currencyId = 1001n;
await GetCurrency.getCurrency(currencyId);
export {
    GetCurrency as GetCurrency
}
