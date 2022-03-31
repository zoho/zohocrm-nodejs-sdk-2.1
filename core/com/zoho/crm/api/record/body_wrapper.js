const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class BodyWrapper{

	data;
	trigger;
	process;
	duplicateCheckFields;
	wfTrigger;
	larId;
	keyModified = new Map();
	/**
	 * The method to get the data
	 * @returns {Array} An Array representing the data
	 */
	getData()	{
		return this.data;

	}

	/**
	 * The method to set the value to data
	 * @param {Array} data An Array representing the data
	 */
	setData(data)	{
		if((data != null) && (!(Object.prototype.toString.call(data) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: data EXPECTED TYPE: Array", null, null);
		}
		this.data = data;
		this.keyModified.set("data", 1);

	}

	/**
	 * The method to get the trigger
	 * @returns {Array} An Array representing the trigger
	 */
	getTrigger()	{
		return this.trigger;

	}

	/**
	 * The method to set the value to trigger
	 * @param {Array} trigger An Array representing the trigger
	 */
	setTrigger(trigger)	{
		if((trigger != null) && (!(Object.prototype.toString.call(trigger) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: trigger EXPECTED TYPE: Array", null, null);
		}
		this.trigger = trigger;
		this.keyModified.set("trigger", 1);

	}

	/**
	 * The method to get the process
	 * @returns {Array} An Array representing the process
	 */
	getProcess()	{
		return this.process;

	}

	/**
	 * The method to set the value to process
	 * @param {Array} process An Array representing the process
	 */
	setProcess(process)	{
		if((process != null) && (!(Object.prototype.toString.call(process) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: process EXPECTED TYPE: Array", null, null);
		}
		this.process = process;
		this.keyModified.set("process", 1);

	}

	/**
	 * The method to get the duplicateCheckFields
	 * @returns {Array} An Array representing the duplicateCheckFields
	 */
	getDuplicateCheckFields()	{
		return this.duplicateCheckFields;

	}

	/**
	 * The method to set the value to duplicateCheckFields
	 * @param {Array} duplicateCheckFields An Array representing the duplicateCheckFields
	 */
	setDuplicateCheckFields(duplicateCheckFields)	{
		if((duplicateCheckFields != null) && (!(Object.prototype.toString.call(duplicateCheckFields) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: duplicateCheckFields EXPECTED TYPE: Array", null, null);
		}
		this.duplicateCheckFields = duplicateCheckFields;
		this.keyModified.set("duplicate_check_fields", 1);

	}

	/**
	 * The method to get the wfTrigger
	 * @returns {String} A String representing the wfTrigger
	 */
	getWfTrigger()	{
		return this.wfTrigger;

	}

	/**
	 * The method to set the value to wfTrigger
	 * @param {String} wfTrigger A String representing the wfTrigger
	 */
	setWfTrigger(wfTrigger)	{
		if((wfTrigger != null) && (!(Object.prototype.toString.call(wfTrigger) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: wfTrigger EXPECTED TYPE: String", null, null);
		}
		this.wfTrigger = wfTrigger;
		this.keyModified.set("wf_trigger", 1);

	}

	/**
	 * The method to get the larId
	 * @returns {String} A String representing the larId
	 */
	getLarId()	{
		return this.larId;

	}

	/**
	 * The method to set the value to larId
	 * @param {String} larId A String representing the larId
	 */
	setLarId(larId)	{
		if((larId != null) && (!(Object.prototype.toString.call(larId) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: larId EXPECTED TYPE: String", null, null);
		}
		this.larId = larId;
		this.keyModified.set("lar_id", 1);

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
	MasterModel : BodyWrapper,
	BodyWrapper : BodyWrapper
}
