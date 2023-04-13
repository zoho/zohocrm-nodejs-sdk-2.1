import {SDKException} from "../exception/sdk_exception.js";
import {Constants} from "../../../../../../utils/util/constants.js";

class External{

	show;
	type;
	allowMultipleConfig;
	keyModified = new Map();
	/**
	 * The method to get the show
	 * @returns {Boolean} A Boolean representing the show
	 */
	getShow()	{
		return this.show;

	}

	/**
	 * The method to set the value to show
	 * @param {Boolean} show A Boolean representing the show
	 */
	setShow(show)	{
		if((show != null) && (!(Object.prototype.toString.call(show) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: show EXPECTED TYPE: Boolean", null, null);
		}
		this.show = show;
		this.keyModified.set("show", 1);

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
	 * The method to get the allowMultipleConfig
	 * @returns {Boolean} A Boolean representing the allowMultipleConfig
	 */
	getAllowMultipleConfig()	{
		return this.allowMultipleConfig;

	}

	/**
	 * The method to set the value to allowMultipleConfig
	 * @param {Boolean} allowMultipleConfig A Boolean representing the allowMultipleConfig
	 */
	setAllowMultipleConfig(allowMultipleConfig)	{
		if((allowMultipleConfig != null) && (!(Object.prototype.toString.call(allowMultipleConfig) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: allowMultipleConfig EXPECTED TYPE: Boolean", null, null);
		}
		this.allowMultipleConfig = allowMultipleConfig;
		this.keyModified.set("allow_multiple_config", 1);

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
	External as MasterModel,
	External as External
}
