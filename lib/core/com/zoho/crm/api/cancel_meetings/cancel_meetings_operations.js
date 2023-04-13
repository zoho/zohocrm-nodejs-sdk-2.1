import {BodyWrapper} from "./body_wrapper.js";
import {SDKException} from "../exception/sdk_exception.js";
import {APIResponse} from "../../../../../../routes/controllers/api_response.js";
import {CommonAPIHandler} from "../../../../../../routes/middlewares/common_api_handler.js";
import {createRequire} from "node:module";
import {Constants} from "../../../../../../utils/util/constants.js";
class CancelMeetingsOperations{

	eventId;
	/**
	 * Creates an instance of CancelMeetingsOperations with the given parameters
	 * @param {BigInt} eventId A BigInt representing the eventId
	 */
	constructor(eventId){
		if((!(Object.prototype.toString.call(eventId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: eventId EXPECTED TYPE: BigInt", null, null);
		}
		this.eventId = eventId;

	}

	/**
	 * The method to cancel meetings
	 * @param {BodyWrapper} request An instance of BodyWrapper
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async cancelMeetings(request)	{
		if((request != null) && (!(request instanceof BodyWrapper)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: request EXPECTED TYPE: BodyWrapper", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/Events/");
		apiPath = apiPath.concat(this.eventId.toString());
		apiPath = apiPath.concat("/actions/cancel");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_POST);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_ACTION);
		handlerInstance.setContentType("application/json");
		handlerInstance.setRequest(request);
		const require = createRequire(import.meta.url);
		let ActionHandler = require.resolve("./action_handler.js");
		return handlerInstance.apiCall(ActionHandler, "application/json");

	}

}
export {
	CancelMeetingsOperations as MasterModel,
	CancelMeetingsOperations as CancelMeetingsOperations
}
