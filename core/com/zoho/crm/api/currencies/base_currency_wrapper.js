const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class BaseCurrencyWrapper{

	baseCurrency;
	keyModified = new Map();
	/**
	 * The method to get the baseCurrency
	 * @returns {Currency} An instance of Currency
	 */
	getBaseCurrency()	{
		return this.baseCurrency;

	}

	/**
	 * The method to set the value to baseCurrency
	 * @param {Currency} baseCurrency An instance of Currency
	 */
	setBaseCurrency(baseCurrency)	{
		const Currency = require("./currency").MasterModel;
		if((baseCurrency != null) && (!(baseCurrency instanceof Currency)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: baseCurrency EXPECTED TYPE: Currency", null, null);
		}
		this.baseCurrency = baseCurrency;
		this.keyModified.set("base_currency", 1);

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
	MasterModel : BaseCurrencyWrapper,
	BaseCurrencyWrapper : BaseCurrencyWrapper
}
