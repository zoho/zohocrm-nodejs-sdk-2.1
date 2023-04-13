import {SDKException} from "../exception/sdk_exception.js";
import {Constants} from "../../../../../../utils/util/constants.js";

class Notify{

	sendCancellingMail;
	keyModified = new Map();
	/**
	 * The method to get the sendCancellingMail
	 * @returns {Boolean} A Boolean representing the sendCancellingMail
	 */
	getSendCancellingMail()	{
		return this.sendCancellingMail;

	}

	/**
	 * The method to set the value to sendCancellingMail
	 * @param {Boolean} sendCancellingMail A Boolean representing the sendCancellingMail
	 */
	setSendCancellingMail(sendCancellingMail)	{
		if((sendCancellingMail != null) && (!(Object.prototype.toString.call(sendCancellingMail) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sendCancellingMail EXPECTED TYPE: Boolean", null, null);
		}
		this.sendCancellingMail = sendCancellingMail;
		this.keyModified.set("send_cancelling_mail", 1);

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
	Notify as MasterModel,
	Notify as Notify
}
