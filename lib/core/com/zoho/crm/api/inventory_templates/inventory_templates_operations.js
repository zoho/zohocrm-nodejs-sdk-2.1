import {Param} from "../../../../../../routes/param.js";
import {ParameterMap} from "../../../../../../routes/parameter_map.js";
import {SDKException} from "../exception/sdk_exception.js";
import {APIResponse} from "../../../../../../routes/controllers/api_response.js";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler.js";
import {createRequire} from "node:module";
import {Constants} from "../../../../../../utils/util/constants.js";
class InventoryTemplatesOperations{

	sortBy;
	sortOrder;
	category;
	/**
	 * Creates an instance of InventoryTemplatesOperations with the given parameters
	 * @param {String} sortBy A String representing the sortBy
	 * @param {String} sortOrder A String representing the sortOrder
	 * @param {String} category A String representing the category
	 */
	constructor(sortBy=null, sortOrder=null, category=null){
		if((sortBy != null) && (!(Object.prototype.toString.call(sortBy) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sortBy EXPECTED TYPE: String", null, null);
		}
		if((sortOrder != null) && (!(Object.prototype.toString.call(sortOrder) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sortOrder EXPECTED TYPE: String", null, null);
		}
		if((category != null) && (!(Object.prototype.toString.call(category) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: category EXPECTED TYPE: String", null, null);
		}
		this.sortBy = sortBy;
		this.sortOrder = sortOrder;
		this.category = category;

	}

	/**
	 * The method to get inventory templates
	 * @param {ParameterMap} paramInstance An instance of ParameterMap
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getInventoryTemplates(paramInstance=null)	{
		if((paramInstance != null) && (!(paramInstance instanceof ParameterMap)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: paramInstance EXPECTED TYPE: ParameterMap", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/inventory_templates");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("sort_by", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.sortBy).catch(err => { throw err; });
		await handlerInstance.addParam(new Param("sort_order", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.sortOrder).catch(err => { throw err; });
		await handlerInstance.addParam(new Param("category", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.category).catch(err => { throw err; });
		handlerInstance.setParam(paramInstance);
		const require = createRequire(import.meta.url);
		let ResponseHandler = require.resolve("./response_handler.js");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

	/**
	 * The method to get inventory template by id
	 * @param {BigInt} id A BigInt representing the id
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getInventoryTemplateById(id)	{
		if((!(Object.prototype.toString.call(id) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: id EXPECTED TYPE: BigInt", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/inventory_templates/");
		apiPath = apiPath.concat(id.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("sort_by", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.sortBy).catch(err => { throw err; });
		await handlerInstance.addParam(new Param("sort_order", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.sortOrder).catch(err => { throw err; });
		await handlerInstance.addParam(new Param("category", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.category).catch(err => { throw err; });
		const require = createRequire(import.meta.url);
		let ResponseHandler = require.resolve("./response_handler.js");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

}
class GetInventoryTemplatesParam{

	static MODULE = new Param("module", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam");
}

class GetInventoryTemplatebyIDParam{

}

export {
	GetInventoryTemplatebyIDParam as GetInventoryTemplatebyIDParam,
	InventoryTemplatesOperations as MasterModel,
	InventoryTemplatesOperations as InventoryTemplatesOperations,
	GetInventoryTemplatesParam as GetInventoryTemplatesParam
}
