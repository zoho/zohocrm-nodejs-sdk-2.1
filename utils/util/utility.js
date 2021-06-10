const path = require('path');
const Converter = require("./converter").Converter;
const Initializer = require("../../routes/initializer").Initializer;
const Constants = require("../util/constants").Constants;
const Logger = require("winston");
const fs = require('fs');
const SDKException = require('../../core/com/zoho/crm/api/exception/sdk_exception').SDKException;

/**
 * This class handles module field details.
 */
class Utility {
    static apiTypeVsdataType = new Map();

    static apiTypeVsStructureName = new Map();

    static newFile = false;

    static getModifiedModules = false;

    static forceRefresh = false;

    static moduleAPIName;

    static apiSupportedModule = new Map();

    static async assertNotNull(value, errorCode, errorMessage) {
        if (value == null) {
            throw new SDKException(errorCode, errorMessage);
        }
    }

    static async fileExistsFlow(moduleAPIName, recordFieldDetailsPath, lastModifiedTime) {
        let recordFieldDetailsJson = Initializer.getJSON(recordFieldDetailsPath);

        let initializer = await Initializer.getInitializer();

        if (initializer.getSDKConfig().getAutoRefreshFields() == true && !this.newFile && !this.getModifiedModules && (!(recordFieldDetailsJson.hasOwnProperty(Constants.FIELDS_LAST_MODIFIED_TIME)) || this.forceRefresh || (new Date().getTime() - recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME]) > 3600000)) {
            this.getModifiedModules = true;

            lastModifiedTime = !this.forceRefresh && recordFieldDetailsJson.hasOwnProperty(Constants.FIELDS_LAST_MODIFIED_TIME) ? recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME] : null;

            await Utility.modifyFields(recordFieldDetailsPath, lastModifiedTime);

            this.getModifiedModules = false;
        }
        else if (initializer.getSDKConfig().getAutoRefreshFields() == false && this.forceRefresh && !this.getModifiedModules) {
            this.getModifiedModules = true;

            await Utility.modifyFields(recordFieldDetailsPath, lastModifiedTime);

            this.getModifiedModules = false;
        }

        recordFieldDetailsJson = Initializer.getJSON(recordFieldDetailsPath);

        if (moduleAPIName == null || (recordFieldDetailsJson.hasOwnProperty(moduleAPIName.toLowerCase()) && recordFieldDetailsJson[moduleAPIName.toLowerCase()] != null)) {
            return;
        }
        else {
            await Utility.fillDataType();

            recordFieldDetailsJson[moduleAPIName.toLowerCase()] = {};

            fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

            let fieldsDetails = await Utility.getFieldsDetails(moduleAPIName);

            recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

            recordFieldDetailsJson[moduleAPIName.toLowerCase()] = fieldsDetails;

            fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));
        }
    }

    static async verifyModuleAPIName(moduleName) {
        if (moduleName != null && Constants.DEFAULT_MODULENAME_VS_APINAME.has(moduleName.toLowerCase()) && Constants.DEFAULT_MODULENAME_VS_APINAME.get(moduleName.toLowerCase()) != null) {
            return Constants.DEFAULT_MODULENAME_VS_APINAME.get(moduleName.toLowerCase());
        }

        var recordFieldDetailsPath = await this.getFileName();

        if (fs.existsSync(recordFieldDetailsPath)) {
            let fieldsJSON = Initializer.getJSON(recordFieldDetailsPath);

            if (fieldsJSON.hasOwnProperty(Constants.SDK_MODULE_METADATA) && fieldsJSON[Constants.SDK_MODULE_METADATA].hasOwnProperty(moduleName.toLowerCase())) {
                let moduleMeta = fieldsJSON[Constants.SDK_MODULE_METADATA];

                return moduleMeta[moduleName.toLowerCase()][Constants.API_NAME];
            }
        }

        return moduleName;
    }

    static async setHandlerAPIPath(moduleAPIName, handlerInstance) {
        if (handlerInstance == null) {
            return;
        }

        let apiPath = handlerInstance.getAPIPath();

        if (apiPath.toLowerCase().includes(moduleAPIName.toLowerCase())) {
            let apiPathSplit = apiPath.split("/");

            for (var i = 0; i < apiPathSplit.length; i++) {
                if (apiPathSplit[i].toLowerCase() == moduleAPIName.toLowerCase()) {
                    apiPathSplit[i] = moduleAPIName;
                }
                else if (Constants.DEFAULT_MODULENAME_VS_APINAME.has(apiPathSplit[i].toLowerCase()) && Constants.DEFAULT_MODULENAME_VS_APINAME.get(apiPathSplit[i].toLowerCase()) != null) {
                    apiPathSplit[i] = Constants.DEFAULT_MODULENAME_VS_APINAME.get(apiPathSplit[i].toLowerCase());
                }
            }

            apiPath = apiPathSplit.join("/");

            handlerInstance.setAPIPath(apiPath);
        }
    }

    /**
     * This method to fetch field details of the current module for the current user and store the result in a JSON file.
     * @param {string} moduleAPIName - A String containing the CRM module API name.
     * @param {string} handlerInstance - A String containing CommonAPIHandler Instance.
     */
    static async getFields(moduleAPIName, handlerInstance = null) {
        this.moduleAPIName = moduleAPIName;

        await this.getFieldsInfo(this.moduleAPIName, handlerInstance);
    }

    /**
     * This method to fetch field details of the current module for the current user and store the result in a JSON file.
     * @param {string} moduleAPIName - A String containing the CRM module API name.
     * @param {string} handlerInstance - A String containing CommonAPIHandler Instance.
     */
    static async getFieldsInfo(moduleAPIName, handlerInstance = null) {
        let lastModifiedTime = null;

        var recordFieldDetailsPath = null;

        try {
            if (moduleAPIName != null && await Utility.searchJSONDetails(moduleAPIName) != null) {
                return;
            }

            let initializer = await Initializer.getInitializer();

            var resourcesPath = path.join(initializer.getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY);

            if (!fs.existsSync(resourcesPath)) {
                fs.mkdirSync(resourcesPath, { recursive: true });
            }

            moduleAPIName = await Utility.verifyModuleAPIName(moduleAPIName);

            await Utility.setHandlerAPIPath(moduleAPIName, handlerInstance);

            recordFieldDetailsPath = await this.getFileName();

            if (fs.existsSync(recordFieldDetailsPath)) {
                await Utility.fileExistsFlow(moduleAPIName, recordFieldDetailsPath, lastModifiedTime);
            }
            else if (initializer.getSDKConfig().getAutoRefreshFields() == true) {
                this.newFile = true;

                await Utility.fillDataType();

                this.apiSupportedModule = this.apiSupportedModule.size > 0 ? this.apiSupportedModule : await Utility.getModules(null);

                let recordFieldDetailsJson = fs.existsSync(recordFieldDetailsPath) ? Initializer.getJSON(recordFieldDetailsPath) : {};

                recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME] = new Date().getTime();

                if (Object.keys(this.apiSupportedModule).length > 0) {
                    for (let module in this.apiSupportedModule) {
                        if (!recordFieldDetailsJson.hasOwnProperty(module)) {
                            let moduleData = this.apiSupportedModule.get(module);

                            recordFieldDetailsJson[module] = {};

                            fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

                            let fieldsDetails = await Utility.getFieldsDetails(moduleData[Constants.API_NAME]);

                            recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

                            recordFieldDetailsJson[module] = fieldsDetails;

                            fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));
                        }
                    }
                }

                this.newFile = false;
            }
            else if (this.forceRefresh && !this.getModifiedModules) {
                //New file - and force refresh by Users
                this.getModifiedModules = true;

                let recordFieldDetailsJson = {};

                fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

                await Utility.modifyFields(recordFieldDetailsPath, lastModifiedTime);

                this.getModifiedModules = false;
            }
            else {
                await Utility.fillDataType();

                let recordFieldDetailsJson = {};

                recordFieldDetailsJson[moduleAPIName.toLowerCase()] = {};

                fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

                let fieldsDetails = await Utility.getFieldsDetails(moduleAPIName);

                recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

                recordFieldDetailsJson[moduleAPIName.toLowerCase()] = fieldsDetails;

                fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));
            }
        }
        catch (error) {
            if (recordFieldDetailsPath != null && fs.existsSync(recordFieldDetailsPath)) {
                try {
                    let recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

                    if (recordFieldDetailsJson.hasOwnProperty(moduleAPIName.toLowerCase())) {
                        delete recordFieldDetailsJson[moduleAPIName.toLowerCase()];
                    }

                    if (this.newFile) {
                        if (recordFieldDetailsJson.hasOwnProperty(Constants.FIELDS_LAST_MODIFIED_TIME)) {
                            delete recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME]
                        }

                        this.newFile = false;
                    }

                    if (this.getModifiedModules || this.forceRefresh) {
                        this.getModifiedModules = false;

                        this.forceRefresh = false;

                        if (lastModifiedTime != null) {
                            recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME] = lastModifiedTime;
                        }
                    }

                    fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));
                }
                catch (error) {
                    error = new SDKException(null, null, null, error);

                    Logger.error(Constants.EXCEPTION, error);

                    throw error;
                }
            }

            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            Logger.error(Constants.EXCEPTION, error);

            throw error;
        }
    }

    static async modifyFields(recordFieldDetailsPath, modifiedTime) {
        let modifiedModules = await this.getModules(modifiedTime);

        let recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

        recordFieldDetailsJson[Constants.FIELDS_LAST_MODIFIED_TIME] = new Date().getTime();

        fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

        if (Object.keys(modifiedModules).length > 0) {
            for (let module of modifiedModules) {
                if (recordFieldDetailsJson.hasOwnProperty(module)) {

                    delete recordFieldDetailsJson[module];
                }
            }

            fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));

            for (let module of modifiedModules) {
                let moduleData = modifiedModules[module];

                await Utility.getFieldsInfo(moduleData[Constants.API_NAME]);
            }
        }
    }

    static async deleteFields(recordFieldDetailsJson, module) {
        let subformModules = [];

        let fieldsJSON = recordFieldDetailsJson[module.toLowerCase()];

        for (let keyName of Object.keys(fieldsJSON)) {
            if (fieldsJSON[keyName].hasOwnProperty(Constants.SUBFORM) && fieldsJSON[keyName][Constants.SUBFORM] == true && recordFieldDetailsJson.hasOwnProperty((fieldsJSON[keyName][Constants.MODULE]).toLowerCase())) {
                subformModules.push(fieldsJSON[keyName][Constants.MODULE]);
            }
        }

        delete recordFieldDetailsJson[module.toLowerCase()];

        if (subformModules.length > 0) {
            for (let subformModule of subformModules) {
                await this.deleteFields(recordFieldDetailsJson, subformModule);
            }
        }
    }

    static async getFileName() {
        let initializer = await Initializer.getInitializer();

        return path.join(initializer.getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY, await new Converter().getEncodedFileName());
    }

    static async getRelatedLists(relatedModuleName, moduleAPIName, commonAPIHandler) {
        try {
            let isnewData = false;

            let key = (moduleAPIName + Constants.UNDERSCORE + Constants.RELATED_LISTS).toLowerCase();

            let initializer = await Initializer.getInitializer();

            let resourcesPath = path.join(initializer.getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY);

            if (!fs.existsSync(resourcesPath)) {
                fs.mkdirSync(resourcesPath, { recursive: true });
            }

            var recordFieldDetailsPath = await this.getFileName();

            let recordFieldDetailsJSON = null;

            if (!fs.existsSync(recordFieldDetailsPath) || (fs.existsSync(recordFieldDetailsPath) && (!Initializer.getJSON(recordFieldDetailsPath).hasOwnProperty(key) || (Initializer.getJSON(recordFieldDetailsPath)[key] == null) || Initializer.getJSON(recordFieldDetailsPath)[key].length <= 0))) {
                isnewData = true;

                let relatedListValues = await this.getRelatedListDetails(moduleAPIName);

                recordFieldDetailsJSON = fs.existsSync(recordFieldDetailsPath) ? await Initializer.getJSON(recordFieldDetailsPath) : {};

                recordFieldDetailsJSON[key] = relatedListValues;

                fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJSON));
            }

            recordFieldDetailsJSON = await Initializer.getJSON(recordFieldDetailsPath)

            let moduleRelatedList = recordFieldDetailsJSON.hasOwnProperty(key) ? recordFieldDetailsJSON[key] : {};

            if (!(await this.checkRelatedListExists(relatedModuleName, moduleRelatedList, commonAPIHandler)) && !isnewData) {
                delete recordFieldDetailsJSON[key];

                fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJSON));

                await Utility.getRelatedLists(relatedModuleName, moduleAPIName, commonAPIHandler);
            }

        } catch (error) {
            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            Logger.error(Constants.EXCEPTION, error);

            throw error;
        }
    }

    static async checkRelatedListExists(relatedModuleName, modulerelatedListArray, commonAPIHandler) {
        for (let index = 0; index < modulerelatedListArray.length; index++) {
            const relatedListObject = modulerelatedListArray[index];

            if (relatedListObject[Constants.API_NAME] != null && relatedListObject[Constants.API_NAME].toLowerCase() == relatedModuleName.toLowerCase()) {

                if (relatedListObject[Constants.HREF].toLowerCase() == Constants.NULL_VALUE) {
                    throw new SDKException(Constants.UNSUPPORTED_IN_API, commonAPIHandler.getHttpMethod() + " " + commonAPIHandler.getAPIPath() + Constants.UNSUPPORTED_IN_API_MESSAGE);
                }

                if (relatedListObject[Constants.MODULE].toLowerCase() != Constants.NULL_VALUE) {

                    commonAPIHandler.setModuleAPIName(relatedListObject[Constants.MODULE]);

                    await Utility.getFields(relatedListObject[Constants.MODULE]);
                }

                return true;
            }
        }

        return false;
    }

    static async getRelatedListDetails(moduleAPIName) {
        let RelatedListsOperations = require("../../core/com/zoho/crm/api/related_lists/related_lists_operations").RelatedListsOperations;

        let ResponseWrapper = require("../../core/com/zoho/crm/api/related_lists/response_wrapper").ResponseWrapper;

        let APIException = require("../../core/com/zoho/crm/api/related_lists/api_exception").APIException;

        let relatedListArray = [];

        let response = await new RelatedListsOperations(moduleAPIName).getRelatedLists();

        if (response != null) {
            if (response.getStatusCode() == Constants.NO_CONTENT_STATUS_CODE) {
                return relatedListArray;
            }

            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof ResponseWrapper) {
                    let relatedLists = responseObject.getRelatedLists();

                    relatedLists.forEach(relatedList => {
                        let relatedListDetail = {};

                        relatedListDetail[Constants.API_NAME] = relatedList.getAPIName();

                        relatedListDetail[Constants.MODULE] = relatedList.getModule() != null ? relatedList.getModule() : Constants.NULL_VALUE;

                        relatedListDetail[Constants.NAME] = relatedList.getName();

                        relatedListDetail[Constants.HREF] = relatedList.getHref() != null ? relatedList.getHref() : Constants.NULL_VALUE;

                        relatedListArray.push(relatedListDetail);
                    });
                }
                else if (responseObject instanceof APIException) {
                    let errorResponse = {};

                    errorResponse[Constants.CODE] = responseObject.getCode().getValue();

                    errorResponse[Constants.STATUS] = responseObject.getStatus().getValue();

                    errorResponse[Constants.MESSAGE] = responseObject.getMessage().getValue();

                    throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null)
                }
                else {
                    let errorResponse = {};

                    errorResponse[Constants.CODE] = response.getStatusCode();

                    throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null);
                }
            }
            else {
                let errorResponse = {};

                errorResponse[Constants.CODE] = response.getStatusCode();

                throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null);
            }
        }

        return relatedListArray;
    }

    /**
     * This method is to get module field data from Zoho CRM.
     * @param {string} moduleAPIName - A String containing the CRM module API name.
     * @returns {object} An Object representing the Zoho CRM module field details.
     */
    static async getFieldsDetails(moduleAPIName) {
        let FieldOperations = require("../../core/com/zoho/crm/api/fields/fields_operations").FieldsOperations;

        let FieldsResponseWrapper = require("../../core/com/zoho/crm/api/fields/response_wrapper").ResponseWrapper;

        let APIException = require("../../core/com/zoho/crm/api/fields/api_exception").APIException;

        let response = await new FieldOperations(moduleAPIName).getFields(null);

        let fieldsDetails = {};

        if (response != null) {
            if (response.getStatusCode() == Constants.NO_CONTENT_STATUS_CODE) {
                return fieldsDetails;
            }

            let responseHandler = response.getObject();

            if (responseHandler != null) {
                if (responseHandler instanceof FieldsResponseWrapper) {
                    let fields = await responseHandler.getFields();

                    for (let field in fields) {
                        let keyName = fields[field].getAPIName();

                        if (Constants.KEYS_TO_SKIP.includes(keyName)) {
                            continue;
                        }

                        let fieldDetail = {};

                        await Utility.setDataType(fieldDetail, fields[field], moduleAPIName);

                        fieldsDetails[fields[field].getAPIName()] = fieldDetail;
                    }

                    if (Constants.INVENTORY_MODULES.includes(moduleAPIName.toLowerCase())) {
                        let fieldDetail = {};

                        fieldDetail[Constants.NAME] = Constants.LINE_TAX;

                        fieldDetail[Constants.TYPE] = Constants.LIST_NAMESPACE;

                        fieldDetail[Constants.STRUCTURE_NAME] = Constants.LINE_TAX_NAMESPACE;

                        fieldDetail[Constants.LOOKUP] = true;

                        fieldsDetails[Constants.LINE_TAX] = fieldDetail;
                    }

                    if (moduleAPIName.toLowerCase() == Constants.NOTES) {
                        let fieldDetail = {};

                        fieldDetail[Constants.NAME] = Constants.ATTACHMENTS;

                        fieldDetail[Constants.TYPE] = Constants.LIST_NAMESPACE;

                        fieldDetail[Constants.STRUCTURE_NAME] = Constants.ATTACHMENTS_NAMESPACE;

                        fieldsDetails[Constants.ATTACHMENTS] = fieldDetail;
                    }
                }
                else if (responseHandler instanceof APIException) {
                    let errorResponse = {};

                    errorResponse[Constants.CODE] = responseHandler.getCode().getValue();

                    errorResponse[Constants.STATUS] = responseHandler.getStatus().getValue();

                    errorResponse[Constants.MESSAGE] = responseHandler.getMessage().getValue();

                    let exception = new SDKException(Constants.API_EXCEPTION, null, errorResponse, null);

                    if (this.moduleAPIName.toLowerCase() == moduleAPIName.toLowerCase()) {
                        throw exception;
                    }

                    Logger.error(Constants.API_EXCEPTION, exception);
                }
            }
            else {
                let errorResponse = {};

                errorResponse[Constants.CODE] = response.getStatusCode();

                throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null);
            }
        }

        return fieldsDetails;
    }

    static async searchJSONDetails(key) {
        key = Constants.PACKAGE_NAMESPACE + "/record/" + key;

        var jsonDetails = Initializer.jsonDetails;

        for (let keyInJSON in jsonDetails) {

            if (keyInJSON.toLowerCase() == key.toLowerCase()) {
                let returnJSON = {};

                returnJSON[Constants.MODULEPACKAGENAME] = keyInJSON;

                returnJSON[Constants.MODULEDETAILS] = jsonDetails[keyInJSON];

                return returnJSON;
            }
        }

        return null;
    }

    static async verifyPhotoSupport(moduleAPIName) {
        try {
            moduleAPIName = await Utility.verifyModuleAPIName(moduleAPIName);

            if (Constants.PHOTO_SUPPORTED_MODULES.includes(moduleAPIName.toLowerCase())) {
                return true;
            }

            let modules = await Utility.getModuleNames();

            if (modules.hasOwnProperty(moduleAPIName.toLowerCase()) && modules[moduleAPIName.toLowerCase()] != null) {
                let moduleMetaData = modules[moduleAPIName.toLowerCase()];

                if (moduleMetaData.hasOwnProperty(Constants.GENERATED_TYPE) && moduleMetaData[Constants.GENERATED_TYPE] != Constants.GENERATED_TYPE_CUSTOM) {
                    throw new SDKException(Constants.UPLOAD_PHOTO_UNSUPPORTED_ERROR, Constants.UPLOAD_PHOTO_UNSUPPORTED_MESSAGE + moduleAPIName);
                }
            }
        }
        catch (error) {
            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            Logger.error(Constants.EXCEPTION, error);

            throw error;
        }

        return true;
    }

    static async getModuleNames() {
        let moduleData = {};

        var resourcesPath = path.join((await Initializer.getInitializer()).getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY);

        if (!fs.existsSync(resourcesPath)) {
            fs.mkdirSync(resourcesPath, { recursive: true });
        }

        let recordFieldDetailsPath = await this.getFileName();

        if (!fs.existsSync(recordFieldDetailsPath) || (fs.existsSync(recordFieldDetailsPath) && Initializer.getJSON(recordFieldDetailsPath)[Constants.SDK_MODULE_METADATA] == null)) {
            moduleData = Utility.getModules(null);

            Utility.writeModuleMetaData(recordFieldDetailsPath, moduleData);

            return moduleData;
        }

        let recordFieldDetailsJson = Initializer.getJSON(recordFieldDetailsPath);

        return recordFieldDetailsJson[Constants.SDK_MODULE_METADATA];
    }

    static async writeModuleMetaData(recordFieldDetailsPath, moduleData) {
        let fieldDetailsJSON = fs.existsSync(recordFieldDetailsPath) ? Initializer.getJSON(recordFieldDetailsPath) : {};

        fieldDetailsJSON[Constants.SDK_MODULE_METADATA] = moduleData;

        fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(fieldDetailsJSON));
    }

    static async getModules(header) {
        const HeaderMap = require('../../routes/header_map').HeaderMap;

        let ResponseWrapper = require("../../core/com/zoho/crm/api/modules/response_wrapper").ResponseWrapper;

        let APIException = require("../../core/com/zoho/crm/api/modules/api_exception").APIException;

        const ModuleOperations = require("../../core/com/zoho/crm/api/modules/modules_operations").ModulesOperations;

        const GetModulesHeader = require("../../core/com/zoho/crm/api/modules/modules_operations").GetModulesHeader;

        let apiNames = new Map();

        let headerMap = new HeaderMap();

        if (header != null) {
            await headerMap.add(GetModulesHeader.IF_MODIFIED_SINCE, new Date(header));
        }

        let response = await new ModuleOperations().getModules(headerMap);

        if (response != null) {
            if ([Constants.NO_CONTENT_STATUS_CODE, Constants.NOT_MODIFIED_STATUS_CODE].includes(response.getStatusCode())) {
                return apiNames;
            }

            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof ResponseWrapper) {
                    let modules = responseObject.getModules();

                    modules.forEach(module => {
                        if (module.getAPISupported() == true) {

                            let moduleDetails = {};

                            moduleDetails[Constants.API_NAME] = module.getAPIName();

                            moduleDetails[Constants.GENERATED_TYPE] = module.getGeneratedType().getValue();

                            apiNames.set(module.getAPIName().toLowerCase(), moduleDetails);
                        }
                    });
                }
                else if (responseObject instanceof APIException) {
                    let errorResponse = {};

                    errorResponse[Constants.CODE] = responseObject.getCode().getValue();

                    errorResponse[Constants.STATUS] = responseObject.getStatus().getValue();

                    errorResponse[Constants.MESSAGE] = responseObject.getMessage().getValue();

                    throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null)
                }
            }
            else {
                let errorResponse = {};

                errorResponse[Constants.CODE] = response.getStatusCode();

                throw new SDKException(Constants.API_EXCEPTION, null, errorResponse, null);
            }

        }

        if (header == null) {
            try {
                var resourcesPath = path.join((await Initializer.getInitializer()).getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY);

                if (!fs.existsSync(resourcesPath)) {
                    fs.mkdirSync(resourcesPath, { recursive: true });
                }

                var recordFieldDetailsPath = await this.getFileName();

                Utility.writeModuleMetaData(recordFieldDetailsPath, apiNames);
            }
            catch (error) {
                if (!(error instanceof SDKException)) {
                    error = new SDKException(null, null, null, error);
                }

                Logger.error(Constants.EXCEPTION, error);

                throw error;
            }
        }

        return apiNames;
    }

    static async refreshModules() {
        this.forceRefresh = true;

        await Utility.getFieldsInfo(null);

        this.forceRefresh = false;
    }

    static async getJSONObject(json, key) {
        let keyArray = Array.from(Object.keys(json));

        for (let keyInJSON of keyArray) {
            if (key.toLowerCase() == keyInJSON.toLowerCase()) {
                return json[keyInJSON];
            }
        }

        return null;
    }

    static async setDataType(fieldDetail, field, moduleAPIName) {
        var apiType = field.getDataType();

        var module = "";

        var keyName = field.getAPIName();

        if (field.getSystemMandatory() != null && field.getSystemMandatory() == true && !(moduleAPIName.toLowerCase() == Constants.CALLS && keyName.toLowerCase() == Constants.CALL_DURATION)) {
            fieldDetail.required = true;
        }

        if (keyName.toLowerCase() == Constants.PRICING_DETAILS.toLowerCase() && moduleAPIName.toLowerCase() == Constants.PRICE_BOOKS) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LIST_NAMESPACE;

            fieldDetail.structure_name = Constants.PRICINGDETAILS;

            fieldDetail.skip_mandatory = true;

            return;
        }
        else if (keyName.toLowerCase() == Constants.PARTICIPANT_API_NAME.toLowerCase() && (moduleAPIName.toLowerCase() == Constants.EVENTS || moduleAPIName.toLowerCase() == Constants.ACTIVITIES)) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LIST_NAMESPACE;

            fieldDetail.structure_name = Constants.PARTICIPANTS;

            fieldDetail.skip_mandatory = true;

            return;
        }
        else if (keyName.toLowerCase() == Constants.COMMENTS.toLowerCase() && (moduleAPIName.toLowerCase() == Constants.SOLUTIONS || moduleAPIName.toLowerCase() == Constants.CASES)) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LIST_NAMESPACE;

            fieldDetail.structure_name = Constants.COMMENT_NAMESPACE;

            fieldDetail.lookup = true;

            return;
        }
        else if (keyName.toLowerCase() == Constants.LAYOUT.toLowerCase()) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LAYOUT_NAMESPACE;

            fieldDetail.structure_name = Constants.LAYOUT_NAMESPACE;

            fieldDetail.lookup = true;

            return;
        }
        else if ((keyName.toLowerCase() == Constants.TERRITORIES.toLowerCase() || keyName.toLowerCase() == Constants.TERRITORY.toLowerCase()) && field.getCustomField() !== null && field.getCustomField() == false) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LIST_NAMESPACE;

            fieldDetail.structure_name = Constants.TERRITORY_NAMESPACE;

            fieldDetail.lookup = true;

            return;
        }
        else if (keyName.toLowerCase() == Constants.PRODUCT_NAME.toLowerCase() && Constants.INVENTORY_MODULES_ITEMS.includes(moduleAPIName.toLowerCase())) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LINEITEM_PRODUCT;

            fieldDetail.structure_name = Constants.LINEITEM_PRODUCT;

            fieldDetail.lookup = true;

            return;
        }
        else if (keyName.toLowerCase() == Constants.DISCOUNT.toLowerCase() && Constants.INVENTORY_MODULES_ITEMS.includes(moduleAPIName.toLowerCase())) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.STRING_NAMESPACE;

            return;
        }
        else if (keyName.toLowerCase() == Constants.TAX.toLowerCase() && Constants.PRODUCTS.toLowerCase() == moduleAPIName.toLowerCase()) {
            fieldDetail.name = keyName;

            fieldDetail.type = Constants.LIST_NAMESPACE;

            fieldDetail.structure_name = Constants.TAX_NAMESPACE;

            return;
        }
        else if (Utility.apiTypeVsdataType.has(apiType)) {
            fieldDetail.type = Utility.apiTypeVsdataType.get(apiType);
        }
        else if (apiType.toLowerCase() == Constants.FORMULA.toLowerCase()) {
            if (field.getFormula() != null) {
                let returnType = field.getFormula().getReturnType();

                if (returnType != null && Utility.apiTypeVsdataType.has(returnType)) {
                    fieldDetail.type = Utility.apiTypeVsdataType.get(returnType);
                }
            }

            fieldDetail[Constants.READ_ONLY] = true;
        }
        else {
            return;
        }

        if (apiType.toLowerCase().includes(Constants.LOOKUP.toLowerCase())) {
            fieldDetail.lookup = true;
        }

        if (apiType.toLowerCase() == Constants.CONSENT_LOOKUP) {
            fieldDetail.skip_mandatory = true;
        }

        if (apiType.toLowerCase() == Constants.MULTI_SELECT_LOOKUP) {
            fieldDetail[Constants.SKIP_MANDATORY] = true;

            if (field.getMultiselectlookup() != null && field.getMultiselectlookup().getLinkingModule() != null) {
                let linkingModule = field.getMultiselectlookup().getLinkingModule();

                fieldDetail[Constants.MODULE] = linkingModule;

                module = linkingModule;
            }

            fieldDetail[Constants.SUBFORM] = true;
        }

        if (apiType.toLowerCase() == Constants.MULTI_USER_LOOKUP) {
            fieldDetail[Constants.SKIP_MANDATORY] = true;

            if (field.getMultiuserlookup() != null && field.getMultiuserlookup().getLinkingModule() != null) {
                let linkingModule = field.getMultiuserlookup().getLinkingModule();

                fieldDetail[Constants.MODULE] = linkingModule;

                module = linkingModule;
            }

            fieldDetail[Constants.SUBFORM] = true;
        }

        if (Utility.apiTypeVsStructureName.has(apiType)) {
            fieldDetail.structure_name = Utility.apiTypeVsStructureName.get(apiType);
        }

        if (apiType.toLowerCase() == Constants.PICKLIST && (field.getPickListValues() != null && field.getPickListValues().length > 0)) {
            let values = [];

            fieldDetail.picklist = true;

            field.getPickListValues().every(x => values.push(x.getDisplayValue()));

            fieldDetail.values = values;
        }

        if (apiType == Constants.SUBFORM && field.getSubform() != null) {
            module = field.getSubform().getModule();

            fieldDetail.module = module;

            fieldDetail.skip_mandatory = true;

            fieldDetail.subform = true;
        }

        if (apiType == Constants.LOOKUP && field.getLookup() != null) {
            module = field.getLookup().getModule();

            if (module != null && module.toLowerCase() != Constants.SE_MODULE) {
                fieldDetail.module = module;

                if (module.toLowerCase() == Constants.ACCOUNTS && (field.getCustomField() != null && !field.getCustomField())) {
                    fieldDetail.skip_mandatory = true;
                }
            }
            else {
                module = "";
            }

            fieldDetail.lookup = true;
        }

        if (module.length > 0) {
            await Utility.getFieldsInfo(module);
        }

        fieldDetail.name = keyName;
    }

    static async fillDataType() {

        if (this.apiTypeVsdataType.size > 0) {
            return;
        }

        let fieldAPINamesString = ["textarea", "text", "website", "email", "phone", "mediumtext", "multiselectlookup", "profileimage", "autonumber"];

        let fieldAPINamesInteger = ["integer"];

        let fieldAPINamesBoolean = ["boolean"];

        let fieldAPINamesLong = ["long", "bigint"];

        let fieldAPINamesDouble = ["double", "percent", "lookup", "currency"];

        let fieldAPINamesFieldFile = ["fileupload"];

        let fieldAPINamesDateTime = ["datetime", "event_reminder"];

        let fieldAPINamesDate = ["date"];

        let fieldAPINamesLookup = ["lookup"];

        let fieldAPINamesPickList = ["picklist"];

        let fieldAPINamesMultiSelectPickList = ["multiselectpicklist"];

        let fieldAPINamesSubForm = ["subform"];

        let fieldAPINamesOwnerLookUp = ["ownerlookup", "userlookup"];

        let fieldAPINamesMultiUserLookUp = ["multiuserlookup"];

        let fieldAPINamesMultiModuleLookUp = ["multimodulelookup"];

        let fieldAPINameTaskRemindAt = ["ALARM"];

        let fieldAPINameRecurringActivity = ["RRULE"];

        let fieldAPINameReminder = ["multireminder"];

        let fieldAPINameConsentLookUp = ["consent_lookup"];

        let fieldAPINameImageUpload = ["imageupload"];

        let fieldAPInameMultiSelectLookUp = ["multiselectlookup"];

        let fieldAPINameLineTax = ["linetax"];

        for (let fieldAPIName of fieldAPINamesString) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.STRING_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesInteger) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.INTEGER_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesBoolean) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.BOOLEAN_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesLong) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LONG_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesDouble) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.DOUBLE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesDateTime) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.DATETIME_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesDate) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.DATE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesLookup) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.RECORD_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.RECORD_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesPickList) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.CHOICE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesMultiSelectPickList) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.CHOICE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesSubForm) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.RECORD_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesOwnerLookUp) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.USER_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.USER_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesMultiUserLookUp) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.USER_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesMultiModuleLookUp) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.MODULE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINamesFieldFile) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.FIELD_FILE_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameTaskRemindAt) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.REMINDAT_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.REMINDAT_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameRecurringActivity) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.RECURRING_ACTIVITY_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.RECURRING_ACTIVITY_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameReminder) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.REMINDER_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameConsentLookUp) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.CONSENT_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.CONSENT_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameImageUpload) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.IMAGEUPLOAD_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPInameMultiSelectLookUp) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.RECORD_NAMESPACE);
        }

        for (let fieldAPIName of fieldAPINameLineTax) {
            Utility.apiTypeVsdataType.set(fieldAPIName, Constants.LIST_NAMESPACE);

            Utility.apiTypeVsStructureName.set(fieldAPIName, Constants.LINETAX);
        }
    }

    static checkInteger(value) {
        return (parseInt(value) === value) ? true : false;
    }
}

module.exports = {
    MasterModel: Utility,
    Utility: Utility
};