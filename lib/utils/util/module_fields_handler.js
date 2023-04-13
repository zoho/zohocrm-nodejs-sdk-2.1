import { Converter } from "./converter.js";
import { existsSync, unlinkSync, readdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { Initializer } from "../../routes/initializer.js";
import pkg from "winston";
const Logger = pkg;
import { SDKException } from "../../core/com/zoho/crm/api/exception/sdk_exception.js";
import { Constants } from "./constants.js";
import { Utility } from "./utility.js";

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

    return join(
        initializer.getResourcePath(),
        Constants.FIELD_DETAILS_DIRECTORY
    );
  }

  /**
   * The method to delete fields JSON File of the current user.
   * @throws {SDKException}
   */
  static async deleteFieldsFile() {
    try {
      let recordFieldDetailsPath = join(
          await ModuleFieldsHandler.getDirectory(),
          await new Converter().getEncodedFileName()
      );

      if (existsSync(recordFieldDetailsPath)) {
        unlinkSync(recordFieldDetailsPath);
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
      let dir = await ModuleFieldsHandler.getDirectory()

      readdirSync(dir).forEach((fileName) => {
        let filepath = resolve(dir, fileName);

        unlinkSync(filepath);
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
      if (module == null){
        throw new SDKException(null,"module should not be null",null,null);
      }
      let initializer = await Initializer.getInitializer();

      let recordFieldDetailsPath = join(
          initializer.getResourcePath(),
          Constants.FIELD_DETAILS_DIRECTORY,
          await new Converter().getEncodedFileName()
      );

      if (existsSync(recordFieldDetailsPath)) {
        let recordFieldDetailsJson = await Initializer.getJSON(
            recordFieldDetailsPath
        )

        if (recordFieldDetailsJson.hasOwnProperty(module.toLowerCase())) {
          await Utility.deleteFields(recordFieldDetailsJson, module).catch(
              (err) => {
                throw err;
              }
          );

          writeFileSync(
              recordFieldDetailsPath,
              JSON.stringify(recordFieldDetailsJson)
          );
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
      if (module == null){
        throw new SDKException(null,"module should not be null",null,null);
      }
      await this.deleteFields(module).catch((err) => {
        throw err;
      });

      await Utility.getFieldsInfo(module).catch((err) => {
        throw err;
      });
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
      await Utility.refreshModules().catch((err) => {
        throw err;
      });
    } catch (error) {
      if (!(error instanceof SDKException)) {
        error = new SDKException(null, null, null, error);
      }

      Logger.error(Constants.REFRESH_ALL_MODULE_FIELDS_ERROR, error);

      throw error;
    }
  }
}

export {
  ModuleFieldsHandler as ModuleFieldsHandler,
  ModuleFieldsHandler as MasterModel
}
