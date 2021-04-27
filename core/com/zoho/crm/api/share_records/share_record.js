const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ShareRecord{

	shareRelatedRecords;
	sharedThrough;
	sharedTime;
	permission;
	sharedBy;
	user;
	keyModified = new Map();
	/**
	 * The method to get the shareRelatedRecords
	 * @returns {Boolean} A Boolean representing the shareRelatedRecords
	 */
	getShareRelatedRecords()	{
		return this.shareRelatedRecords;

	}

	/**
	 * The method to set the value to shareRelatedRecords
	 * @param {Boolean} shareRelatedRecords A Boolean representing the shareRelatedRecords
	 */
	setShareRelatedRecords(shareRelatedRecords)	{
		if((shareRelatedRecords != null) && (!(Object.prototype.toString.call(shareRelatedRecords) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: shareRelatedRecords EXPECTED TYPE: Boolean", null, null);
		}
		this.shareRelatedRecords = shareRelatedRecords;
		this.keyModified.set("share_related_records", 1);

	}

	/**
	 * The method to get the sharedThrough
	 * @returns {SharedThrough} An instance of SharedThrough
	 */
	getSharedThrough()	{
		return this.sharedThrough;

	}

	/**
	 * The method to set the value to sharedThrough
	 * @param {SharedThrough} sharedThrough An instance of SharedThrough
	 */
	setSharedThrough(sharedThrough)	{
		const SharedThrough = require("./shared_through").MasterModel;
		if((sharedThrough != null) && (!(sharedThrough instanceof SharedThrough)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sharedThrough EXPECTED TYPE: SharedThrough", null, null);
		}
		this.sharedThrough = sharedThrough;
		this.keyModified.set("shared_through", 1);

	}

	/**
	 * The method to get the sharedTime
	 * @returns {Date} An instance of Date
	 */
	getSharedTime()	{
		return this.sharedTime;

	}

	/**
	 * The method to set the value to sharedTime
	 * @param {Date} sharedTime An instance of Date
	 */
	setSharedTime(sharedTime)	{
		if((sharedTime != null) && (!(sharedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sharedTime EXPECTED TYPE: Date", null, null);
		}
		this.sharedTime = sharedTime;
		this.keyModified.set("shared_time", 1);

	}

	/**
	 * The method to get the permission
	 * @returns {String} A String representing the permission
	 */
	getPermission()	{
		return this.permission;

	}

	/**
	 * The method to set the value to permission
	 * @param {String} permission A String representing the permission
	 */
	setPermission(permission)	{
		if((permission != null) && (!(Object.prototype.toString.call(permission) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: permission EXPECTED TYPE: String", null, null);
		}
		this.permission = permission;
		this.keyModified.set("permission", 1);

	}

	/**
	 * The method to get the sharedBy
	 * @returns {User} An instance of User
	 */
	getSharedBy()	{
		return this.sharedBy;

	}

	/**
	 * The method to set the value to sharedBy
	 * @param {User} sharedBy An instance of User
	 */
	setSharedBy(sharedBy)	{
		const User = require("../users/user").MasterModel;
		if((sharedBy != null) && (!(sharedBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sharedBy EXPECTED TYPE: User", null, null);
		}
		this.sharedBy = sharedBy;
		this.keyModified.set("shared_by", 1);

	}

	/**
	 * The method to get the user
	 * @returns {User} An instance of User
	 */
	getUser()	{
		return this.user;

	}

	/**
	 * The method to set the value to user
	 * @param {User} user An instance of User
	 */
	setUser(user)	{
		const User = require("../users/user").MasterModel;
		if((user != null) && (!(user instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: user EXPECTED TYPE: User", null, null);
		}
		this.user = user;
		this.keyModified.set("user", 1);

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
	MasterModel : ShareRecord,
	ShareRecord : ShareRecord
}
