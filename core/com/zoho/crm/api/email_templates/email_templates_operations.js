const Param = require("../../../../../../routes/param").MasterModel;
const APIResponse = require("../../../../../../routes/controllers/api_response").MasterModel;
const CommonAPIHandler = require("../../../../../../routes/middlewares/common_api_handler").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class EmailTemplatesOperations{

	module;
	/**
	 * Creates an instance of EmailTemplatesOperations with the given parameters
	 * @param {String} module A String representing the module
	 */
	constructor(module=null){
		if((module != null) && (!(Object.prototype.toString.call(module) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: module EXPECTED TYPE: String", null, null);
		}
		this.module = module;

	}

	/**
	 * The method to get email templates
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getEmailTemplates()	{
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/email_templates");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("module", "com.zoho.crm.api.EmailTemplates.GetEmailTemplatesParam"), this.module);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

	/**
	 * The method to get email template by id
	 * @param {BigInt} id A BigInt representing the id
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getEmailTemplateById(id)	{
		if((!(Object.prototype.toString.call(id) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: id EXPECTED TYPE: BigInt", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/email_templates/");
		apiPath = apiPath.concat(id.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("module", "com.zoho.crm.api.EmailTemplates.GetEmailTemplatebyIDParam"), this.module);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

}
class GetEmailTemplatesParam{

}

class GetEmailTemplatebyIDParam{

}

module.exports = {
	GetEmailTemplatebyIDParam : GetEmailTemplatebyIDParam,
	MasterModel : EmailTemplatesOperations,
	EmailTemplatesOperations : EmailTemplatesOperations,
	GetEmailTemplatesParam : GetEmailTemplatesParam
}
