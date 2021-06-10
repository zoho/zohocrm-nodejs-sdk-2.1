const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class HistoryTracking{

	module;
	durationConfiguredField;
	keyModified = new Map();
	/**
	 * The method to get the module
	 * @returns {Module} An instance of Module
	 */
	getModule()	{
		return this.module;

	}

	/**
	 * The method to set the value to module
	 * @param {Module} module An instance of Module
	 */
	setModule(module)	{
		const Module = require("./module").MasterModel;
		if((module != null) && (!(module instanceof Module)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: module EXPECTED TYPE: Module", null, null);
		}
		this.module = module;
		this.keyModified.set("module", 1);

	}

	/**
	 * The method to get the durationConfiguredField
	 * @returns {Field} An instance of Field
	 */
	getDurationConfiguredField()	{
		return this.durationConfiguredField;

	}

	/**
	 * The method to set the value to durationConfiguredField
	 * @param {Field} durationConfiguredField An instance of Field
	 */
	setDurationConfiguredField(durationConfiguredField)	{
		const Field = require("./field").MasterModel;
		if((durationConfiguredField != null) && (!(durationConfiguredField instanceof Field)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: durationConfiguredField EXPECTED TYPE: Field", null, null);
		}
		this.durationConfiguredField = durationConfiguredField;
		this.keyModified.set("duration_configured_field", 1);

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
	MasterModel : HistoryTracking,
	HistoryTracking : HistoryTracking
}
