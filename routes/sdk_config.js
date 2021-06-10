/**
 * The class to configure the SDK.
 */
class SDKConfig {
    autoRefreshFields;

    pickListValidation;

    _timeout;

    /**
     * Creates an instance of SDKConfig with the given parameters
     * @param {Boolean} autoRefreshFields A boolean representing autoRefreshFields
     * @param {Boolean} pickListValidation A boolean representing pickListValidation
     * @param {number} timeout A Integer representing timeout
     */
    constructor(autoRefreshFields, pickListValidation, timeout) {
        this.autoRefreshFields = autoRefreshFields;

        this.pickListValidation = pickListValidation;

        this._timeout = timeout;
    }

    /**
     * This is a getter method to get autoRefreshFields.
     * @returns {Boolean} A boolean representing autoRefreshFields
     */
    getAutoRefreshFields() {
        return this.autoRefreshFields;
    }

    /**
     *  This is a getter method to get pickListValidation.
     * @returns {Boolean} A boolean representing pickListValidation
     */
    getPickListValidation() {
        return this.pickListValidation;
    }

    /**
     *  This is a getter method to get timeout.
     * @returns {number} A Integer representing API timeout
     */
    getTimeout() {
        return this._timeout;
    }
}

module.exports = {
    MasterModel: SDKConfig,
    SDKConfig: SDKConfig
}