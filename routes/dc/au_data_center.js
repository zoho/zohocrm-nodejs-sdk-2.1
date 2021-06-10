const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in AU Domain.
 * @extends DataCenter
 */
class AUDataCenter extends DataCenter {

    static _PRODUCTION;

    static _SANDBOX;

    static _DEVELOPER;

    static AU = new AUDataCenter();

    /**
     * This method represents the Zoho CRM Production environment in AU domain
     * @returns {Environment} An instance of Environment
     */
    static PRODUCTION() {

        if (this._PRODUCTION == null) {
            this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com.au", this.AU.getIAMUrl(), this.AU.getFileUploadUrl(), "au_prd");
        }

        return this._PRODUCTION;
    }

    /**
     * This method represents the Zoho CRM Sandbox environment in AU domain
     * @returns {Environment} An instance of Environment
     */
    static SANDBOX() {
        if (this._SANDBOX == null) {
            this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com.au", this.AU.getIAMUrl(), this.AU.getFileUploadUrl(), "au_sdb");
        }

        return this._SANDBOX;
    }

    /**
     * This method represents the Zoho CRM Developer environment in AU domain
     * @returns {Environment} An instance of Environment
     */
    static DEVELOPER() {
        if (this._DEVELOPER == null) {
            this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com.au", this.AU.getIAMUrl(), this.AU.getFileUploadUrl(), "au_dev");
        }

        return this._DEVELOPER;
    }

    getIAMUrl() {
        return "https://accounts.zoho.com.au/oauth/v2/token";
    }

    getFileUploadUrl() {
        return "https://content.zohoapis.com.au"
    }
}

module.exports = {
    MasterModel: AUDataCenter,
    AUDataCenter: AUDataCenter
}