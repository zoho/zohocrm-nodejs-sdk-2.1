const Header = require("../../../../../../routes/header").MasterModel;
const APIResponse = require("../../../../../../routes/controllers/api_response").MasterModel;
const CommonAPIHandler = require("../../../../../../routes/middlewares/common_api_handler").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ProfilesOperations{

	ifModifiedSince;
	/**
	 * Creates an instance of ProfilesOperations with the given parameters
	 * @param {Date} ifModifiedSince An instance of Date
	 */
	constructor(ifModifiedSince=null){
		if((ifModifiedSince != null) && (!(ifModifiedSince instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: ifModifiedSince EXPECTED TYPE: Date", null, null);
		}
		this.ifModifiedSince = ifModifiedSince;

	}

	/**
	 * The method to get profiles
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getProfiles()	{
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/profiles");
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addHeader(new Header("If-Modified-Since", "com.zoho.crm.api.Profiles.GetProfilesHeader"), this.ifModifiedSince);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

	/**
	 * The method to get profile
	 * @param {BigInt} id A BigInt representing the id
	 * @returns {APIResponse} An instance of APIResponse
	 * @throws {SDKException}
	 */
	async getProfile(id)	{
		if((!(Object.prototype.toString.call(id) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: id EXPECTED TYPE: BigInt", null, null);
		}
		var handlerInstance = new CommonAPIHandler();
		var apiPath = '';
		apiPath = apiPath.concat("/crm/v2.1/settings/profiles/");
		apiPath = apiPath.concat(id.toString());
		handlerInstance.setAPIPath(apiPath);
		handlerInstance.setHttpMethod(Constants.REQUEST_METHOD_GET);
		handlerInstance.setCategoryMethod(Constants.REQUEST_CATEGORY_READ);
		await handlerInstance.addHeader(new Header("If-Modified-Since", "com.zoho.crm.api.Profiles.GetProfileHeader"), this.ifModifiedSince);
		let ResponseHandler = require.resolve("./response_handler");
		return handlerInstance.apiCall(ResponseHandler, "application/json");

	}

}
class GetProfilesHeader{

}

class GetProfileHeader{

}

module.exports = {
	GetProfilesHeader : GetProfilesHeader,
	GetProfileHeader : GetProfileHeader,
	MasterModel : ProfilesOperations,
	ProfilesOperations : ProfilesOperations
}
