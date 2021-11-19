const Converter = require("./converter").Converter;
const fs = require("fs");
const path = require("path");
const Initializer = require("../../routes/initializer").Initializer;
const Logger = require('winston');
const { SDKException } = require("../../core/com/zoho/crm/api/exception/sdk_exception");
const Constants = require("./constants").Constants;
const Utility = require("./utility").Utility;

/**
 * The class contains methods to manipulate the module fields only when autoRefreshFields is set to false in Initializer.
 */
class ModuleFieldsHandler {
    /**
     * The method to obtain resources directory path.
     * @returns {String} A String representing the directory's absolute path.
     */
    static async getDirectory() {
        let initializer = await Initializer.getInitializer();

        return path.join(initializer.getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY);
    }

    /**
     * The method to delete fields JSON File of the current user.
     * @throws {SDKException}
     */
    static async deleteFieldsFile() {
        try {
            let recordFieldDetailsPath = path.join(await ModuleFieldsHandler.getDirectory(), await new Converter().getEncodedFileName());

            if (fs.existsSync(recordFieldDetailsPath)) {
                fs.unlinkSync(recordFieldDetailsPath);
            }
        } catch (error) {
            let exception = new SDKException(null, null, null, error);

            Logger.error(Constants.DELETE_FIELD_FILE_ERROR, exception);

            throw exception;
        }
    }

    /**
     * The method to delete all field JSON files.
     * @throws {SDKException}
     */
    static async deleteAllFieldFiles() {
        try {
            let dir = await ModuleFieldsHandler.getDirectory();

            fs.readdirSync(dir).forEach(fileName => {
                let filepath = path.resolve(dir, fileName);

                fs.unlinkSync(filepath);
            });
        } catch (error) {
            let exception = new SDKException(null, null, null, error);

            Logger.error(Constants.DELETE_FIELD_FILES_ERROR, exception);

            throw exception;
        }
    }

    /**
     * The method to delete fields of the given module from the current user's fields JSON file.
     * @param {String} module A string representing the module.
     * @throws {SDKException}
     */
    static async deleteFields(module) {
        try {
            let initializer = await Initializer.getInitializer();

            let recordFieldDetailsPath = path.join(initializer.getResourcePath(), Constants.FIELD_DETAILS_DIRECTORY, await new Converter().getEncodedFileName());

            if (fs.existsSync(recordFieldDetailsPath)) {
                let recordFieldDetailsJson = await Initializer.getJSON(recordFieldDetailsPath);

                if (recordFieldDetailsJson.hasOwnProperty(module.toLowerCase())) {
                    await Utility.deleteFields(recordFieldDetailsJson, module);

                    fs.writeFileSync(recordFieldDetailsPath, JSON.stringify(recordFieldDetailsJson));
                }
            }
        } catch (error) {
            let exception = new SDKException(null, null, null, error);

            throw exception;
        }
    }

    /**
     * The method to force-refresh fields of a module.
     * @param {String} module A string representing the module.
     * @throws {SDKException}
     */
    static async refreshFields(module) {
        try {
            await this.deleteFields(module);

            await Utility.getFieldsInfo(module);

        } catch (error) {
            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            Logger.error(Constants.REFRESH_SINGLE_MODULE_FIELDS_ERROR + module, error);

            throw error;
        }
    }

    /**
     * The method to force-refresh fields of all the available modules.
     * @throws {SDKException}
     */
    static async refreshAllModules() {
        try {
            await Utility.refreshModules();
        } catch (error) {
            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            Logger.error(Constants.REFRESH_ALL_MODULE_FIELDS_ERROR, error);

            throw error;
        }
    }
}

module.exports = {
    MasterModel: ModuleFieldsHandler,
    ModuleFieldsHandler: ModuleFieldsHandler
}