const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class RequestWrapper{

	characterEncoding;
	operation;
	callback;
	resource;
	keyModified = new Map();
	/**
	 * The method to get the characterEncoding
	 * @returns {String} A String representing the characterEncoding
	 */
	getCharacterEncoding()	{
		return this.characterEncoding;

	}

	/**
	 * The method to set the value to characterEncoding
	 * @param {String} characterEncoding A String representing the characterEncoding
	 */
	setCharacterEncoding(characterEncoding)	{
		if((characterEncoding != null) && (!(Object.prototype.toString.call(characterEncoding) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: characterEncoding EXPECTED TYPE: String", null, null);
		}
		this.characterEncoding = characterEncoding;
		this.keyModified.set("character_encoding", 1);

	}

	/**
	 * The method to get the operation
	 * @returns {Choice} An instance of Choice
	 */
	getOperation()	{
		return this.operation;

	}

	/**
	 * The method to set the value to operation
	 * @param {Choice} operation An instance of Choice
	 */
	setOperation(operation)	{
		if((operation != null) && (!(operation instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: operation EXPECTED TYPE: Choice", null, null);
		}
		this.operation = operation;
		this.keyModified.set("operation", 1);

	}

	/**
	 * The method to get the callback
	 * @returns {CallBack} An instance of CallBack
	 */
	getCallback()	{
		return this.callback;

	}

	/**
	 * The method to set the value to callback
	 * @param {CallBack} callback An instance of CallBack
	 */
	setCallback(callback)	{
		const CallBack = require("./call_back").MasterModel;
		if((callback != null) && (!(callback instanceof CallBack)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: callback EXPECTED TYPE: CallBack", null, null);
		}
		this.callback = callback;
		this.keyModified.set("callback", 1);

	}

	/**
	 * The method to get the resource
	 * @returns {Array} An Array representing the resource
	 */
	getResource()	{
		return this.resource;

	}

	/**
	 * The method to set the value to resource
	 * @param {Array} resource An Array representing the resource
	 */
	setResource(resource)	{
		if((resource != null) && (!(Object.prototype.toString.call(resource) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: resource EXPECTED TYPE: Array", null, null);
		}
		this.resource = resource;
		this.keyModified.set("resource", 1);

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
	MasterModel : RequestWrapper,
	RequestWrapper : RequestWrapper
}
