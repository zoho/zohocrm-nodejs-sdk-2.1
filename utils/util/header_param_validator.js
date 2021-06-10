const path = require("path");
const Constants = require("./constants").Constants;
const SDKException = require("../../core/com/zoho/crm/api/exception/sdk_exception").SDKException
const DataTypeConverter = require("./datatype_converter").DatatypeConverter;
const Utility = require("./utility").Utility;
/**
 * This class validates the Header and Parameter values with the type accepted by the CRM APIs.
 */
class HeaderParamValidator {
    async validate(headerParam, value) {
        let name = headerParam.getName();

        let className = headerParam.getClassName();

        let jsonDetails = await this.getJSONDetails();

        let jsonClassName = await this.getFileName(className);

        let typeDetail = null;

        if (jsonDetails.hasOwnProperty(jsonClassName)) {
            typeDetail = await this.getKeyJSONDetails(name, jsonDetails[jsonClassName]);
        }

        if (typeDetail != null) {
            if (!await this.checkDataType(typeDetail, value)) {
                let type = jsonClassName != null && jsonClassName.endsWith("param") ? "PARAMETER" : "HEADER";

                let detailsJO = {};

                detailsJO[type] = name;

                detailsJO[Constants.CLASS_KEY] = className;

                detailsJO[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.SPECIAL_TYPES.has(typeDetail[Constants.TYPE]) ? Constants.SPECIAL_TYPES.get(typeDetail[Constants.TYPE]) : typeDetail[Constants.TYPE];

                throw new SDKException(Constants.TYPE_ERROR, null, detailsJO, null);
            }
            else {
                value = DataTypeConverter.postConvert(value, typeDetail[Constants.TYPE]);
            }
        }

        return value;
    }

    async getJSONDetails() {
        let Initializer = require("../../routes/initializer").Initializer;

        if (Initializer.jsonDetails == null) {
            Initializer.jsonDetails = await Initializer.getJSON(path.join(__dirname, "..", "..", Constants.CONFIG_DIRECTORY, Constants.JSON_DETAILS_FILE_PATH));
        }

        return Initializer.jsonDetails;
    }

    getFileName(name) {
        let fileName = [];

        let spl = name.toString().split(".");

        let className = spl.pop();

        let nameParts = className.split(/([A-Z][a-z]+)/).filter(function (e) { return e });

        fileName.push(nameParts[0].toLowerCase());

        for (let i = 1; i < nameParts.length; i++) {
            fileName.push(nameParts[i].toLowerCase());
        }

        return "core/" + spl.join("/").toLowerCase() + "/" + fileName.join("_");
    }

    async getKeyJSONDetails(name, jsonDetails) {
        let keyArray = Array.from(Object.keys(jsonDetails));
        for (let index = 0; index < keyArray.length; index++) {
            const key = keyArray[index];

            let detail = jsonDetails[key];

            if (detail.hasOwnProperty(Constants.NAME) && detail[Constants.NAME].toLowerCase() == name.toLowerCase()) {
                return detail;
            }
        }
    }

    async checkDataType(keyDetail, value) {
        let type = keyDetail[Constants.TYPE];

        let dataType = Constants.SPECIAL_TYPES.has(type) ? Constants.SPECIAL_TYPES.get(type) : type;

        if (Constants.TYPE_VS_DATATYPE.has(dataType.toLowerCase())) {
            if (type == Constants.INTEGER_NAMESPACE) {
                return Utility.checkInteger(value);
            }
            if (Object.prototype.toString.call(value) != Constants.TYPE_VS_DATATYPE.get(type.toLowerCase())) {
                return false;
            }
        }

        return true;
    }
}

module.exports = {
    MasterModel: HeaderParamValidator,
    HeaderParamValidator: HeaderParamValidator
}