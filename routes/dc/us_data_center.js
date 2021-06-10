const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in US Domain.
 */
class USDataCenter extends DataCenter {

	static _PRODUCTION;

	static _SANDBOX;

	static _DEVELOPER;

	static US = new USDataCenter();

	/**
	 * This method represents the Zoho CRM Production environment in US domain
	 * @returns {Environment} An instance of Environment
	 */
	static PRODUCTION() {
		if (this._PRODUCTION == null) {
			this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.com", this.US.getIAMUrl(), this.US.getFileUploadUrl(), "us_prd");
		}

		return this._PRODUCTION;
	}

	/**
	 * This method represents the Zoho CRM Sandbox environment in US domain
	 * @returns {Environment} An instance of Environment
	 */
	static SANDBOX() {
		if (this._SANDBOX == null) {
			this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.com", this.US.getIAMUrl(), this.US.getFileUploadUrl(), "us_sdb");
		}

		return this._SANDBOX;
	}

	/**
	 * This method represents the Zoho CRM Developer environment in US domain
	 * @returns {Environment} An instance of Environment
	 */
	static DEVELOPER() {
		if (this._DEVELOPER == null) {
			this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.com", this.US.getIAMUrl(), this.US.getFileUploadUrl(), "us_dev");
		}

		return this._DEVELOPER;
	}

	getIAMUrl() {
		return "https://accounts.zoho.com/oauth/v2/token";
	}

	getFileUploadUrl() {
		return "https://content.zohoapis.com"
	}
}

module.exports = {
	MasterModel: USDataCenter,
	USDataCenter: USDataCenter
}