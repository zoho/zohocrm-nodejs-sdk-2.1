const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Territory{

	assigned;
	name;
	id;
	assignedTime;
	assignedBy;
	keyModified = new Map();
	/**
	 * The method to get the assigned
	 * @returns {String} A String representing the assigned
	 */
	getAssigned()	{
		return this.assigned;

	}

	/**
	 * The method to set the value to assigned
	 * @param {String} assigned A String representing the assigned
	 */
	setAssigned(assigned)	{
		if((assigned != null) && (!(Object.prototype.toString.call(assigned) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: assigned EXPECTED TYPE: String", null, null);
		}
		this.assigned = assigned;
		this.keyModified.set("$assigned", 1);

	}

	/**
	 * The method to get the name
	 * @returns {String} A String representing the name
	 */
	getName()	{
		return this.name;

	}

	/**
	 * The method to set the value to name
	 * @param {String} name A String representing the name
	 */
	setName(name)	{
		if((name != null) && (!(Object.prototype.toString.call(name) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: name EXPECTED TYPE: String", null, null);
		}
		this.name = name;
		this.keyModified.set("Name", 1);

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
	 * The method to get the assignedTime
	 * @returns {Date} An instance of Date
	 */
	getAssignedTime()	{
		return this.assignedTime;

	}

	/**
	 * The method to set the value to assignedTime
	 * @param {Date} assignedTime An instance of Date
	 */
	setAssignedTime(assignedTime)	{
		if((assignedTime != null) && (!(assignedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: assignedTime EXPECTED TYPE: Date", null, null);
		}
		this.assignedTime = assignedTime;
		this.keyModified.set("$assigned_time", 1);

	}

	/**
	 * The method to get the assignedBy
	 * @returns {User} An instance of User
	 */
	getAssignedBy()	{
		return this.assignedBy;

	}

	/**
	 * The method to set the value to assignedBy
	 * @param {User} assignedBy An instance of User
	 */
	setAssignedBy(assignedBy)	{
		const User = require("../users/user").MasterModel;
		if((assignedBy != null) && (!(assignedBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: assignedBy EXPECTED TYPE: User", null, null);
		}
		this.assignedBy = assignedBy;
		this.keyModified.set("$assigned_by", 1);

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
	MasterModel : Territory,
	Territory : Territory
}
