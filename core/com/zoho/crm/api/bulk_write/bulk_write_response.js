const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class BulkWriteResponse{

	status;
	characterEncoding;
	resource;
	id;
	callback;
	result;
	createdBy;
	operation;
	createdTime;
	keyModified = new Map();
	/**
	 * The method to get the status
	 * @returns {String} A String representing the status
	 */
	getStatus()	{
		return this.status;

	}

	/**
	 * The method to set the value to status
	 * @param {String} status A String representing the status
	 */
	setStatus(status)	{
		if((status != null) && (!(Object.prototype.toString.call(status) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: status EXPECTED TYPE: String", null, null);
		}
		this.status = status;
		this.keyModified.set("status", 1);

	}

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
	 * The method to get the id
	 * @returns {BigInt} A BigInt representing the id
	 */
	getId()	{
		return this.id;

	}

	/**
	 * The method to set the value to id
	 * @param {BigInt} id A BigInt representing the id
	 */
	setId(id)	{
		if((id != null) && (!(Object.prototype.toString.call(id) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: id EXPECTED TYPE: BigInt", null, null);
		}
		this.id = id;
		this.keyModified.set("id", 1);

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
	 * The method to get the result
	 * @returns {Result} An instance of Result
	 */
	getResult()	{
		return this.result;

	}

	/**
	 * The method to set the value to result
	 * @param {Result} result An instance of Result
	 */
	setResult(result)	{
		const Result = require("./result").MasterModel;
		if((result != null) && (!(result instanceof Result)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: result EXPECTED TYPE: Result", null, null);
		}
		this.result = result;
		this.keyModified.set("result", 1);

	}

	/**
	 * The method to get the createdBy
	 * @returns {User} An instance of User
	 */
	getCreatedBy()	{
		return this.createdBy;

	}

	/**
	 * The method to set the value to createdBy
	 * @param {User} createdBy An instance of User
	 */
	setCreatedBy(createdBy)	{
		const User = require("../users/user").MasterModel;
		if((createdBy != null) && (!(createdBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdBy EXPECTED TYPE: User", null, null);
		}
		this.createdBy = createdBy;
		this.keyModified.set("created_by", 1);

	}

	/**
	 * The method to get the operation
	 * @returns {String} A String representing the operation
	 */
	getOperation()	{
		return this.operation;

	}

	/**
	 * The method to set the value to operation
	 * @param {String} operation A String representing the operation
	 */
	setOperation(operation)	{
		if((operation != null) && (!(Object.prototype.toString.call(operation) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: operation EXPECTED TYPE: String", null, null);
		}
		this.operation = operation;
		this.keyModified.set("operation", 1);

	}

	/**
	 * The method to get the createdTime
	 * @returns {Date} An instance of Date
	 */
	getCreatedTime()	{
		return this.createdTime;

	}

	/**
	 * The method to set the value to createdTime
	 * @param {Date} createdTime An instance of Date
	 */
	setCreatedTime(createdTime)	{
		if((createdTime != null) && (!(createdTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdTime EXPECTED TYPE: Date", null, null);
		}
		this.createdTime = createdTime;
		this.keyModified.set("created_time", 1);

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
	MasterModel : BulkWriteResponse,
	BulkWriteResponse : BulkWriteResponse
}
