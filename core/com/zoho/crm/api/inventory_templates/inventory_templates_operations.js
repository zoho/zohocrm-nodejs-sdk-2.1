const Param = require("../../../../../../routes/param").MasterModel;
const APIResponse = require("../../../../../../routes/controllers/api_response").MasterModel;
const CommonAPIHandler = require("../../../../../../routes/middlewares/common_api_handler").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class InventoryTemplatesOperations{

	module;
	sortBy;
	sortOrder;
	category;
	/**
	 * Creates an instance of InventoryTemplatesOperations with the given parameters
	 * @param {String} module A String representing the module
	 * @param {String} sortBy A String representing the sortBy
	 * @param {String} sortOrder A String representing the sortOrder
	 * @param {String} category A String representing the category
	 */
	constructor(module=null, sortBy=null, sortOrder=null, category=null){
		if((module != null) && (!(Object.prototype.toString.call(module) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: module EXPECTED TYPE: String", null, null);
		}
		if((sortBy != null) && (!(Object.prototype.toString.call(sortBy) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sortBy EXPECTED TYPE: String", null, null);
		}
		if((sortOrder != null) && (!(Object.prototype.toString.call(sortOrder) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sortOrder EXPECTED TYPE: String", null, null);
		}
		if((category != null) && (!(Object.prototype.toString.call(category) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: category EXPECTED TYPE: String", null, null);
		}
		this.module = module;
		this.sortBy = sortBy;
		this.sortOrder = sortOrder;
		this.category = category;

	}

	/**
	 * The method to get inventory templates
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getInventoryTemplates()	{
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/inventory_templates");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("module", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.module);
		await handlerInstance.addParam(new Param("sort_by", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.sortBy);
		await handlerInstance.addParam(new Param("sort_order", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.sortOrder);
		await handlerInstance.addParam(new Param("category", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatesParam"), this.category);
		let ResponseHandler = require.resolve("./response_handler");
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
		await handlerInstance.addParam(new Param("module", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.module);
		await handlerInstance.addParam(new Param("sort_by", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.sortBy);
		await handlerInstance.addParam(new Param("sort_order", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.sortOrder);
		await handlerInstance.addParam(new Param("category", "com.zoho.crm.api.InventoryTemplates.GetInventoryTemplatebyIDParam"), this.category);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

}
class GetInventoryTemplatesParam{

}

class GetInventoryTemplatebyIDParam{

}

module.exports = {
	GetInventoryTemplatebyIDParam : GetInventoryTemplatebyIDParam,
	MasterModel : InventoryTemplatesOperations,
	InventoryTemplatesOperations : InventoryTemplatesOperations,
	GetInventoryTemplatesParam : GetInventoryTemplatesParam
}
