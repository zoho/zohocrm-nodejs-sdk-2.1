const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ResponseWrapper{

	taxes;
	preference;
	keyModified = new Map();
	/**
	 * The method to get the taxes
	 * @returns {Array} An Array representing the taxes
	 */
	getTaxes()	{
		return this.taxes;

	}

	/**
	 * The method to set the value to taxes
	 * @param {Array} taxes An Array representing the taxes
	 */
	setTaxes(taxes)	{
		if((taxes != null) && (!(Object.prototype.toString.call(taxes) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: taxes EXPECTED TYPE: Array", null, null);
		}
		this.taxes = taxes;
		this.keyModified.set("taxes", 1);

	}

	/**
	 * The method to get the preference
	 * @returns {Preference} An instance of Preference
	 */
	getPreference()	{
		return this.preference;

	}

	/**
	 * The method to set the value to preference
	 * @param {Preference} preference An instance of Preference
	 */
	setPreference(preference)	{
		const Preference = require("./preference").MasterModel;
		if((preference != null) && (!(preference instanceof Preference)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: preference EXPECTED TYPE: Preference", null, null);
		}
		this.preference = preference;
		this.keyModified.set("preference", 1);

	}

	/**
	 * The method to check if the user has modified the given key
	 * @param {String} key A String representing the key
	 * @returns {number} A number representing the modification
	 */
	isKeyModified(key)	{
		if((key != null) && (!(Object.prototype.toString.call(key) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: key EXPECTED TYPE: String", null, null);
		}
		if(this.keyModified.has(key))	{
			return this.keyModified.get(key);
		}
		return null;

	}

	/**
	 * The method to mark the given key as modified
	 * @param {String} key A String representing the key
	 * @param {number} modification A number representing the modification
	 */
	setKeyModified(key, modification)	{
		if((key != null) && (!(Object.prototype.toString.call(key) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: key EXPECTED TYPE: String", null, null);
		}
		if((modification != null) && (!(Object.prototype.toString.call(modification) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modification EXPECTED TYPE: number", null, null);
		}
		this.keyModified.set(key, modification);

	}

}
module.exports = {
	MasterModel : ResponseWrapper,
	ResponseWrapper : ResponseWrapper
}
