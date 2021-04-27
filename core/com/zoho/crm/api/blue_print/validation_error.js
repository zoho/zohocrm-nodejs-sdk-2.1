const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ValidationError{

	apiName;
	infoMessage;
	message;
	index;
	parentAPIName;
	keyModified = new Map();
	/**
	 * The method to get the apiName
	 * @returns {String} A String representing the apiName
	 */
	getAPIName()	{
		return this.apiName;

	}

	/**
	 * The method to set the value to apiName
	 * @param {String} apiName A String representing the apiName
	 */
	setAPIName(apiName)	{
		if((apiName != null) && (!(Object.prototype.toString.call(apiName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: apiName EXPECTED TYPE: String", null, null);
		}
		this.apiName = apiName;
		this.keyModified.set("api_name", 1);

	}

	/**
	 * The method to get the infoMessage
	 * @returns {String} A String representing the infoMessage
	 */
	getInfoMessage()	{
		return this.infoMessage;

	}

	/**
	 * The method to set the value to infoMessage
	 * @param {String} infoMessage A String representing the infoMessage
	 */
	setInfoMessage(infoMessage)	{
		if((infoMessage != null) && (!(Object.prototype.toString.call(infoMessage) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: infoMessage EXPECTED TYPE: String", null, null);
		}
		this.infoMessage = infoMessage;
		this.keyModified.set("info_message", 1);

	}

	/**
	 * The method to get the message
	 * @returns {String} A String representing the message
	 */
	getMessage()	{
		return this.message;

	}

	/**
	 * The method to set the value to message
	 * @param {String} message A String representing the message
	 */
	setMessage(message)	{
		if((message != null) && (!(Object.prototype.toString.call(message) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: message EXPECTED TYPE: String", null, null);
		}
		this.message = message;
		this.keyModified.set("message", 1);

	}

	/**
	 * The method to get the index
	 * @returns {number} A number representing the index
	 */
	getIndex()	{
		return this.index;

	}

	/**
	 * The method to set the value to index
	 * @param {number} index A number representing the index
	 */
	setIndex(index)	{
		if((index != null) && (!(Object.prototype.toString.call(index) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: index EXPECTED TYPE: number", null, null);
		}
		this.index = index;
		this.keyModified.set("index", 1);

	}

	/**
	 * The method to get the parentapiName
	 * @returns {String} A String representing the parentAPIName
	 */
	getParentAPIName()	{
		return this.parentAPIName;

	}

	/**
	 * The method to set the value to parentapiName
	 * @param {String} parentAPIName A String representing the parentAPIName
	 */
	setParentAPIName(parentAPIName)	{
		if((parentAPIName != null) && (!(Object.prototype.toString.call(parentAPIName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: parentAPIName EXPECTED TYPE: String", null, null);
		}
		this.parentAPIName = parentAPIName;
		this.keyModified.set("parent_api_name", 1);

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
	MasterModel : ValidationError,
	ValidationError : ValidationError
}
