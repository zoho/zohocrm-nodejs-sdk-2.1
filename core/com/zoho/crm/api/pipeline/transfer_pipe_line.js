const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class TransferPipeLine{

	pipeline;
	stages;
	keyModified = new Map();
	/**
	 * The method to get the pipeline
	 * @returns {Pipeline} An instance of Pipeline
	 */
	getPipeline()	{
		return this.pipeline;

	}

	/**
	 * The method to set the value to pipeline
	 * @param {Pipeline} pipeline An instance of Pipeline
	 */
	setPipeline(pipeline)	{
		const Pipeline = require("./pipeline").MasterModel;
		if((pipeline != null) && (!(pipeline instanceof Pipeline)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pipeline EXPECTED TYPE: Pipeline", null, null);
		}
		this.pipeline = pipeline;
		this.keyModified.set("pipeline", 1);

	}

	/**
	 * The method to get the stages
	 * @returns {Array} An Array representing the stages
	 */
	getStages()	{
		return this.stages;

	}

	/**
	 * The method to set the value to stages
	 * @param {Array} stages An Array representing the stages
	 */
	setStages(stages)	{
		if((stages != null) && (!(Object.prototype.toString.call(stages) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: stages EXPECTED TYPE: Array", null, null);
		}
		this.stages = stages;
		this.keyModified.set("stages", 1);

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
	MasterModel : TransferPipeLine,
	TransferPipeLine : TransferPipeLine
}
