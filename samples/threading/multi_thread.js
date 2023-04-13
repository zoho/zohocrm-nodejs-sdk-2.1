import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class Record {
    static async call() {
        /*
         * Create an instance of Logger Class that takes two parameters
         * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
         * filePath -> Absolute file path, where messages need to be logged.
         */
        let logger = new ZOHOCRMSDK.LogBuilder()
            .level(ZOHOCRMSDK.Levels.INFO)
            .filePath("/Users/Documents/file/final-logs.log")
            .build();
        /*
        * Create an UserSignature instance that takes user Email as parameter
        */
        let user1 = new ZOHOCRMSDK.UserSignature("abc1@zoho.com");
        /*
        * Configure the environment
        * which is of the pattern Domain.Environment
        * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
        * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
        */
        let environment1 = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        /*
        * Create a Token instance
        * clientId -> OAuth client id.
        * clientSecret -> OAuth client secret.
        * grantToken -> OAuth Grant Token. 
        * refreshToken -> OAuth Refresh Token token.
        * redirectURL -> OAuth Redirect URL.
        */
        let token1 = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("clientId")
            .clientSecret("clientSecret")
            // .grantToken("grantToken")
            .refreshToken("refreshToken")
            .redirectURL("https://www.zoho.com")
            .build();
        /*
        * Create an instance of TokenStore.
        * 1 -> DataBase host name. Default "localhost"
        * 2 -> DataBase name. Default "zohooauth"
        * 3 -> DataBase user name. Default "root"
        * 4 -> DataBase password. Default ""
        * 5 -> DataBase port number. Default "3306"
        */
        // let tokenstore = new ZOHOCRMSDK.DBBuilder().build();
        //
        /*
        * Create an instance of FileStore that takes absolute file path as parameter
        */
        let tokenstore = new ZOHOCRMSDK.FileStore("/Users/Documents/file/nodejs_sdk_tokens.txt");
        /*
        * A Boolean value to allow or prevent auto-refreshing of the modules' fields in the background.
        * if true - all the modules' fields will be auto-refreshed in the background whenever there is any change.
        * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or the specific module's fields using methods from ModuleFieldsHandler
        */
        let sdkConfig1 = new ZOHOCRMSDK.SDKConfigBuilder()
            .autoRefreshFields(false)
            .pickListValidation(true)
            .build();
        /*
        * The path containing the absolute directory path to store user specific JSON files containing module fields information. 
        */
        let resourcePath = "/Users/Documents/file";
        // let proxyBuilder = new ProxyBuilder().host().port()
        /*
        * Call the static initialize method of Initializer class that takes the following arguments
        * user -> UserSignature instance
        * environment -> Environment instance
        * token -> Token instance
        * store -> TokenStore instance
        * SDKConfig -> SDKConfig instance
        * resourcePath -> resourcePath
        * logger -> Logger instance
        */
        try {
            (await new ZOHOCRMSDK.InitializeBuilder())
                .user(user1)
                .environment(environment1)
                .token(token1)
                .store(tokenstore)
                .SDKConfig(sdkConfig1)
                .resourcePath(resourcePath)
                .logger(logger)
                .initialize();
        } catch (error) {
            console.log(error);
        }
        await Record.getRecords("Leads");
        // await Initializer.removeUserConfiguration(user1, environment1);
        let user2 = new ZOHOCRMSDK.UserSignature("abc2@zoho.eu");
        let environment2 = ZOHOCRMSDK.EUDataCenter.SANDBOX();
        let token2 = new ZOHOCRMSDK.OAuthBuilder()
            .clientId("clientId")
            .clientSecret("clientSecret")
            .refreshToken("refreshToken")
            .redirectURL("https://www.zoho.com")
            .build();
        let sdkConfig2 = new ZOHOCRMSDK.SDKConfigBuilder().autoRefreshFields(false).pickListValidation(true).build();
        (await new ZOHOCRMSDK.InitializeBuilder())
            .user(user2)
            .environment(environment2)
            .token(token2)
            .SDKConfig(sdkConfig2)
            .switchUser();
        await Record.getRecords("Leads");
    }
    static async getRecords(moduleAPIName) {
        try {
            //Get instance of RecordOperations Class
            let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
            let paramInstance = new ZOHOCRMSDK.ParameterMap();
            await paramInstance.add(ZOHOCRMSDK.Records.GetRecordsParam.APPROVED, "both");
            let headerInstance = new ZOHOCRMSDK.HeaderMap();
            await headerInstance.add(ZOHOCRMSDK.Records.GetRecordsHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T00:00:00+05:30"));
            //Call getRecords method that takes paramInstance, headerInstance and moduleAPIName as parameters
            let response = await recordOperations.getRecords(moduleAPIName, paramInstance, headerInstance);
            if (response != null) {
                //Get the status code from response
                console.log("Status Code: " + response.statusCode);
                if ([204, 304].includes(response.statusCode)) {
                    console.log(response.statusCode == 204 ? "No Content" : "Not Modified");
                    return;
                }
                //Get the object from response
                let responseObject = response.object;
                if (responseObject != null) {
                    //Check if expected ResponseWrapper instance is received
                    if (responseObject instanceof ZOHOCRMSDK.Records.ResponseWrapper) {
                        //Get the array of obtained Record instances
                        let records = responseObject.getData();
                        for (let index = 0; index < records.length; index++) {
                            let record = records[index];
                            //Get the ID of each Record
                            console.log("Record ID: " + record.getId());
                            //Get the createdBy User instance of each Record
                            let createdBy = record.getCreatedBy();
                            //Check if createdBy is not null
                            if (createdBy != null) {
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
                                    console.log("Record Tag Name: " + tag.getName());
                                    //Get the Id of each Tag
                                    console.log("Record Tag ID: " + tag.getId());
                                });
                            }
                            //Get all the values
                            let keyValues = record.getKeyValues();
                            let keyArray = Array.from(keyValues.keys());
                            for (let keyIndex = 0; keyIndex < keyArray.length; keyIndex++) {
                                const keyName = keyArray[keyIndex];
                                let value = keyValues.get(keyName);
                                console.log(keyName + " : " + value);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
Record.call();
