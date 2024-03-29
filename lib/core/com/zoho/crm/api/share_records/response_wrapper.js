import {ShareRecord} from "./share_record.js";
import {User} from "../users/user.js";
import {SDKException} from "../exception/sdk_exception.js";
import {Constants} from "../../../../../../utils/util/constants.js";

class ResponseWrapper{

	share;
	shareableUser;
	keyModified = new Map();
	/**
	 * The method to get the share
	 * @returns {Array} An Array representing the share
	 */
	getShare()	{
		return this.share;

	}

	/**
	 * The method to set the value to share
	 * @param {Array} share An Array representing the share
	 */
	setShare(share)	{
		if((share != null) && (!(Object.prototype.toString.call(share) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: share EXPECTED TYPE: Array", null, null);
		}
		this.share = share;
		this.keyModified.set("share", 1);

	}

	/**
	 * The method to get the shareableUser
	 * @returns {Array} An Array representing the shareableUser
	 */
	getShareableUser()	{
		return this.shareableUser;

	}

	/**
	 * The method to set the value to shareableUser
	 * @param {Array} shareableUser An Array representing the shareableUser
	 */
	setShareableUser(shareableUser)	{
		if((shareableUser != null) && (!(Object.prototype.toString.call(shareableUser) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: shareableUser EXPECTED TYPE: Array", null, null);
		}
		this.shareableUser = shareableUser;
		this.keyModified.set("shareable_user", 1);

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
export {
	ResponseWrapper as MasterModel,
	ResponseWrapper as ResponseWrapper
}
