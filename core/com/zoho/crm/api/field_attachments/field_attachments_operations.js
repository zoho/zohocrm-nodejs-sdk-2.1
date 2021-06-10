const Param = require("../../../../../../routes/param").MasterModel;
const APIResponse = require("../../../../../../routes/controllers/api_response").MasterModel;
const CommonAPIHandler = require("../../../../../../routes/middlewares/common_api_handler").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class FieldAttachmentsOperations{

	fieldsAttachmentId;
	recordId;
	moduleAPIName;
	/**
	 * Creates an instance of FieldAttachmentsOperations with the given parameters
	 * @param {String} moduleAPIName A String representing the moduleAPIName
	 * @param {BigInt} recordId A BigInt representing the recordId
	 * @param {BigInt} fieldsAttachmentId A BigInt representing the fieldsAttachmentId
	 */
	constructor(moduleAPIName, recordId, fieldsAttachmentId=null){
		if((!(Object.prototype.toString.call(moduleAPIName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: moduleAPIName EXPECTED TYPE: String", null, null);
		}
		if((!(Object.prototype.toString.call(recordId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: recordId EXPECTED TYPE: BigInt", null, null);
		}
		if((fieldsAttachmentId != null) && (!(Object.prototype.toString.call(fieldsAttachmentId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldsAttachmentId EXPECTED TYPE: BigInt", null, null);
		}
		this.moduleAPIName = moduleAPIName;
		this.recordId = recordId;
		this.fieldsAttachmentId = fieldsAttachmentId;

	}

	/**
	 * The method to get field attachments
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getFieldAttachments()	{
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/");
		apiPath = apiPath.concat(this.moduleAPIName.toString());
		apiPath = apiPath.concat("/");
		apiPath = apiPath.concat(this.recordId.toString());
		apiPath = apiPath.concat("/actions/download_fields_attachment");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addParam(new Param("fields_attachment_id", "com.zoho.crm.api.FieldAttachments.GetFieldAttachmentsParam"), this.fieldsAttachmentId);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/x-download");

	}

}
class GetFieldAttachmentsParam{

}

module.exports = {
	MasterModel : FieldAttachmentsOperations,
	FieldAttachmentsOperations : FieldAttachmentsOperations,
	GetFieldAttachmentsParam : GetFieldAttachmentsParam
}
