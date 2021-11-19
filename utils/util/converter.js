const Constants = require("./constants").Constants;
const SDKException = require("../../core/com/zoho/crm/api/exception/sdk_exception").SDKException;
const Initializer = require("../../routes/initializer").Initializer;
const Choice = require("./choice").Choice;

/**
 * This class is to construct API request and response.
 */
class Converter {
	commonAPIHandler;

	/**
	 * Creates a Converter class instance with the CommonAPIHandler class instance.
	 * @param {CommonAPIHandler} commonAPIHandler - A CommonAPIHandler class instance.
	 */
	constructor(commonAPIHandler) {
		this.commonAPIHandler = commonAPIHandler;
	}

	/**
	 * This abstract method is to process the API response.
	 * @param {object} response - An Object containing the API response contents or response.
	 * @param {string} pack - A String containing the expected method return type.
	 * @returns An Object representing the class instance.
	 * @throws {Error}
	 */
	getResponse(response, pack) { }

	/**
	 * This method is to construct the API request.
	 * @param {object} requestObject - An Object containing the class instance.
	 * @param {string} pack - A String containing the expected method return type.
	 * @param {int} instanceNumber - An Integer containing the class instance list number.
	 * @param {object} memberDetail - An object containing the member properties
	 * @returns An Object representing the API request body object.
	 * @throws {Error}
	 */
	formRequest(responseObject, pack, instanceNumber, memberDetail) { }

	/**
	 * This abstract method is to construct the API request body.
	 * @param {object} requestBase
	 * @param {object} requestObject - A Object containing the API request body object.
	 * @throws {Error}
	 */
	appendToRequest(requestBase, requestObject) { }

	/**
	 * This abstract method is to process the API response.
	 * @param {object} response - An Object containing the HttpResponse class instance.
	 * @param {string} pack - A String containing the expected method return type.
	 * @returns An Object representing the class instance.
	 * @throws {Error}
	 */
	getWrappedResponse(response, pack) { }

	/**
	 * This method is to validate if the input values satisfy the constraints for the respective fields.
	 * @param {string} className - A String containing the class name.
	 * @param {string} memberName - A String containing the member name.
	 * @param {object} keyDetails - A JSONObject containing the key JSON details.
	 * @param {object} value - A Object containing the key value.
	 * @param {Map} uniqueValuesMap - A Map containing the value of constructed object's unique fields.
	 * @param {int} instanceNumber - An Integer containing the class instance list number.
	 * @returns A Boolean representing the key value is expected pattern, unique, length, and values.
	 * @throws {SDKException}
	 */
	async valueChecker(className, memberName, keyDetails, value, uniqueValuesMap, instanceNumber) {
		const Utility = require("./utility").Utility;

		var detailsJO = {};

		var name = keyDetails[Constants.NAME];

		var type = keyDetails[Constants.TYPE];

		var valueType = Object.prototype.toString.call(value);

		let check = true;

		let givenType = null;

		if (Constants.TYPE_VS_DATATYPE.has(type.toLowerCase())) {
			if (Array.isArray(value) && keyDetails.hasOwnProperty(Constants.STRUCTURE_NAME)) {
				let structureName = keyDetails[Constants.STRUCTURE_NAME];

				let index = 0;

				let className = require("../../" + structureName).MasterModel;

				for (let data of value) {
					if (!(data instanceof className)) {
						check = false;

						instanceNumber = index;

						let baseName = structureName.split("/").pop();

						let classNameSplit = baseName.split("_");

						let expectedClassName = "";

						for (var nameIndex = 0; nameIndex < classNameSplit.length; nameIndex++) {
							var fieldName = classNameSplit[nameIndex];

							var firstLetterUppercase = fieldName[0].toUpperCase() + fieldName.slice(1);

							expectedClassName = expectedClassName.concat(firstLetterUppercase);
						}

						type = Constants.ARRAY_KEY + "(" + expectedClassName + ")";

						givenType = Constants.ARRAY_KEY + "(" + data.constructor.name + ")";

						break;
					}

					index = index + 1;
				}
			}
			else if (value != null) {
				check = (valueType != Constants.TYPE_VS_DATATYPE.get(type.toLowerCase()) ? false : true);

				if (check && type == Constants.INTEGER_NAMESPACE) {
					check = Utility.checkInteger(value);
				}

				givenType = Object.getPrototypeOf(value).constructor.name;
			}
		}
		else if (value != null && type.toLowerCase() !== Constants.OBJECT_KEY) {
			let expectedStructure = keyDetails[Constants.TYPE];

			let className = require("../../" + expectedStructure).MasterModel;

			if (!(value instanceof className)) {
				check = false;

				type = expectedStructure;

				givenType = value.constructor.name;
			}

			if (check == false) {
				if (givenType.toLowerCase() == Constants.INVENTORYTEMPLATE && type.toLowerCase() == Constants.TEMPLATE) {
					check = true;
				}
			}
		}

		if (!check) {
			detailsJO[Constants.ERROR_HASH_FIELD] = name;

			detailsJO[Constants.ERROR_HASH_CLASS] = className;

			detailsJO[Constants.ACCEPTED_TYPE] = Constants.SPECIAL_TYPES.has(type) ? Constants.SPECIAL_TYPES.get(type) : type;

			detailsJO[Constants.GIVEN_TYPE] = givenType;

			if (instanceNumber != null) {
				detailsJO[Constants.INDEX] = instanceNumber;
			}

			throw new SDKException(Constants.TYPE_ERROR, null, detailsJO, null);
		}

		let initializer = await Initializer.getInitializer();

		if (keyDetails.hasOwnProperty(Constants.VALUES) && (!keyDetails.hasOwnProperty(Constants.PICKLIST) || (keyDetails[Constants.PICKLIST] && initializer.getSDKConfig().getPickListValidation() == true))) {
			let valuesJA = keyDetails[Constants.VALUES];

			if (value instanceof Choice) {
				value = value.getValue();
			}

			if (!valuesJA.includes(value)) {
				detailsJO[Constants.ERROR_HASH_FIELD] = memberName;

				detailsJO[Constants.ERROR_HASH_CLASS] = className;

				if (instanceNumber != null) {
					detailsJO[Constants.INDEX] = instanceNumber;
				}

				detailsJO[Constants.GIVEN_VALUE] = value;

				detailsJO[Constants.ACCEPTED_VALUES] = valuesJA;

				throw new SDKException(Constants.UNACCEPTED_VALUES_ERROR, null, detailsJO);
			}
		}

		if (keyDetails.hasOwnProperty(Constants.UNIQUE)) {
			let valuesArray = uniqueValuesMap[name];

			if (valuesArray != null && valuesArray.includes(value)) {
				detailsJO[Constants.ERROR_HASH_FIELD] = memberName;

				detailsJO[Constants.ERROR_HASH_CLASS] = className;

				detailsJO[Constants.FIRST_INDEX] = valuesArray.indexOf(value);

				detailsJO[Constants.NEXT_INDEX] = instanceNumber;

				throw new SDKException(Constants.UNIQUE_KEY_ERROR, null, detailsJO);
			}
			else {
				if (valuesArray == null) {
					valuesArray = [];
				}

				valuesArray.push(value);

				uniqueValuesMap[name] = valuesArray;
			}
		}

		if (keyDetails.hasOwnProperty(Constants.MIN_LENGTH) || keyDetails.hasOwnProperty(Constants.MAX_LENGTH)) {
			let count = value.toString().length;

			if (Array.isArray(value)) {
				count = value.length;
			}

			if (keyDetails.hasOwnProperty(Constants.MAX_LENGTH) && (count > keyDetails[Constants.MAX_LENGTH])) {
				detailsJO[Constants.ERROR_HASH_FIELD] = memberName;

				detailsJO[Constants.ERROR_HASH_CLASS] = className;

				detailsJO[Constants.GIVEN_LENGTH] = count;

				detailsJO[Constants.ERROR_HASH_MAXIMUM_LENGTH] = keyDetails[Constants.MAX_LENGTH];

				throw new SDKException(Constants.MAXIMUM_LENGTH_ERROR, null, detailsJO);
			}

			if (keyDetails.hasOwnProperty(Constants.MIN_LENGTH) && count < keyDetails[Constants.MIN_LENGTH]) {
				detailsJO[Constants.ERROR_HASH_FIELD] = memberName;

				detailsJO[Constants.ERROR_HASH_CLASS] = className;

				detailsJO[Constants.GIVEN_LENGTH] = count;

				detailsJO[Constants.ERROR_HASH_MINIMUM_LENGTH] = keyDetails[Constants.MIN_LENGTH];

				throw new SDKException(Constants.MINIMUM_LENGTH_ERROR, null, detailsJO);
			}
		}

		if (keyDetails.hasOwnProperty(Constants.REGEX) && !keyDetails[Constants.REGEX].match(value)) {
			detailsJO[Constants.ERROR_HASH_FIELD] = memberName;

			detailsJO[Constants.ERROR_HASH_CLASS] = className;

			if (instanceNumber != null) {
				detailsJO[Constants.INDEX] = instanceNumber;
			}

			throw new SDKException(Constants.REGEX_MISMATCH_ERROR, null, detailsJO);
		}

		return true;
	}

	async getEncodedFileName() {
		let initializer = await Initializer.getInitializer();

		var fileName = initializer.getUser().getEmail();

		fileName = (fileName).substring(0, (fileName.indexOf('@'))) + initializer.getEnvironment().getUrl();

		var input = this.toUTF8Array(fileName);

		var str = Buffer.from(input).toString('base64')

		return str.concat(".json");
	}

	toUTF8Array(str) {
		var utf8 = [];

		for (var i = 0; i < str.length; i++) {
			var charcode = str.charCodeAt(i);

			if (charcode < 0x80) utf8.push(charcode);
			else if (charcode < 0x800) {
				utf8.push(0xc0 | (charcode >> 6),
					0x80 | (charcode & 0x3f));
			}
			else if (charcode < 0xd800 || charcode >= 0xe000) {
				utf8.push(0xe0 | (charcode >> 12),
					0x80 | ((charcode >> 6) & 0x3f),
					0x80 | (charcode & 0x3f));
			}
			else {
				i++;
				// UTF-16 encodes 0x10000-0x10FFFF by
				// subtracting 0x10000 and splitting the
				// 20 bits of 0x0-0xFFFFF into two halves
				charcode = 0x10000 + (((charcode & 0x3ff) << 10)
					| (str.charCodeAt(i) & 0x3ff));

				utf8.push(0xf0 | (charcode >> 18),
					0x80 | ((charcode >> 12) & 0x3f),
					0x80 | ((charcode >> 6) & 0x3f),
					0x80 | (charcode & 0x3f));
			}
		}
		return utf8;
	}
}

module.exports = {
	MasterModel: Converter,
	Converter: Converter
}