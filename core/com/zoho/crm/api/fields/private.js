const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Private{

	restricted;
	export1;
	type;
	keyModified = new Map();
	/**
	 * The method to get the restricted
	 * @returns {Boolean} A Boolean representing the restricted
	 */
	getRestricted()	{
		return this.restricted;

	}

	/**
	 * The method to set the value to restricted
	 * @param {Boolean} restricted A Boolean representing the restricted
	 */
	setRestricted(restricted)	{
		if((restricted != null) && (!(Object.prototype.toString.call(restricted) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: restricted EXPECTED TYPE: Boolean", null, null);
		}
		this.restricted = restricted;
		this.keyModified.set("restricted", 1);

	}

	/**
	 * The method to get the export
	 * @returns {Boolean} A Boolean representing the export1
	 */
	getExport()	{
		return this.export1;

	}

	/**
	 * The method to set the value to export
	 * @param {Boolean} export1 A Boolean representing the export1
	 */
	setExport(export1)	{
		if((export1 != null) && (!(Object.prototype.toString.call(export1) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: export1 EXPECTED TYPE: Boolean", null, null);
		}
		this.export1 = export1;
		this.keyModified.set("export", 1);

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
	MasterModel : Private,
	Private : Private
}
