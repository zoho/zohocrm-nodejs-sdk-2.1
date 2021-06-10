const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class AutoNumber{

	prefix;
	suffix;
	startNumber;
	keyModified = new Map();
	/**
	 * The method to get the prefix
	 * @returns {String} A String representing the prefix
	 */
	getPrefix()	{
		return this.prefix;

	}

	/**
	 * The method to set the value to prefix
	 * @param {String} prefix A String representing the prefix
	 */
	setPrefix(prefix)	{
		if((prefix != null) && (!(Object.prototype.toString.call(prefix) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: prefix EXPECTED TYPE: String", null, null);
		}
		this.prefix = prefix;
		this.keyModified.set("prefix", 1);

	}

	/**
	 * The method to get the suffix
	 * @returns {String} A String representing the suffix
	 */
	getSuffix()	{
		return this.suffix;

	}

	/**
	 * The method to set the value to suffix
	 * @param {String} suffix A String representing the suffix
	 */
	setSuffix(suffix)	{
		if((suffix != null) && (!(Object.prototype.toString.call(suffix) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: suffix EXPECTED TYPE: String", null, null);
		}
		this.suffix = suffix;
		this.keyModified.set("suffix", 1);

	}

	/**
	 * The method to get the startNumber
	 * @returns {number} A number representing the startNumber
	 */
	getStartNumber()	{
		return this.startNumber;

	}

	/**
	 * The method to set the value to startNumber
	 * @param {number} startNumber A number representing the startNumber
	 */
	setStartNumber(startNumber)	{
		if((startNumber != null) && (!(Object.prototype.toString.call(startNumber) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: startNumber EXPECTED TYPE: number", null, null);
		}
		this.startNumber = startNumber;
		this.keyModified.set("start_number", 1);

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
	MasterModel : AutoNumber,
	AutoNumber : AutoNumber
}
