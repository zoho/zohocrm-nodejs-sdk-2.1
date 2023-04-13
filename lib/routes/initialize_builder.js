import { UserSignature } from "./user_signature.js";

import { Constants } from "../utils/util/constants.js";

import { Utility } from "../utils/util/utility.js";

import { SDKException } from "../core/com/zoho/crm/api/exception/sdk_exception.js";

import { Token } from "../models/authenticator/token.js";

import { TokenStore } from "../models/authenticator/store/token_store.js";

import { SDKConfig } from "./sdk_config.js";

import { Environment } from "./dc/environment.js";

import { Initializer } from "./initializer.js";

import { statSync } from "fs";

import { join } from "path";

import { Logger, Levels } from "./logger/logger.js";

import { LogBuilder } from "./logger/log_builder.js";

import { SDKConfigBuilder } from "./sdk_config_builder.js";

import { FileStore } from "../models/authenticator/store/file_store.js";

import { RequestProxy } from "./request_proxy.js";

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".",import.meta.url));

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
      this.initializer = await Initializer.getInitializer().catch(err=>{throw err;});

      this.errorMessage =
          (await this.initializer) != null
              ? Constants.SWITCH_USER_ERROR
              : Constants.INITIALIZATION_ERROR;

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
    Utility.assertNotNull(
        this._user,
        this.errorMessage,
        Constants.USER_SIGNATURE_ERROR_MESSAGE
    );

    Utility.assertNotNull(
        this._environment,
        this.errorMessage,
        Constants.ENVIRONMENT_ERROR_MESSAGE
    );

    Utility.assertNotNull(
        this._token,
        this.errorMessage,
        Constants.TOKEN_ERROR_MESSAGE
    );

    if (this._store == null) {
      this._store = new FileStore(
          join(__dirname, "../../../../../", Constants.TOKEN_FILE)
      );
    }

    if (this._sdkConfig == null) {
      this._sdkConfig = new SDKConfigBuilder().build();
    }

    if (this._resourcePath == null) {
      this._resourcePath = join(__dirname, "../../../../../", "");
    }

    if (this._logger == null) {
      this._logger = new LogBuilder()
          .level(Levels.INFO)
          .filePath(join(__dirname, "../../../../../", Constants.LOG_FILE_NAME))
          .build();
    }

    Initializer.initialize(
        this._user,
        this._environment,
        this._token,
        this._store,
        this._sdkConfig,
        this._resourcePath,
        this._logger,
        this._requestProxy
    );
  }

  switchUser() {
    Utility.assertNotNull(
        Initializer.getInitializer(),
        Constants.SDK_UNINITIALIZATION_ERROR,
        Constants.SDK_UNINITIALIZATION_MESSAGE
    );

    Initializer.switchUser(
        this._user,
        this._environment,
        this._token,
        this._sdkConfig,
        this._requestProxy
    );
  }

  logger(logger) {
    if (logger != null && !(logger instanceof Logger)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.LOGGER;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = Logger.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._logger = logger;

    return this;
  }

  token(token) {
    Utility.assertNotNull(
        token,
        this.errorMessage,
        Constants.TOKEN_ERROR_MESSAGE
    );

    if (!(token instanceof Token)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.TOKEN;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = Token.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._token = token;

    return this;
  }

  SDKConfig(sdkConfig) {
    if (sdkConfig != null && !(sdkConfig instanceof SDKConfig)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.SDK_CONFIG;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = SDKConfig.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._sdkConfig = sdkConfig;

    return this;
  }

  requestProxy(requestProxy) {
    if (requestProxy != null && !(requestProxy instanceof RequestProxy)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.REQUEST_PROXY;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = RequestProxy.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._requestProxy = requestProxy;

    return this;
  }

  resourcePath(resourcePath) {
    if (resourcePath != null && !statSync(resourcePath).isDirectory()) {
      throw new SDKException(
          this.errorMessage,
          Constants.RESOURCE_PATH_INVALID_ERROR_MESSAGE
      );
    }

    this._resourcePath = resourcePath;

    return this;
  }

  user(user) {
    Utility.assertNotNull(
        user,
        this.errorMessage,
        Constants.USER_SIGNATURE_ERROR_MESSAGE
    );

    if (!(user instanceof UserSignature)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.USER;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = UserSignature.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._user = user;

    return this;
  }

  store(store) {
    if (store != null && !(store instanceof TokenStore)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.STORE;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = Store.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._store = store;

    return this;
  }

  environment(environment) {
    Utility.assertNotNull(
        environment,
        this.errorMessage,
        Constants.ENVIRONMENT_ERROR_MESSAGE
    );

    if (!(environment instanceof Environment)) {
      let error = {};

      error[Constants.ERROR_HASH_FIELD] = Constants.ENVIRONMENT;

      error[Constants.ERROR_HASH_EXPECTED_TYPE] = Environment.name;

      throw new SDKException(
          Constants.INITIALIZATION_ERROR,
          Constants.INITIALIZATION_EXCEPTION,
          error
      );
    }

    this._environment = environment;

    return this;
  }
}

export {
  InitializeBuilder as InitializeBuilder,
  InitializeBuilder as MasterModel
}
