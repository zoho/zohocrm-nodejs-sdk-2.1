const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in IN Domain.
 * @extends DataCenter
 */
class INDataCenter extends DataCenter {

	static _PRODUCTION;

	static _SANDBOX;

	static _DEVELOPER;

	static IN = new INDataCenter();

	/**
	 * This method represents the Zoho CRM Production environment in IN domain
	 * @returns {Environment} An instance of Environment
	 */
	static PRODUCTION() {
		if (this._PRODUCTION == null) {
			this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.in", this.IN.getIAMUrl(), this.IN.getFileUploadUrl(), "in_prd");
		}

		return this._PRODUCTION;
	};

	/**
	 * This method represents the Zoho CRM Sandbox environment in IN domain
	 * @returns {Environment} An instance of Environment
	 */
	static SANDBOX() {
		if (this._SANDBOX == null) {
			this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.in", this.IN.getIAMUrl(), this.IN.getFileUploadUrl(), "in_sdb");
		}

		return this._SANDBOX;
	};

	/**
	 * This method represents the Zoho CRM Developer environment in IN domain
	 * @returns {Environment} An instance of Environment
	 */
	static DEVELOPER() {
		if (this._DEVELOPER == null) {
			this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.in", this.IN.getIAMUrl(), this.IN.getFileUploadUrl(), "in_dev");
		}

		return this._DEVELOPER;
	};

	getIAMUrl() {
		return "https://accounts.zoho.in/oauth/v2/token";
	}

	getFileUploadUrl() {
		return "https://content.zohoapis.in"
	}
}

module.exports = {
	MasterModel: INDataCenter,
	INDataCenter: INDataCenter
}