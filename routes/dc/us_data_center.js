const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in US Domain.
 */
class USDataCenter extends DataCenter{

	static _PRODUCTION;

	static _SANDBOX;

	static _DEVELOPER;

	static US = new USDataCenter();

	/**
     * This method represents the Zoho CRM Production environment in US domain
     * @returns {Environment} An instance of Environment
     */
	static PRODUCTION(){
		if(USDataCenter._PRODUCTION  == null){
            USDataCenter._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com", USDataCenter.US.getIAMUrl(), USDataCenter.US.getFileUploadUrl(), "us_prd");
		}

        return USDataCenter._PRODUCTION;
	}

	/**
     * This method represents the Zoho CRM Sandbox environment in US domain
     * @returns {Environment} An instance of Environment
     */
	static SANDBOX(){
		if(USDataCenter._SANDBOX == null){
            USDataCenter._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com", USDataCenter.US.getIAMUrl(), USDataCenter.US.getFileUploadUrl(), "us_sdb");
		}

        return USDataCenter._SANDBOX;
	}

	/**
     * This method represents the Zoho CRM Developer environment in US domain
     * @returns {Environment} An instance of Environment
     */
	static DEVELOPER(){
		if(USDataCenter._DEVELOPER == null){
            USDataCenter._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com", USDataCenter.US.getIAMUrl(), USDataCenter.US.getFileUploadUrl(), "us_dev");
		}

        return USDataCenter._DEVELOPER;
	}

	getIAMUrl(){
		return "https://accounts.zoho.com/oauth/v2/token";
	}

	getFileUploadUrl(){
        return "https://content.zohoapis.com"
    }
}

module.exports = {
    MasterModel : USDataCenter,
    USDataCenter : USDataCenter
}