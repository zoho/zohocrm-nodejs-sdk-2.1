const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class RequestWrapper{

	callback;
	query;
	fileType;
	keyModified = new Map();
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
	 * The method to get the query
	 * @returns {Query} An instance of Query
	 */
	getQuery()	{
		return this.query;

	}

	/**
	 * The method to set the value to query
	 * @param {Query} query An instance of Query
	 */
	setQuery(query)	{
		const Query = require("./query").MasterModel;
		if((query != null) && (!(query instanceof Query)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: query EXPECTED TYPE: Query", null, null);
		}
		this.query = query;
		this.keyModified.set("query", 1);

	}

	/**
	 * The method to get the fileType
	 * @returns {Choice} An instance of Choice
	 */
	getFileType()	{
		return this.fileType;

	}

	/**
	 * The method to set the value to fileType
	 * @param {Choice} fileType An instance of Choice
	 */
	setFileType(fileType)	{
		if((fileType != null) && (!(fileType instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fileType EXPECTED TYPE: Choice", null, null);
		}
		this.fileType = fileType;
		this.keyModified.set("file_type", 1);

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
