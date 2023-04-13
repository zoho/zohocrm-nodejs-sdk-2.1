import {SDKConfig} from "./sdk_config.js";

class SDKConfigBuilder {
    _autoRefreshFields = false;

    _pickListValidation = true;

    _timeout = 0;

    /**
     * This is a setter method to set autoRefreshFields.
     * @param {Boolean} autoRefreshFields A boolean value
     * @returns {SDKConfigBuilder} An instance of SDKConfigBuilder
     */
    autoRefreshFields(autoRefreshFields) {
        this._autoRefreshFields = autoRefreshFields;

        return this;
    }

    /**
     * This is a setter method to set pickListValidation.
     * @param {Boolean} pickListValidation A boolean value
     * @returns {SDKConfigBuilder} An instance of SDKConfigBuilder
     */
    pickListValidation(pickListValidation) {
        this._pickListValidation = pickListValidation;

        return this;
    }

    /**
     * This is a setter method to set API timeout.
     * @param {number} timeout
     * @returns {SDKConfigBuilder} An instance of SDKConfigBuilder
     */
    timeout(timeout) {
        this._timeout = timeout > 0 ? timeout : 0;

        return this;
    }

    /**
     * The method to build the SDKConfig instance
     * @returns {SDKConfig} An instance of SDKConfig
     */
    build() {
        return new SDKConfig(this._autoRefreshFields, this._pickListValidation, this._timeout);
    }
}

export {
    SDKConfigBuilder as SDKConfigBuilder,
    SDKConfigBuilder as MasterModel
}