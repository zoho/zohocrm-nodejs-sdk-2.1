import {HeaderParamValidator} from "../utils/util/header_param_validator.js";

import {SDKException} from "../core/com/zoho/crm/api/exception/sdk_exception.js";

import {Constants} from "../utils/util/constants.js";

/**
 * This class represents the HTTP header name and value.
 */
class HeaderMap {
	headerMap = new Map();

	/**
	 * This is a getter method to get the header map.
	 * @returns {Map} A Map representing the API request headers.
	 */
	getHeaderMap() {
		return this.headerMap;
	}

	/**
	 * The method to add the header name and value.
	 * @param {Header} header - A Header class instance.
	 * @param {object} value - An object containing the header value.
	 * @throws {SDKException}
	 */
	async add(header, value) {

		if (header == null) {
			throw new SDKException(Constants.HEADER_NULL_ERROR, Constants.HEADER_INSTANCE_NULL_ERROR);
		}
		var headerName = header.getName();

		if (headerName == null) {
			throw new SDKException(Constants.HEADER_NAME_NULL_ERROR, Constants.HEADER_NAME_NULL_ERROR_MESSAGE);
		}

		if (value == null) {
			throw new SDKException(Constants.HEADER_NULL_ERROR, headerName + Constants.NULL_VALUE_ERROR_MESSAGE);
		}

		var headerClassName = header.getClassName();

		var parsedHeaderValue = null;

		if (headerClassName != null) {
			let headerParamValidator = new HeaderParamValidator();

			parsedHeaderValue = await headerParamValidator.validate(header, value).catch(err=> { throw err;});
		}

		if (this.headerMap.has(headerName) && this.headerMap.get(headerName) != null) {
			let headerValue = this.headerMap.get(headerName);

			headerValue = headerValue.concat(",", parsedHeaderValue.toString());

			this.headerMap.set(headerName, headerValue);

		}
		else {
			this.headerMap.set(headerName, parsedHeaderValue.toString());
		}
	}
}

export {
	HeaderMap as HeaderMap,
	HeaderMap as MasterModel
}
