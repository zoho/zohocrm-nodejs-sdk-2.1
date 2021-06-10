const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class TransferAndDeleteWrapper{

	transferPipeline;
	keyModified = new Map();
	/**
	 * The method to get the transferPipeline
	 * @returns {Array} An Array representing the transferPipeline
	 */
	getTransferPipeline()	{
		return this.transferPipeline;

	}

	/**
	 * The method to set the value to transferPipeline
	 * @param {Array} transferPipeline An Array representing the transferPipeline
	 */
	setTransferPipeline(transferPipeline)	{
		if((transferPipeline != null) && (!(Object.prototype.toString.call(transferPipeline) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: transferPipeline EXPECTED TYPE: Array", null, null);
		}
		this.transferPipeline = transferPipeline;
		this.keyModified.set("transfer_pipeline", 1);

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
	MasterModel : TransferAndDeleteWrapper,
	TransferAndDeleteWrapper : TransferAndDeleteWrapper
}
