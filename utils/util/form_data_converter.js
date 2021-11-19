const Converter = require("./converter").Converter;
const StreamWrapper = require("./stream_wrapper").StreamWrapper;
const Initializer = require("../../routes/initializer").Initializer;
const Constants = require("./constants").Constants;
const formData = require("form-data");

/**
 * This class is to process the upload file and stream.
 * @extends {Converter}
 */
class FormDataConverter extends Converter {
    uniqueValuesMap = [];

    constructor(commonApiHandler) {
        super(commonApiHandler);
    }

    async appendToRequest(requestBase, requestObject) {
        var formDataRequestBody = new formData();

        await this.addFileBody(requestBase.getRequestBody(), formDataRequestBody);

        return formDataRequestBody;
    }

    async addFileBody(requestObject, formData) {
        let requestKeys = Object.keys(requestObject);

        for (let key of requestKeys) {
            let value = requestObject[key];

            if (Array.isArray(value)) {
                for (let fileObject of value) {
                    if (fileObject instanceof StreamWrapper) {
                        formData.append(key, fileObject.getStream());
                    }
                    else {
                        formData.append(key, fileObject);
                    }
                }
            }
            else if (value instanceof StreamWrapper) {
                formData.append(key, value.getStream());
            }
            else {
                formData.append(key, value);
            }
        }
    }

    async formRequest(requestInstance, pack, instanceNumber, classMemberDetail) {
        var classDetail = Initializer.jsonDetails[pack];

        var request = {};

        if (classDetail.hasOwnProperty(Constants.INTERFACE) && classDetail[Constants.INTERFACE]) {
            var classes = classDetail[Constants.CLASSES];

            var baseName = pack.split('/').slice(0, -1);

            let className = this.getFileName(requestInstance.constructor.name);

            baseName.push(className);

            let requestObjectClassName = baseName.join('/');

            for (let className in classes) {
                if (classes[className].toLowerCase() == requestObjectClassName) {
                    classDetail = Initializer.jsonDetails[requestObjectClassName];

                    break;
                }
            }
        }

        for (let memberName in classDetail) {
            var modification = null;

            var memberDetail = classDetail[memberName];

            if ((memberDetail.hasOwnProperty(Constants.READ_ONLY) && memberDetail[Constants.READ_ONLY] == 'true') || !memberDetail.hasOwnProperty(Constants.NAME)) {
                continue;
            }

            try {
                modification = requestInstance.isKeyModified(memberDetail[Constants.NAME]);
            }
            catch (e) {
                throw new SDKException(Constants.EXCEPTION_IS_KEY_MODIFIED, null, null, e);
            }

            // check required
            if ((modification == null || modification == 0) && memberDetail.hasOwnProperty(Constants.REQUIRED) && memberDetail[Constants.REQUIRED] == 'true') {
                throw new SDKException(Constants.MANDATORY_VALUE_ERROR, Constants.MANDATORY_KEY_ERROR + memberName);
            }

            var fieldValue = Reflect.get(requestInstance, memberName);

            if (modification != null && modification != 0 && await this.valueChecker(requestInstance.constructor.name, memberName, memberDetail, fieldValue, this.uniqueValuesMap, instanceNumber)) {
                var keyName = memberDetail[Constants.NAME];

                var type = memberDetail[Constants.TYPE];

                if (type.toLowerCase() == Constants.LIST_NAMESPACE.toLowerCase()) {
                    request[keyName] = await this.setJSONArray(fieldValue, memberDetail);
                }
                else if (type.toLowerCase() == Constants.MAP_NAMESPACE.toLowerCase()) {
                    request[keyName] = await this.setJSONObject(fieldValue, memberDetail);
                }
                else if (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME)) {
                    request[keyName] = await this.formRequest(fieldValue, memberDetail[Constants.STRUCTURE_NAME], 0, memberDetail);
                }
                else {
                    request[keyName] = fieldValue;
                }
            }
        }

        return request;
    }

    getFileName(name) {
        let fileName = [];

        let nameParts = name.split(/([A-Z][a-z]+)/).filter(function (e) { return e });

        fileName.push(nameParts[0].toLowerCase());

        for (let i = 1; i < nameParts.length; i++) {
            fileName.push(nameParts[i].toLowerCase());
        }

        return fileName.join("_");
    }

    async setJSONObject(fieldValue, memberDetail) {
        var jsonObject = {};

        var requestObject = fieldValue;

        if (memberDetail == null) {
            for (let key of Array.from(requestObject.keys())) {
                jsonObject[key] = this.redirectorForObjectToJSON(requestObject.get(key));
            }
        }
        else {
            var keysDetail = memberDetail[Constants.KEYS];

            for (let keyIndex = 0; keyIndex < keysDetail.length; keyIndex++) {
                let keyDetail = keysDetail[keyIndex];

                let keyName = keyDetail[Constants.NAME];

                let keyValue = null;

                if (requestObject.has(keyName) && requestObject.get(keyName) != null) {
                    if (keyDetail.hasOwnProperty(Constants.STRUCTURE_NAME)) {
                        keyValue = await this.formRequest(requestObject.get(keyName), keyDetail[Constants.STRUCTURE_NAME], 0, memberDetail);
                    }
                    else {
                        keyValue = await this.redirectorForObjectToJSON(requestObject.get(keyName));
                    }
                }

                jsonObject[keyName] = keyValue;
            }
        }

        return jsonObject;
    }

    async setJSONArray(fieldValue, memberDetail) {
        var jsonArray = [];

        var requestObjects = fieldValue;

        if (memberDetail == null) {
            for (let request of requestObjects) {
                jsonArray.push(await this.redirectorForObjectToJSON(request));
            }
        }
        else {
            if (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME)) {
                let instanceCount = 0;

                let pack = memberDetail[Constants.STRUCTURE_NAME];

                for (let request of requestObjects) {
                    jsonArray.push(await this.formRequest(request, pack, instanceCount++, memberDetail));
                }
            }
            else {
                for (let request of requestObjects) {
                    jsonArray.push(await this.redirectorForObjectToJSON(request));
                }
            }
        }

        return jsonArray;
    }

    async redirectorForObjectToJSON(request) {
        let type = Object.prototype.toString.call(request)

        if (type == Constants.ARRAY_TYPE) {
            return await this.setJSONArray(request, null);
        }
        else if (type == Constants.MAP_TYPE) {
            return await this.setJSONObject(request, null);
        }
        else {
            return request;
        }
    }

    getWrappedResponse(responseObject, pack) {
        return this.getResponse(responseObject, pack);
    }

    getResponse(responseJson, pack) {
        return null;
    }
}

module.exports = {
    MasterModel: FormDataConverter,
    FormDataConverter: FormDataConverter
};
