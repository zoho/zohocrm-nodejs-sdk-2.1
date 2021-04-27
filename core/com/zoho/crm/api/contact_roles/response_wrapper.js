const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ResponseWrapper{

	contactRoles;
	keyModified = new Map();
	/**
	 * The method to get the contactRoles
	 * @returns {Array} An Array representing the contactRoles
	 */
	getContactRoles()	{
		return this.contactRoles;

	}

	/**
	 * The method to set the value to contactRoles
	 * @param {Array} contactRoles An Array representing the contactRoles
	 */
	setContactRoles(contactRoles)	{
		if((contactRoles != null) && (!(Object.prototype.toString.call(contactRoles) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: contactRoles EXPECTED TYPE: Array", null, null);
		}
		this.contactRoles = contactRoles;
		this.keyModified.set("contact_roles", 1);

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
	MasterModel : ResponseWrapper,
	ResponseWrapper : ResponseWrapper
}
