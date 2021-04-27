const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class JobDetail{

	id;
	operation;
	state;
	query;
	createdBy;
	createdTime;
	result;
	fileType;
	keyModified = new Map();
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
	 * The method to get the state
	 * @returns {Choice} An instance of Choice
	 */
	getState()	{
		return this.state;

	}

	/**
	 * The method to set the value to state
	 * @param {Choice} state An instance of Choice
	 */
	setState(state)	{
		if((state != null) && (!(state instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: state EXPECTED TYPE: Choice", null, null);
		}
		this.state = state;
		this.keyModified.set("state", 1);

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
	 * The method to get the fileType
	 * @returns {String} A String representing the fileType
	 */
	getFileType()	{
		return this.fileType;

	}

	/**
	 * The method to set the value to fileType
	 * @param {String} fileType A String representing the fileType
	 */
	setFileType(fileType)	{
		if((fileType != null) && (!(Object.prototype.toString.call(fileType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fileType EXPECTED TYPE: String", null, null);
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
	MasterModel : JobDetail,
	JobDetail : JobDetail
}
