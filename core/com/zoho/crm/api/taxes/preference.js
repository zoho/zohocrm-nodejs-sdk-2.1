const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Preference{

	autoPopulateTax;
	modifyTaxRates;
	keyModified = new Map();
	/**
	 * The method to get the autoPopulateTax
	 * @returns {Boolean} A Boolean representing the autoPopulateTax
	 */
	getAutoPopulateTax()	{
		return this.autoPopulateTax;

	}

	/**
	 * The method to set the value to autoPopulateTax
	 * @param {Boolean} autoPopulateTax A Boolean representing the autoPopulateTax
	 */
	setAutoPopulateTax(autoPopulateTax)	{
		if((autoPopulateTax != null) && (!(Object.prototype.toString.call(autoPopulateTax) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: autoPopulateTax EXPECTED TYPE: Boolean", null, null);
		}
		this.autoPopulateTax = autoPopulateTax;
		this.keyModified.set("auto_populate_tax", 1);

	}

	/**
	 * The method to get the modifyTaxRates
	 * @returns {Boolean} A Boolean representing the modifyTaxRates
	 */
	getModifyTaxRates()	{
		return this.modifyTaxRates;

	}

	/**
	 * The method to set the value to modifyTaxRates
	 * @param {Boolean} modifyTaxRates A Boolean representing the modifyTaxRates
	 */
	setModifyTaxRates(modifyTaxRates)	{
		if((modifyTaxRates != null) && (!(Object.prototype.toString.call(modifyTaxRates) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modifyTaxRates EXPECTED TYPE: Boolean", null, null);
		}
		this.modifyTaxRates = modifyTaxRates;
		this.keyModified.set("modify_tax_rates", 1);

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
	MasterModel : Preference,
	Preference : Preference
}
