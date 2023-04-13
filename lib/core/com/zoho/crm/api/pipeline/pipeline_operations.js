import {Param} from "../../../../../../routes/param.js";
import {BodyWrapper} from "./body_wrapper.js";
import {TransferAndDeleteWrapper} from "./transfer_and_delete_wrapper.js";
import {SDKException} from "../exception/sdk_exception.js";
import {APIResponse} from "../../../../../../routes/controllers/api_response.js";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler.js";
import {createRequire} from "node:module";
import {Constants} from "../../../../../../utils/util/constants.js";
class PipelineOperations{

	layoutId;
	/**
	 * Creates an instance of PipelineOperations with the given parameters
	 * @param {BigInt} layoutId A BigInt representing the layoutId
	 */
	constructor(layoutId=null){
		if((layoutId != null) && (!(Object.prototype.toString.call(layoutId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: layoutId EXPECTED TYPE: BigInt", null, null);
		}
		this.layoutId = layoutId;

	}

	/**
	 * The method to transfer and delete
	 * @param {TransferAndDeleteWrapper} request An instance of TransferAndDeleteWrapper
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async transferAndDelete(request)	{
		if((request != null) && (!(request instanceof TransferAndDeleteWrapper)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: request EXPECTED TYPE: TransferAndDeleteWrapper", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline/actions/transfer");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_POST);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_CREATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.TransferAndDeleteParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let TransferActionHandler = require.resolve("./transfer_action_handler.js");
		return handlerInstance.apiCall(TransferActionHandler, "application/json");

	}

	/**
	 * The method to get pipelines
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getPipelines()	{
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.GetPipelinesParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ResponseHandler = require.resolve("./response_handler.js");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

	/**
	 * The method to create pipelines
	 * @param {BodyWrapper} request An instance of BodyWrapper
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async createPipelines(request)	{
		if((request != null) && (!(request instanceof BodyWrapper)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: request EXPECTED TYPE: BodyWrapper", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_POST);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_CREATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.CreatePipelinesParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ActionHandler = require.resolve("./action_handler.js");
		return handlerInstance.apiCall(ActionHandler, "application/json");

	}

	/**
	 * The method to update pipelines
	 * @param {BodyWrapper} request An instance of BodyWrapper
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async updatePipelines(request)	{
		if((request != null) && (!(request instanceof BodyWrapper)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: request EXPECTED TYPE: BodyWrapper", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_UPDATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		handlerInstance.setMandatoryChecker(true);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.UpdatePipelinesParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ActionHandler = require.resolve("./action_handler.js");
		return handlerInstance.apiCall(ActionHandler, "application/json");

	}

	/**
	 * The method to get pipeline
	 * @param {BigInt} pipelineId A BigInt representing the pipelineId
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getPipeline(pipelineId)	{
		if((!(Object.prototype.toString.call(pipelineId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pipelineId EXPECTED TYPE: BigInt", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline/");
		apiPath = apiPath.concat(pipelineId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.GetPipelineParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ResponseHandler = require.resolve("./response_handler.js");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

	/**
	 * The method to update pipeline
	 * @param {BigInt} pipelineId A BigInt representing the pipelineId
	 * @param {BodyWrapper} request An instance of BodyWrapper
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async updatePipeline(pipelineId, request)	{
		if((!(Object.prototype.toString.call(pipelineId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pipelineId EXPECTED TYPE: BigInt", null, null);
		}
		if((request != null) && (!(request instanceof BodyWrapper)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: request EXPECTED TYPE: BodyWrapper", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/pipeline/");
		apiPath = apiPath.concat(pipelineId.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_PUT);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_UPDATE);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		await handlerInstance.addParam(new Param("layout_id", "com.zoho.crm.api.Pipeline.UpdatePipelineParam"), this.layoutId).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ActionHandler = require.resolve("./action_handler.js");
		return handlerInstance.apiCall(ActionHandler, "application/json");

	}

}
class TransferAndDeleteParam{

}

class GetPipelinesParam{

}

class CreatePipelinesParam{

}

class UpdatePipelinesParam{

}

class GetPipelineParam{

}

class UpdatePipelineParam{

}

export {
	GetPipelineParam as GetPipelineParam,
	TransferAndDeleteParam as TransferAndDeleteParam,
	GetPipelinesParam as GetPipelinesParam,
	PipelineOperations as MasterModel,
	PipelineOperations as PipelineOperations,
	UpdatePipelinesParam as UpdatePipelinesParam,
	UpdatePipelineParam as UpdatePipelineParam,
	CreatePipelinesParam as CreatePipelinesParam
}
