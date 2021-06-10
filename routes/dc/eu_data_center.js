const DataCenter = require("./data_center").DataCenter;

/**
 * This class represents the properties of Zoho CRM in EU Domain.
 * @extends DataCenter
 */
class EUDataCenter extends DataCenter {

	static _PRODUCTION;

	static _SANDBOX;

	static _DEVELOPER;

	static EU = new EUDataCenter();

	/**
	 * This method represents the Zoho CRM Production environment in EU domain
	 * @returns {Environment} An instance of Environment
	 */
	static PRODUCTION() {
		if (this._PRODUCTION == null) {
			this._PRODUCTION = DataCenter.setEnvironment("https://www.zohoapis.eu", this.EU.getIAMUrl(), this.EU.getFileUploadUrl(), "eu_prd");
		}

		return this._PRODUCTION;
	};

	/**
	 *  This method represents the Zoho CRM Sandbox environment in EU domain
	 * @returns {Environment} An instance of Environment
	 */
	static SANDBOX() {
		if (this._SANDBOX == null) {
			this._SANDBOX = DataCenter.setEnvironment("https://sandbox.zohoapis.eu", this.EU.getIAMUrl(), this.EU.getFileUploadUrl(), "eu_sdb");
		}

		return this._SANDBOX;
	};

	/**
	 * This method represents the Zoho CRM Developer environment in EU domain
	 * @returns {Environment} An instance of Environment
	 */
	static DEVELOPER() {
		if (this._DEVELOPER == null) {
			this._DEVELOPER = DataCenter.setEnvironment("https://developer.zohoapis.eu", this.EU.getIAMUrl(), this.EU.getFileUploadUrl(), "eu_dev");
		}

		return this._DEVELOPER;
	};

	getIAMUrl() {
		return "https://accounts.zoho.eu/oauth/v2/token";
	}

	getFileUploadUrl() {
		return "https://content.zohoapis.eu"
	}
}

module.exports = {
	MasterModel: EUDataCenter,
	EUDataCenter: EUDataCenter
}