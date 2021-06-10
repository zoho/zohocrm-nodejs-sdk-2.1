const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Currency{

	roundingOption;
	precision;
	keyModified = new Map();
	/**
	 * The method to get the roundingOption
	 * @returns {String} A String representing the roundingOption
	 */
	getRoundingOption()	{
		return this.roundingOption;

	}

	/**
	 * The method to set the value to roundingOption
	 * @param {String} roundingOption A String representing the roundingOption
	 */
	setRoundingOption(roundingOption)	{
		if((roundingOption != null) && (!(Object.prototype.toString.call(roundingOption) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: roundingOption EXPECTED TYPE: String", null, null);
		}
		this.roundingOption = roundingOption;
		this.keyModified.set("rounding_option", 1);

	}

	/**
	 * The method to get the precision
	 * @returns {number} A number representing the precision
	 */
	getPrecision()	{
		return this.precision;

	}

	/**
	 * The method to set the value to precision
	 * @param {number} precision A number representing the precision
	 */
	setPrecision(precision)	{
		if((precision != null) && (!(Object.prototype.toString.call(precision) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: precision EXPECTED TYPE: number", null, null);
		}
		this.precision = precision;
		this.keyModified.set("precision", 1);

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
	MasterModel : Currency,
	Currency : Currency
}
