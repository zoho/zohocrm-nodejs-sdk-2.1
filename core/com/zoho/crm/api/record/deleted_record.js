const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class DeletedRecord{

	deletedBy;
	id;
	displayName;
	type;
	createdBy;
	deletedTime;
	keyModified = new Map();
	/**
	 * The method to get the deletedBy
	 * @returns {User} An instance of User
	 */
	getDeletedBy()	{
		return this.deletedBy;

	}

	/**
	 * The method to set the value to deletedBy
	 * @param {User} deletedBy An instance of User
	 */
	setDeletedBy(deletedBy)	{
		const User = require("../users/user").MasterModel;
		if((deletedBy != null) && (!(deletedBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: deletedBy EXPECTED TYPE: User", null, null);
		}
		this.deletedBy = deletedBy;
		this.keyModified.set("deleted_by", 1);

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
	 * The method to get the displayName
	 * @returns {String} A String representing the displayName
	 */
	getDisplayName()	{
		return this.displayName;

	}

	/**
	 * The method to set the value to displayName
	 * @param {String} displayName A String representing the displayName
	 */
	setDisplayName(displayName)	{
		if((displayName != null) && (!(Object.prototype.toString.call(displayName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayName EXPECTED TYPE: String", null, null);
		}
		this.displayName = displayName;
		this.keyModified.set("display_name", 1);

	}

	/**
	 * The method to get the type
	 * @returns {String} A String representing the type
	 */
	getType()	{
		return this.type;

	}

	/**
	 * The method to set the value to type
	 * @param {String} type A String representing the type
	 */
	setType(type)	{
		if((type != null) && (!(Object.prototype.toString.call(type) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: type EXPECTED TYPE: String", null, null);
		}
		this.type = type;
		this.keyModified.set("type", 1);

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
	 * The method to get the deletedTime
	 * @returns {Date} An instance of Date
	 */
	getDeletedTime()	{
		return this.deletedTime;

	}

	/**
	 * The method to set the value to deletedTime
	 * @param {Date} deletedTime An instance of Date
	 */
	setDeletedTime(deletedTime)	{
		if((deletedTime != null) && (!(deletedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: deletedTime EXPECTED TYPE: Date", null, null);
		}
		this.deletedTime = deletedTime;
		this.keyModified.set("deleted_time", 1);

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
	MasterModel : DeletedRecord,
	DeletedRecord : DeletedRecord
}
