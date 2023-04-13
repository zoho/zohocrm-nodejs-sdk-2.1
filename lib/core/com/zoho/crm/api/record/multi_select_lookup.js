import {SDKException} from "../exception/sdk_exception.js";
import {Constants} from "../../../../../../utils/util/constants.js";

class MultiSelectLookup{

	id;
	fieldname;
	hasMore;
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
	 * The method to get the fieldname
	 * @returns {Map} A Map representing the fieldname
	 */
	getFieldname()	{
		return this.fieldname;

	}

	/**
	 * The method to set the value to fieldname
	 * @param {Map} fieldname A Map representing the fieldname
	 */
	setFieldname(fieldname)	{
		if((fieldname != null) && (!(Object.prototype.toString.call(fieldname) == "[object Map]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldname EXPECTED TYPE: Map", null, null);
		}
		this.fieldname = fieldname;
		this.keyModified.set("fieldName", 1);

	}

	/**
	 * The method to get the hasMore
	 * @returns {Map} A Map representing the hasMore
	 */
	getHasMore()	{
		return this.hasMore;

	}

	/**
	 * The method to set the value to hasMore
	 * @param {Map} hasMore A Map representing the hasMore
	 */
	setHasMore(hasMore)	{
		if((hasMore != null) && (!(Object.prototype.toString.call(hasMore) == "[object Map]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: hasMore EXPECTED TYPE: Map", null, null);
		}
		this.hasMore = hasMore;
		this.keyModified.set("$has_more", 1);

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
	MultiSelectLookup as MasterModel,
	MultiSelectLookup as MultiSelectLookup
}
