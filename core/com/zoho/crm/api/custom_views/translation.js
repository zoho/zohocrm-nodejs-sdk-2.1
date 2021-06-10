const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Translation{

	publicViews;
	otherUsersViews;
	sharedWithMe;
	createdByMe;
	keyModified = new Map();
	/**
	 * The method to get the publicViews
	 * @returns {String} A String representing the publicViews
	 */
	getPublicViews()	{
		return this.publicViews;

	}

	/**
	 * The method to set the value to publicViews
	 * @param {String} publicViews A String representing the publicViews
	 */
	setPublicViews(publicViews)	{
		if((publicViews != null) && (!(Object.prototype.toString.call(publicViews) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: publicViews EXPECTED TYPE: String", null, null);
		}
		this.publicViews = publicViews;
		this.keyModified.set("public_views", 1);

	}

	/**
	 * The method to get the otherUsersViews
	 * @returns {String} A String representing the otherUsersViews
	 */
	getOtherUsersViews()	{
		return this.otherUsersViews;

	}

	/**
	 * The method to set the value to otherUsersViews
	 * @param {String} otherUsersViews A String representing the otherUsersViews
	 */
	setOtherUsersViews(otherUsersViews)	{
		if((otherUsersViews != null) && (!(Object.prototype.toString.call(otherUsersViews) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: otherUsersViews EXPECTED TYPE: String", null, null);
		}
		this.otherUsersViews = otherUsersViews;
		this.keyModified.set("other_users_views", 1);

	}

	/**
	 * The method to get the sharedWithMe
	 * @returns {String} A String representing the sharedWithMe
	 */
	getSharedWithMe()	{
		return this.sharedWithMe;

	}

	/**
	 * The method to set the value to sharedWithMe
	 * @param {String} sharedWithMe A String representing the sharedWithMe
	 */
	setSharedWithMe(sharedWithMe)	{
		if((sharedWithMe != null) && (!(Object.prototype.toString.call(sharedWithMe) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sharedWithMe EXPECTED TYPE: String", null, null);
		}
		this.sharedWithMe = sharedWithMe;
		this.keyModified.set("shared_with_me", 1);

	}

	/**
	 * The method to get the createdByMe
	 * @returns {String} A String representing the createdByMe
	 */
	getCreatedByMe()	{
		return this.createdByMe;

	}

	/**
	 * The method to set the value to createdByMe
	 * @param {String} createdByMe A String representing the createdByMe
	 */
	setCreatedByMe(createdByMe)	{
		if((createdByMe != null) && (!(Object.prototype.toString.call(createdByMe) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdByMe EXPECTED TYPE: String", null, null);
		}
		this.createdByMe = createdByMe;
		this.keyModified.set("created_by_me", 1);

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
	MasterModel : Translation,
	Translation : Translation
}
