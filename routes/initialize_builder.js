const UserSignature = require("./user_signature").UserSignature;

const Constants = require('../utils/util/constants').Constants;

const Utility = require("../utils/util/utility").Utility;

const SDKException = require("../core/com/zoho/crm/api/exception/sdk_exception").SDKException;

const Token = require("../models/authenticator/token").Token;

const TokenStore = require("../models/authenticator/store/token_store").TokenStore;

const SDKConfig = require('./sdk_config').SDKConfig;

const Environment = require("../routes/dc/environment").Environment;

const Initializer = require('./initializer').Initializer;

const fs = require("fs");

const path = require("path");

const { Logger, Levels } = require("./logger/logger");

const LogBuilder = require("./logger/log_builder").LogBuilder;

const SDKConfigBuilder = require("../routes/sdk_config_builder").SDKConfigBuilder;

const FileStore = require("../models/authenticator/store/file_store").FileStore;

const RequestProxy = require('./request_proxy').RequestProxy;

class InitializeBuilder {
    _environment;

    _store;

    _user;

    _token;

    _resourcePath;

    _requestProxy;

    _sdkConfig;

    _logger;

    errorMessage;

    initializer;

    constructor() {
        return (async () => {
            this.initializer = await Initializer.getInitializer();

            this.errorMessage = (await this.initializer != null) ? Constants.SWITCH_USER_ERROR : Constants.INITIALIZATION_ERROR;

            if (this.initializer != null) {
                this._user = await this.initializer.getUser();

                this._environment = await this.initializer.getEnvironment();

                this._token = await this.initializer.getToken();

                this._sdkConfig = await this.initializer.getSDKConfig();
            }
            return this;
        })();
    }

    initialize() {
        Utility.assertNotNull(this._user, this.errorMessage, Constants.USER_SIGNATURE_ERROR_MESSAGE);

        Utility.assertNotNull(this._environment, this.errorMessage, Constants.ENVIRONMENT_ERROR_MESSAGE);

        Utility.assertNotNull(this._token, this.errorMessage, Constants.TOKEN_ERROR_MESSAGE);

        if(this._store == null) {
            this._store = new FileStore(path.join(__dirname, "../../../../", Constants.TOKEN_FILE));
        }

        if(this._sdkConfig == null) {
            this._sdkConfig = new SDKConfigBuilder().build();
        }

        if(this._resourcePath == null) {
            this._resourcePath = path.join(__dirname, "../../../../", '');
        }

        if (this._logger == null) {
            this._logger = new LogBuilder().level(Levels.INFO).filePath(path.join(__dirname, "../../../../", Constants.LOG_FILE_NAME)).build();
        }
        
        Initializer.initialize(this._user, this._environment, this._token, this._store, this._sdkConfig, this._resourcePath, this._logger, this._requestProxy);
    }

    switchUser() {
        Utility.assertNotNull(Initializer.getInitializer(), Constants.SDK_UNINITIALIZATION_ERROR, Constants.SDK_UNINITIALIZATION_MESSAGE);

        Initializer.switchUser(this._user, this._environment, this._token, this._sdkConfig, this._requestProxy);
    }

    logger(logger) {
        if (logger != null && !(logger instanceof Logger)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.LOGGER;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Logger.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._logger = logger;

        return this;
    }

    token(token) {
        Utility.assertNotNull(token, this.errorMessage, Constants.TOKEN_ERROR_MESSAGE);

        if (!(token instanceof Token)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.TOKEN;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Token.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._token = token;

        return this;
    }

    SDKConfig(sdkConfig) {
        if (sdkConfig != null && !(sdkConfig instanceof SDKConfig)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.SDK_CONFIG;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = SDKConfig.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._sdkConfig = sdkConfig;

        return this;
    }

    requestProxy(requestProxy) {
        if (requestProxy != null && !(requestProxy instanceof RequestProxy)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.REQUEST_PROXY;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = RequestProxy.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._requestProxy = requestProxy;

        return this;
    }

    resourcePath(resourcePath) {
        if (resourcePath != null && !fs.statSync(resourcePath).isDirectory()) {
            throw new SDKException(this.errorMessage, Constants.RESOURCE_PATH_INVALID_ERROR_MESSAGE);
        }

        this._resourcePath = resourcePath;

        return this;
    }

    user(user) {
        Utility.assertNotNull(user, this.errorMessage, Constants.USER_SIGNATURE_ERROR_MESSAGE);

        if (!(user instanceof UserSignature)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.USER;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = UserSignature.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._user = user;

        return this;
    }

    store(store) {
       if (store != null && !(store instanceof TokenStore)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.STORE;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Store.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._store = store;

        return this;
    }

    environment(environment) {
        Utility.assertNotNull(environment, this.errorMessage, Constants.ENVIRONMENT_ERROR_MESSAGE);

        if (!(environment instanceof Environment)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.ENVIRONMENT;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Environment.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._environment = environment;

        return this;
    }
}

module.exports = {
    MasterModel: InitializeBuilder,
    InitializeBuilder: InitializeBuilder
}