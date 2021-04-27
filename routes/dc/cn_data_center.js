const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in CN Domain.
 */
class CNDataCenter extends DataCenter{

    static _PRODUCTION;

	static _SANDBOX;

    static _DEVELOPER;

    static CN = new CNDataCenter();

    /**
     * This method represents the Zoho CRM Production environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static PRODUCTION(){
        if(CNDataCenter._PRODUCTION == null){
            CNDataCenter._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com.cn", CNDataCenter.CN.getIAMUrl(), CNDataCenter.CN.getFileUploadUrl(), "cn_prd");
        }

        return CNDataCenter._PRODUCTION;
    }

    /**
     *  This method represents the Zoho CRM Sandbox environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static SANDBOX(){
        if(CNDataCenter._SANDBOX == null){
            CNDataCenter._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com.cn", CNDataCenter.CN.getIAMUrl(), CNDataCenter.CN.getFileUploadUrl(), "cn_sdb");
        }

        return CNDataCenter._SANDBOX;
    }

    /**
     *  This method represents the Zoho CRM Developer environment in CN domain
     * @returns {Environment} An instance of Environment
     */
    static DEVELOPER(){
        if (CNDataCenter._DEVELOPER == null){
            CNDataCenter._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com.cn", CNDataCenter.CN.getIAMUrl(), CNDataCenter.CN.getFileUploadUrl(), "cn_dev");
        }

        return CNDataCenter._DEVELOPER;
    }

    getIAMUrl(){
        return "https://accounts.zoho.com.cn/oauth/v2/token";
    }

    getFileUploadUrl(){
        return "https://content.zohoapis.com.cn"
    }
}

module.exports = {
    MasterModel : CNDataCenter,
    CNDataCenter : CNDataCenter
}