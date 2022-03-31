const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in Japan Domain.
 * @extends DataCenter
 */
class JPDataCenter extends DataCenter {

    static _PRODUCTION;

    static _SANDBOX;

    static _DEVELOPER;

    static JP = new JPDataCenter();

    /**
     * This method represents the Zoho CRM Production environment in Japan domain
     * @returns {Environment} An instance of Environment
     */
    static PRODUCTION() {

        if (this._PRODUCTION == null) {
            this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.jp", this.JP.getIAMUrl(), this.JP.getFileUploadUrl(), "jp_prd");
        }

        return this._PRODUCTION;
    }

    /**
     * This method represents the Zoho CRM Sandbox environment in Japan domain
     * @returns {Environment} An instance of Environment
     */
    static SANDBOX() {
        if (this._SANDBOX == null) {
            this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.jp", this.JP.getIAMUrl(), this.JP.getFileUploadUrl(), "jp_sdb");
        }

        return this._SANDBOX;
    }

    /**
     * This method represents the Zoho CRM Developer environment in Japan domain
     * @returns {Environment} An instance of Environment
     */
    static DEVELOPER() {
        if (this._DEVELOPER == null) {
            this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.jp", this.JP.getIAMUrl(), this.JP.getFileUploadUrl(), "jp_dev");
        }

        return this._DEVELOPER;
    }

    getIAMUrl() {
        return "https://accounts.zoho.jp/oauth/v2/token";
    }

    getFileUploadUrl() {
        return "https://content.zohoapis.jp"
    }
}

module.exports = {
    MasterModel: JPDataCenter,
    JPDataCenter: JPDataCenter
}