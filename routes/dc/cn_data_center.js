const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in CN Domain.
 */
class CNDataCenter extends DataCenter {

    static _PRODUCTION;

    static _SANDBOX;

    static _DEVELOPER;

    static CN = new CNDataCenter();

    /**
     * This method represents the Zoho CRM Production environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static PRODUCTION() {
        if (this._PRODUCTION == null) {
            this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com.cn", this.CN.getIAMUrl(), this.CN.getFileUploadUrl(), "cn_prd");
        }

        return this._PRODUCTION;
    }

    /**
     *  This method represents the Zoho CRM Sandbox environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static SANDBOX() {
        if (this._SANDBOX == null) {
            this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com.cn", this.CN.getIAMUrl(), this.CN.getFileUploadUrl(), "cn_sdb");
        }

        return this._SANDBOX;
    }

    /**
     *  This method represents the Zoho CRM Developer environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static DEVELOPER() {
        if (this._DEVELOPER == null) {
            this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com.cn", this.CN.getIAMUrl(), this.CN.getFileUploadUrl(), "cn_dev");
        }

        return this._DEVELOPER;
    }

    getIAMUrl() {
        return "https://accounts.zoho.com.cn/oauth/v2/token";
    }

    getFileUploadUrl() {
        return "https://content.zohoapis.com.cn"
    }
}

module.exports = {
    MasterModel: CNDataCenter,
    CNDataCenter: CNDataCenter
}