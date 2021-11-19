const CurrenciesOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/currencies_operations").CurrenciesOperations;
const ZCRMCurrency = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/currency").Currency;
const Format = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/format").Format;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/response_wrapper").ResponseWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/action_wrapper").ActionWrapper;
const BaseCurrencyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/base_currency_wrapper").BaseCurrencyWrapper;
const BaseCurrencyActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/base_currency_action_wrapper").BaseCurrencyActionWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/success_response").SuccessResponse;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/currencies/body_wrapper").BodyWrapper;
const Choice = require("@zohocrm/nodejs-sdk-2.1/utils/util/choice").Choice;

class Currency {
    /**
     * <h3> Get Currencies </h3>
     * This method is used to get all the available currencies in your organization.
     */
    static async getCurrencies() {
        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Call getCurrencies method
        let response = await currenciesOperations.getCurrencies();

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
                //Check if expected ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Currency instances
                    let currencies = responseObject.getCurrencies();

                    currencies.forEach(currency => {
                        //Get the Symbol of each currency
                        console.log("Currency Symbol: " + currency.getSymbol());

                        //Get the CreatedTime of each currency
                        console.log("Currency CreatedTime: " + currency.getCreatedTime());

                        //Get if the currency is active
                        console.log("Currency IsActive: " + currency.getIsActive().toString());

                        //Get the ExchangeRate of each currency
                        console.log("Currency ExchangeRate: " + currency.getExchangeRate());

                        //Get the format instance of each currency
                        let format = currency.getFormat();

                        if (format != null) {
                            //Get the DecimalSeparator of the Format
                            console.log("Currency Format DecimalSeparator: " + format.getDecimalSeparator().getValue());

                            //Get the ThousandSeparator of the Format
                            console.log("Currency Format ThousandSeparator: " + format.getThousandSeparator().getValue());

                            //Get the DecimalPlaces of the Format
                            console.log("Currency Format DecimalPlaces: " + format.getDecimalPlaces().getValue());
                        }

                        //Get the createdBy User instance of each currency
                        let createdBy = currency.getCreatedBy();

                        //Check if createdBy is not null
                        if (createdBy != null) {
                            //Get the Name of the createdBy User
                            console.log("Currency CreatedBy User-Name: " + createdBy.getName());

                            //Get the ID of the createdBy User
                            console.log("Currency CreatedBy User-ID: " + createdBy.getId());
                        }

                        //Get the PrefixSymbol of each currency
                        console.log("Currency PrefixSymbol: " + currency.getPrefixSymbol().toString());

                        //Get the IsBase of each currency
                        console.log("Currency IsBase: " + currency.getIsBase().toString());

                        //Get the ModifiedTime of each currency
                        console.log("Currency ModifiedTime: " + currency.getModifiedTime());

                        //Get the Name of each currency
                        console.log("Currency Name: " + currency.getName());

                        //Get the modifiedBy User instance of each currency
                        let modifiedBy = currency.getModifiedBy();

                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            //Get the Name of the modifiedBy User
                            console.log("Currency ModifiedBy User-Name: " + modifiedBy.getName());

                            //Get the ID of the modifiedBy User
                            console.log("Currency ModifiedBy User-ID: " + modifiedBy.getId());
                        }

                        //Get the Id of each currency
                        console.log("Currency Id: " + currency.getId());

                        //Get the IsoCode of each currency
                        console.log("Currency IsoCode: " + currency.getIsoCode());
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
     * <h3> Add Currencies </h3>
     * This method is used to add new currencies to your organization.
     */
    static async addCurrencies() {
        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Currency instances
        let currencies = [];

        //Get instance of Currency Class
        let currency = new ZCRMCurrency();

        //To set the position of the ISO code in the currency.
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);

        //To set the name of the currency.
        currency.setName("Angolan Kwanza - AOA");

        //To set the ISO code of the currency.
        currency.setIsoCode("AOA");

        //To set the symbol of the currency.
        currency.setSymbol("Kz");

        //To set the rate at which the currency has to be exchanged for home currency.
        currency.setExchangeRate("20.");

        //To set the status of the currency.
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);

        let format = new Format();

        //It can be a Period or Comma, depending on the currency.
        format.setDecimalSeparator(new Choice("Period"));

        //It can be a Period, Comma, or Space, depending on the currency.
        format.setThousandSeparator(new Choice("Comma"));

        //To set the number of decimal places allowed for the currency. It can be 0, 2, or 3.
        format.setDecimalPlaces(new Choice("2"));

        //To set the format of the currency
        currency.setFormat(format);

        currencies.push(currency);

        //Set the array to Currency in BodyWrapper instance
        request.setCurrencies(currencies);

        //Call addCurrencies method that takes BodyWrapper instance as parameter
        let response = await currenciesOperations.addCurrencies(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getCurrencies();

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
     * <h3> Update Currencies </h3>
     * This method is used to update currency details.
     */
    static async updateCurrencies() {
        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Currency instances
        let currencies = [];

        //Get instance of Currency Class
        let currency = new ZCRMCurrency();

        //To set currency Id
        currency.setId(34770616011001n);

        //To set the position of the ISO code in the currency.
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);

        //To set the rate at which the currency has to be exchanged for home currency.
        currency.setExchangeRate("10.");

        //To set the status of the currency.
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);

        let format = new Format();

        //It can be a Period or Comma, depending on the currency.
        format.setDecimalSeparator(new Choice("Period"));

        //It can be a Period, Comma, or Space, depending on the currency.
        format.setThousandSeparator(new Choice("Space"));

        //To set the number of decimal places allowed for the currency. It can be 0, 2, or 3.
        format.setDecimalPlaces(new Choice("2"));

        //To set the format of the currency
        currency.setFormat(format);

        //Add Currency instance to the array
        currencies.push(currency);

        //Set the array to Currency in BodyWrapper instance
        request.setCurrencies(currencies);

        //Call updateCurrencies method that takes BodyWrapper instance as parameter
        let response = await currenciesOperations.updateCurrencies(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getCurrencies();

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
     * <h3> Enable Multiple Currencies </h3>
     * This method is used to enable multiple currencies for your organization.
     */
    static async enableMultipleCurrencies() {
        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Get instance of BaseCurrencyWrapper Class that will contain the request body
        let request = new BaseCurrencyWrapper();

        //Get instance of Currency Class
        let currency = new ZCRMCurrency();

        //To set the position of the ISO code in the base currency.
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);

        //To set the name of the base currency.
        currency.setName("Algerian Dinar-ADN");

        //To set the ISO code of the base currency.
        currency.setIsoCode("DZD");

        //To set the symbol of the base currency.
        currency.setSymbol("Af");

        //To set the rate at which the currency has to be exchanged for home base currency.
        currency.setExchangeRate("1.00");

        //To set the status of the base currency.
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);

        let format = new Format();

        //It can be a Period or Comma, depending on the base currency.
        format.setDecimalSeparator(new Choice("Period"));

        //It can be a Period, Comma, or Space, depending on the base currency.
        format.setThousandSeparator(new Choice("Comma"));

        //To set the number of decimal places allowed for the base currency. It can be 0, 2, or 3.
        format.setDecimalPlaces(new Choice("2"));

        //To set the format of the base currency
        currency.setFormat(format);

        //Set the Currency in BodyWrapper instance
        request.setBaseCurrency(currency);

        //Call enableMultipleCurrencies method that takes BodyWrapper instance as parameter
        let response = await currenciesOperations.enableMultipleCurrencies(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected BaseCurrencyActionWrapper instance is received
                if (responseObject instanceof BaseCurrencyActionWrapper) {

                    //Get the received obtained ActionResponse instances
                    let actionResponse = responseObject.getBaseCurrency();

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
     * <h3> Update Currency </h3>
     * This method is used to update base currency details.
     */
    static async updateBaseCurrency() {
        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Get instance of BaseCurrencyWrapper Class that will contain the request body
        let request = new BaseCurrencyWrapper();

        //Get instance of Currency Class
        let currency = new ZCRMCurrency();

        //To set the position of the ISO code in the base currency.
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);

        //To set the symbol of the base currency.
        currency.setSymbol("Af");

        //To set the rate at which the currency has to be exchanged for home base currency.
        currency.setExchangeRate("1.00");

        //To set currency Id
        currency.setId(34770616008002n);

        let format = new Format();

        //It can be a Period or Comma, depending on the base currency.
        format.setDecimalSeparator(new Choice("Period"));

        //It can be a Period, Comma, or Space, depending on the base currency.
        format.setThousandSeparator(new Choice("Comma"));

        //To set the number of decimal places allowed for the base currency. It can be 0, 2, or 3.
        format.setDecimalPlaces(new Choice("2"));

        //To set the format of the base currency
        currency.setFormat(format);

        //Set the Currency in BodyWrapper instance
        request.setBaseCurrency(currency);

        //Call updateBaseCurrency method that takes BodyWrapper instance as parameter
        let response = await currenciesOperations.updateBaseCurrency(request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected BaseCurrencyActionWrapper instance is received
                if (responseObject instanceof BaseCurrencyActionWrapper) {
                    //Get the received obtained ActionResponse instances
                    let actionResponse = responseObject.getBaseCurrency();

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
     * <h3> Get Currency </h3>
     * This method is used to get the details of a specific currency.
     * @param {BigInt} currencyId Specify the unique ID of the currency.
     */
    static async getCurrency(currencyId) {
        //example
        //let currencyId = 1001n;

        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Call getCurrency method that takes currencyId as parameter
        let response = await currenciesOperations.getCurrency(currencyId);

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
                //Check if expected ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Currency instances
                    let currencies = responseObject.getCurrencies();

                    currencies.forEach(currency => {
                        //Get the Id of each currency
                        console.log("Currency Id: " + currency.getId());

                        //Get the IsoCode of each currency
                        console.log("Currency IsoCode: " + currency.getIsoCode());

                        //Get the Symbol of each currency
                        console.log("Currency Symbol: " + currency.getSymbol());

                        //Get the CreatedTime of each currency
                        console.log("Currency CreatedTime: " + currency.getCreatedTime());

                        //Get if the currency is active
                        console.log("Currency IsActive: " + currency.getIsActive().toString());

                        //Get the ExchangeRate of each currency
                        console.log("Currency ExchangeRate: " + currency.getExchangeRate());

                        //Get the format instance of each currency
                        let format = currency.getFormat();

                        if (format != null) {
                            //Get the DecimalSeparator of the Format
                            console.log("Currency Format DecimalSeparator: " + format.getDecimalSeparator().getValue());

                            //Get the ThousandSeparator of the Format
                            console.log("Currency Format ThousandSeparator: " + format.getThousandSeparator().getValue());

                            //Get the DecimalPlaces of the Format
                            console.log("Currency Format DecimalPlaces: " + format.getDecimalPlaces().getValue());
                        }

                        //Get the createdBy User instance of each currency
                        let createdBy = currency.getCreatedBy();

                        //Check if createdBy is not null
                        if (createdBy != null) {
                            //Get the Name of the createdBy User
                            console.log("Currency CreatedBy User-Name: " + createdBy.getName());

                            //Get the ID of the createdBy User
                            console.log("Currency CreatedBy User-ID: " + createdBy.getId());
                        }

                        //Get the PrefixSymbol of each currency
                        console.log("Currency PrefixSymbol: " + currency.getPrefixSymbol().toString());

                        //Get the IsBase of each currency
                        console.log("Currency IsBase: " + currency.getIsBase().toString());

                        //Get the ModifiedTime of each currency
                        console.log("Currency ModifiedTime: " + currency.getModifiedTime());

                        //Get the Name of each currency
                        console.log("Currency Name: " + currency.getName());

                        //Get the modifiedBy User instance of each currency
                        let modifiedBy = currency.getModifiedBy();

                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            //Get the Name of the modifiedBy User
                            console.log("Currency ModifiedBy User-Name: " + modifiedBy.getName());

                            //Get the ID of the modifiedBy User
                            console.log("Currency ModifiedBy User-ID: " + modifiedBy.getId());
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
     * <h3> Update Currency </h3>
     * This method is used to update currency details.
     * @param {BigInt} currencyId Specify the unique ID of the currency.
     */
    static async updateCurrency(currencyId) {
        //example
        //let currencyId = 6011001n;

        //Get instance of CurrenciesOperations Class
        let currenciesOperations = new CurrenciesOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let request = new BodyWrapper();

        //Array to hold Currency instances
        let currencies = [];

        //Get instance of Currency Class
        let currency = new ZCRMCurrency();

        //To set the position of the ISO code in the currency.
        //true: Display ISO code before the currency value.
        //false: Display ISO code after the currency value.
        currency.setPrefixSymbol(true);

        //To set the rate at which the currency has to be exchanged for home currency.
        currency.setExchangeRate("5.00");

        //To set the status of the currency.
        //true: The currency is active.
        //false: The currency is inactive.
        currency.setIsActive(true);

        let format = new Format();

        //It can be a Period or Comma, depending on the currency.
        format.setDecimalSeparator(new Choice("Period"));

        //It can be a Period, Comma, or Space, depending on the currency.
        format.setThousandSeparator(new Choice("Comma"));

        //To set the number of decimal places allowed for the currency. It can be 0, 2, or 3.
        format.setDecimalPlaces(new Choice("2"));

        //To set the format of the currency
        currency.setFormat(format);

        //Add the Currency instance to the array
        currencies.push(currency);

        //Set the array to Currency in BodyWrapper instance
        request.setCurrencies(currencies);

        //Call updateCurrency method that takes BodyWrapper instance and currencyId as parameters
        let response = await currenciesOperations.updateCurrency(currencyId, request);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getCurrencies();

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

module.exports = { Currency }