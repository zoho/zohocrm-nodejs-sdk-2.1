const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class MassUpdate{

	status;
	failedCount;
	updatedCount;
	notUpdatedCount;
	totalCount;
	keyModified = new Map();
	/**
	 * The method to get the status
	 * @returns {Choice} An instance of Choice
	 */
	getStatus()	{
		return this.status;

	}

	/**
	 * The method to set the value to status
	 * @param {Choice} status An instance of Choice
	 */
	setStatus(status)	{
		if((status != null) && (!(status instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: status EXPECTED TYPE: Choice", null, null);
		}
		this.status = status;
		this.keyModified.set("Status", 1);

	}

	/**
	 * The method to get the failedCount
	 * @returns {number} A number representing the failedCount
	 */
	getFailedCount()	{
		return this.failedCount;

	}

	/**
	 * The method to set the value to failedCount
	 * @param {number} failedCount A number representing the failedCount
	 */
	setFailedCount(failedCount)	{
		if((failedCount != null) && (!(Object.prototype.toString.call(failedCount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: failedCount EXPECTED TYPE: number", null, null);
		}
		this.failedCount = failedCount;
		this.keyModified.set("Failed_Count", 1);

	}

	/**
	 * The method to get the updatedCount
	 * @returns {number} A number representing the updatedCount
	 */
	getUpdatedCount()	{
		return this.updatedCount;

	}

	/**
	 * The method to set the value to updatedCount
	 * @param {number} updatedCount A number representing the updatedCount
	 */
	setUpdatedCount(updatedCount)	{
		if((updatedCount != null) && (!(Object.prototype.toString.call(updatedCount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: updatedCount EXPECTED TYPE: number", null, null);
		}
		this.updatedCount = updatedCount;
		this.keyModified.set("Updated_Count", 1);

	}

	/**
	 * The method to get the notUpdatedCount
	 * @returns {number} A number representing the notUpdatedCount
	 */
	getNotUpdatedCount()	{
		return this.notUpdatedCount;

	}

	/**
	 * The method to set the value to notUpdatedCount
	 * @param {number} notUpdatedCount A number representing the notUpdatedCount
	 */
	setNotUpdatedCount(notUpdatedCount)	{
		if((notUpdatedCount != null) && (!(Object.prototype.toString.call(notUpdatedCount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: notUpdatedCount EXPECTED TYPE: number", null, null);
		}
		this.notUpdatedCount = notUpdatedCount;
		this.keyModified.set("Not_Updated_Count", 1);

	}

	/**
	 * The method to get the totalCount
	 * @returns {number} A number representing the totalCount
	 */
	getTotalCount()	{
		return this.totalCount;

	}

	/**
	 * The method to set the value to totalCount
	 * @param {number} totalCount A number representing the totalCount
	 */
	setTotalCount(totalCount)	{
		if((totalCount != null) && (!(Object.prototype.toString.call(totalCount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: totalCount EXPECTED TYPE: number", null, null);
		}
		this.totalCount = totalCount;
		this.keyModified.set("Total_Count", 1);

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
	MasterModel : MassUpdate,
	MassUpdate : MassUpdate
}
