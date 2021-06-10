const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class AssociationDetails{

	lookupField;
	relatedField;
	keyModified = new Map();
	/**
	 * The method to get the lookupField
	 * @returns {LookupField} An instance of LookupField
	 */
	getLookupField()	{
		return this.lookupField;

	}

	/**
	 * The method to set the value to lookupField
	 * @param {LookupField} lookupField An instance of LookupField
	 */
	setLookupField(lookupField)	{
		const LookupField = require("./lookup_field").MasterModel;
		if((lookupField != null) && (!(lookupField instanceof LookupField)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lookupField EXPECTED TYPE: LookupField", null, null);
		}
		this.lookupField = lookupField;
		this.keyModified.set("lookup_field", 1);

	}

	/**
	 * The method to get the relatedField
	 * @returns {LookupField} An instance of LookupField
	 */
	getRelatedField()	{
		return this.relatedField;

	}

	/**
	 * The method to set the value to relatedField
	 * @param {LookupField} relatedField An instance of LookupField
	 */
	setRelatedField(relatedField)	{
		const LookupField = require("./lookup_field").MasterModel;
		if((relatedField != null) && (!(relatedField instanceof LookupField)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: relatedField EXPECTED TYPE: LookupField", null, null);
		}
		this.relatedField = relatedField;
		this.keyModified.set("related_field", 1);

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
	MasterModel : AssociationDetails,
	AssociationDetails : AssociationDetails
}
