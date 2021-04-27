const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in AU Domain.
 * @extends DataCenter
 */
class AUDataCenter extends DataCenter{

	static _PRODUCTION;

	static _SANDBOX;

    static _DEVELOPER;

    static AU = new AUDataCenter();

    /**
     * This method represents the Zoho CRM Production environment in AU domain
     * @returns {Environment} An instance of Environment
     */
	static PRODUCTION(){

        if(AUDataCenter._PRODUCTION  == null){
            AUDataCenter._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com.au", AUDataCenter.AU.getIAMUrl(), AUDataCenter.AU.getFileUploadUrl(), "au_prd");
        }

        return AUDataCenter._PRODUCTION;
    }

    /**
     * This method represents the Zoho CRM Sandbox environment in AU domain
     * @returns {Environment} An instance of Environment
     */
    static SANDBOX(){
        if(AUDataCenter._SANDBOX == null){
            AUDataCenter._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com.au", AUDataCenter.AU.getIAMUrl(), AUDataCenter.AU.getFileUploadUrl(), "au_sdb");
        }

        return AUDataCenter._SANDBOX;
    }

    /**
     * This method represents the Zoho CRM Developer environment in AU domain
     * @returns {Environment} An instance of Environment
     */
    static DEVELOPER(){
        if(AUDataCenter._DEVELOPER == null){
            AUDataCenter._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com.au", AUDataCenter.AU.getIAMUrl(), AUDataCenter.AU.getFileUploadUrl(), "au_dev");
        }

        return AUDataCenter._DEVELOPER;
    }

    getIAMUrl(){
		return "https://accounts.zoho.com.au/oauth/v2/token";
    }

    getFileUploadUrl(){
        return "https://content.zohoapis.com.au"
    }
}

module.exports = {
    MasterModel : AUDataCenter,
    AUDataCenter : AUDataCenter
}