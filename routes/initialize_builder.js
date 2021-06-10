const UserSignature = require("./user_signature").UserSignature;

const Constants = require('../utils/util/constants').Constants;

const Utility = require("../utils/util/utility").Utility;

const SDKException = require("../core/com/zoho/crm/api/exception/sdk_exception").SDKException;

const Token = require("../models/authenticator/token").Token;

const TokenStore = require("../models/authenticator/store/token_store").TokenStore;

const SDKConfig = require('./sdk_config').SDKConfig;

const Environment = require("../routes/dc/environment").Environment;

const Initializer = require('./initializer').Initializer;

const loggerFile = require('./logger/logger');

const fs = require("fs");

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
        Utility.assertNotNull(this._user, this.errorMessage, Constants.USERSIGNATURE_ERROR_MESSAGE);

        Utility.assertNotNull(this._environment, this.errorMessage, Constants.ENVIRONMENT_ERROR_MESSAGE);

        Utility.assertNotNull(this._token, this.errorMessage, Constants.TOKEN_ERROR_MESSAGE);

        Utility.assertNotNull(this._store, this.errorMessage, Constants.STORE_ERROR_MESSAGE);

        Utility.assertNotNull(this._sdkConfig, this.errorMessage, Constants.SDK_CONFIG_ERROR_MESSAGE);

        Utility.assertNotNull(this._resourcePath, this.errorMessage, Constants.RESOURCE_PATH_ERROR_MESSAGE);

        if (this._logger == null) {
            this._logger = loggerFile.Logger.getInstance(loggerFile.Levels.INFO, path.join(__dirname, "..", Constants.LOGFILE_NAME));
        }

        Initializer.initialize(this._user, this._environment, this._token, this._store, this._sdkConfig, this._resourcePath, this._logger, this._requestProxy);
    }

    switchUser() {
        Utility.assertNotNull(Initializer.getInitializer(), Constants.SDK_UNINITIALIZATION_ERROR, Constants.SDK_UNINITIALIZATION_MESSAGE);

        Initializer.switchUser(this._user, this._environment, this._token, this._sdkConfig, this._requestProxy);
    }

    logger(logger) {
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
        Utility.assertNotNull(sdkConfig, this.errorMessage, Constants.SDK_CONFIG_ERROR_MESSAGE);

        if (!(sdkConfig instanceof SDKConfig)) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.SDK_CONFIG;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = SDKConfig.name;

            throw new SDKException(Constants.INITIALIZATION_ERROR, Constants.INITIALIZATION_EXCEPTION, error);
        }

        this._sdkConfig = sdkConfig;

        return this;
    }

    requestProxy(requestProxy) {
        this._requestProxy = requestProxy;

        return this;
    }

    resourcePath(resourcePath) {
        if (resourcePath == null || resourcePath.length <= 0) {
            throw new SDKException(this.errorMessage, Constants.RESOURCE_PATH_ERROR_MESSAGE);
        }

        if (!fs.statSync(resourcePath).isDirectory()) {
            throw new SDKException(this.errorMessage, Constants.RESOURCE_PATH_INVALID_ERROR_MESSAGE);
        }

        this._resourcePath = resourcePath;

        return this;
    }

    user(user) {
        Utility.assertNotNull(user, this.errorMessage, Constants.USERSIGNATURE_ERROR_MESSAGE);

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
        Utility.assertNotNull(store, this.errorMessage, Constants.STORE_ERROR_MESSAGE);

        if (!(store instanceof TokenStore)) {
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