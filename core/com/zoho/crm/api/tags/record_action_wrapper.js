const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class RecordActionWrapper{

	data;
	wfScheduler;
	successCount;
	lockedCount;
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
	 * The method to get the wfScheduler
	 * @returns {Boolean} A Boolean representing the wfScheduler
	 */
	getWfScheduler()	{
		return this.wfScheduler;

	}

	/**
	 * The method to set the value to wfScheduler
	 * @param {Boolean} wfScheduler A Boolean representing the wfScheduler
	 */
	setWfScheduler(wfScheduler)	{
		if((wfScheduler != null) && (!(Object.prototype.toString.call(wfScheduler) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: wfScheduler EXPECTED TYPE: Boolean", null, null);
		}
		this.wfScheduler = wfScheduler;
		this.keyModified.set("wf_scheduler", 1);

	}

	/**
	 * The method to get the successCount
	 * @returns {String} A String representing the successCount
	 */
	getSuccessCount()	{
		return this.successCount;

	}

	/**
	 * The method to set the value to successCount
	 * @param {String} successCount A String representing the successCount
	 */
	setSuccessCount(successCount)	{
		if((successCount != null) && (!(Object.prototype.toString.call(successCount) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: successCount EXPECTED TYPE: String", null, null);
		}
		this.successCount = successCount;
		this.keyModified.set("success_count", 1);

	}

	/**
	 * The method to get the lockedCount
	 * @returns {number} A number representing the lockedCount
	 */
	getLockedCount()	{
		return this.lockedCount;

	}

	/**
	 * The method to set the value to lockedCount
	 * @param {number} lockedCount A number representing the lockedCount
	 */
	setLockedCount(lockedCount)	{
		if((lockedCount != null) && (!(Object.prototype.toString.call(lockedCount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lockedCount EXPECTED TYPE: number", null, null);
		}
		this.lockedCount = lockedCount;
		this.keyModified.set("locked_count", 1);

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
	MasterModel : RecordActionWrapper,
	RecordActionWrapper : RecordActionWrapper
}
