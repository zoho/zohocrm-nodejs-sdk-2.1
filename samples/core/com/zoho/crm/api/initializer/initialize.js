const InitializeBuilder = require("@zohocrm/nodejs-sdk-2.1/routes/initialize_builder").InitializeBuilder;
const OAuthBuilder = require("@zohocrm/nodejs-sdk-2.1/models/authenticator/oauth_builder").OAuthBuilder;
const UserSignature = require("@zohocrm/nodejs-sdk-2.1/routes/user_signature").UserSignature;
const { Levels } = require("@zohocrm/nodejs-sdk-2.1/routes/logger/logger");
const LogBuilder = require("@zohocrm/nodejs-sdk-2.1/routes/logger/log_builder").LogBuilder;
const USDataCenter = require("@zohocrm/nodejs-sdk-2.1/routes/dc/us_data_center").USDataCenter;
const DBBuilder = require("@zohocrm/nodejs-sdk-2.1/models/authenticator/store/db_builder").DBBuilder;
const FileStore = require("@zohocrm/nodejs-sdk-2.1/models/authenticator/store/file_store").FileStore;
const SDKConfigBuilder = require("@zohocrm/nodejs-sdk-2.1/routes/sdk_config_builder").SDKConfigBuilder;
const ProxyBuilder = require("@zohocrm/nodejs-sdk-2.1/routes/proxy_builder").ProxyBuilder;

class SDKInitializer {
    static async initializeSDK() {
        /*
         * Create an instance of Logger Class that takes two parameters
         * 1 -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
         * 2 -> Absolute file path, where messages need to be logged.
         */
        let logger = new LogBuilder()
            .level(Levels.INFO)
            .filePath("/Users/Documents/file/final-logs.txt")
            .build();

        /*
         * Create an UserSignature instance that takes user Email as parameter
         */
        let user = new UserSignature("user@zoho.com");

        /*
         * Configure the environment
         * which is of the pattern Domain.Environment
         * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
         * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
         */
        let environment = USDataCenter.PRODUCTION();

        /*
         * Create a Token instance
         * 1 -> OAuth client id.
         * 2 -> OAuth client secret.
         * 3 -> OAuth redirect URL.
         * 4 -> REFRESH/GRANT token.
         * 5 -> token type.
         */

        let token = new OAuthBuilder()
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
        let tokenstore = new DBBuilder()
            .build();

        /*
         * Create an instance of FileStore that takes absolute file path as parameter
         */
        // let tokenstore = new FileStore("/Users/Documents/file/nodejs_sdk_tokens.txt");

        /*
         * A Boolean value to allow or prevent auto-refreshing of the modules' fields in the background.
         * if true - all the modules' fields will be auto-refreshed in the background whenever there is any change.
         * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or the specific module's fields using methods from ModuleFieldsHandler
         */
        let sdkConfig = new SDKConfigBuilder()
            .autoRefreshFields(true)
            .pickListValidation(true)
            .build();

        /*
         * The path containing the absolute directory path to store user specific JSON files containing module fields information.
         */
        let resourcePath = "/Users/Documents/file";

        // let proxyBuilder = new ProxyBuilder().host().port()
        /*
         * Call the static initialize method of Initializer class that takes the following arguments
         * 1 -> UserSignature instance
         * 2 -> Environment instance
         * 3 -> Token instance
         * 4 -> TokenStore instance
         * 5 -> SDKConfig instance
         * 6 -> resourcePath
         * 7 -> Logger instance
         */
        try {
            (await new InitializeBuilder())
                .user(user)
                .environment(environment)
                .token(token)
                .store(tokenstore)
                .SDKConfig(sdkConfig)
                .resourcePath(resourcePath)
                .logger(logger)
                .initialize();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { SDKInitializer };