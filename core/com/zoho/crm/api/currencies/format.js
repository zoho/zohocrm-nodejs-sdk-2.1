const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Format{

	decimalSeparator;
	thousandSeparator;
	decimalPlaces;
	keyModified = new Map();
	/**
	 * The method to get the decimalSeparator
	 * @returns {Choice} An instance of Choice
	 */
	getDecimalSeparator()	{
		return this.decimalSeparator;

	}

	/**
	 * The method to set the value to decimalSeparator
	 * @param {Choice} decimalSeparator An instance of Choice
	 */
	setDecimalSeparator(decimalSeparator)	{
		if((decimalSeparator != null) && (!(decimalSeparator instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: decimalSeparator EXPECTED TYPE: Choice", null, null);
		}
		this.decimalSeparator = decimalSeparator;
		this.keyModified.set("decimal_separator", 1);

	}

	/**
	 * The method to get the thousandSeparator
	 * @returns {Choice} An instance of Choice
	 */
	getThousandSeparator()	{
		return this.thousandSeparator;

	}

	/**
	 * The method to set the value to thousandSeparator
	 * @param {Choice} thousandSeparator An instance of Choice
	 */
	setThousandSeparator(thousandSeparator)	{
		if((thousandSeparator != null) && (!(thousandSeparator instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: thousandSeparator EXPECTED TYPE: Choice", null, null);
		}
		this.thousandSeparator = thousandSeparator;
		this.keyModified.set("thousand_separator", 1);

	}

	/**
	 * The method to get the decimalPlaces
	 * @returns {Choice} An instance of Choice
	 */
	getDecimalPlaces()	{
		return this.decimalPlaces;

	}

	/**
	 * The method to set the value to decimalPlaces
	 * @param {Choice} decimalPlaces An instance of Choice
	 */
	setDecimalPlaces(decimalPlaces)	{
		if((decimalPlaces != null) && (!(decimalPlaces instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: decimalPlaces EXPECTED TYPE: Choice", null, null);
		}
		this.decimalPlaces = decimalPlaces;
		this.keyModified.set("decimal_places", 1);

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
	MasterModel : Format,
	Format : Format
}
