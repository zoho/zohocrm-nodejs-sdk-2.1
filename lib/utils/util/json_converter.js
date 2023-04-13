import {Converter} from "./converter.js";
import {Initializer} from "../../routes/initializer.js";
import {SDKException} from "../../core/com/zoho/crm/api/exception/sdk_exception.js";
import {DatatypeConverter} from "./datatype_converter.js";
import {join} from "path";
import {Constants} from "./constants.js";
import {Utility} from "./utility.js";
import {Record} from "../../core/com/zoho/crm/api/record/record.js";
import {FileDetails} from "../../core/com/zoho/crm/api/record/file_details.js";

/**
 * This class processes the API response to the object and an object to a JSON object, containing the request body.
 */
class JSONConverter extends Converter {
  uniqueValuesMap = {};

  constructor(commonAPIHandler) {
    super(commonAPIHandler);
  }

  async appendToRequest(requestBase, requestObject) {
    return JSON.stringify(requestBase.getRequestBody()) || null;
  }

  async formRequest(requestInstance, pack, instanceNumber, memberDetail) {
    var classDetail = Initializer.jsonDetails[pack];

    if (
        classDetail.hasOwnProperty(Constants.INTERFACE) &&
        classDetail[Constants.INTERFACE]
    ) {
      var classes = classDetail[Constants.CLASSES];

      var baseName = pack.split("/").slice(0, -1);

      let className = this.getFileName(requestInstance.constructor.name);

      baseName.push(className);

      let fileName = requestInstance.constructor.name;

      fileName = fileName.split(/(?=[A-Z])/);

      baseName[5]=fileName[0].toLowerCase() + "_" + fileName[1].toLowerCase() + "s";

      let requestObjectClassName = baseName.join("/");

      for (let className1 in classes) {
        if (classes[className1].toLowerCase() == requestObjectClassName) {
          classDetail = Initializer.jsonDetails[requestObjectClassName];

          break;
        }
      }
    }

    if (requestInstance instanceof Record) {
      let moduleAPIName = this.commonAPIHandler.getModuleAPIName();

      let returnJSON = await this.isRecordRequest(
          requestInstance,
          classDetail,
          instanceNumber,
          memberDetail
      ).catch((err) => {
        throw err;
      });

      this.commonAPIHandler.setModuleAPIName(moduleAPIName);

      return returnJSON;
    } else {
      return await this.isNotRecordRequest(
          requestInstance,
          classDetail,
          instanceNumber,
          memberDetail
      ).catch((err) => {
        throw err;
      });
    }
  }

  async isNotRecordRequest(
      requestInstance,
      classDetail,
      instanceNumber,
      classMemberDetail
  ) {
    var lookUp = false;

    var skipMandatory = false;

    var classMemberName = null;

    if (classMemberDetail != null) {
      lookUp = classMemberDetail.hasOwnProperty(Constants.LOOKUP)
          ? classMemberDetail[Constants.LOOKUP]
          : false;

      skipMandatory = classMemberDetail.hasOwnProperty(Constants.SKIP_MANDATORY)
          ? classMemberDetail[Constants.SKIP_MANDATORY]
          : false;

      classMemberName = this.buildName(classMemberDetail[Constants.NAME]);
    }

    var requestJSON = {};

    var primaryKeys = new Map();

    var requiredKeys = new Map();

    var requiredInUpdateKeys = new Map();

    for (let memberName in classDetail) {
      var modification = null;

      var memberDetail = classDetail[memberName];

      if (
          (memberDetail.hasOwnProperty(Constants.READ_ONLY) &&
              memberDetail[Constants.READ_ONLY] == "true") ||
          !memberDetail.hasOwnProperty(Constants.NAME)
      ) {
        // read only or no keyName
        continue;
      }

      var keyName = memberDetail[Constants.NAME];

      try {
        modification = requestInstance.isKeyModified(keyName);
      } catch (ex) {
        throw new SDKException(
            Constants.EXCEPTION_IS_KEY_MODIFIED,
            null,
            null,
            ex
        );
      }

      if (
          memberDetail.hasOwnProperty(Constants.REQUIRED) &&
          memberDetail[Constants.REQUIRED] == true
      ) {
        requiredKeys.set(keyName, true);
      }

      if (
          memberDetail.hasOwnProperty(Constants.PRIMARY) &&
          memberDetail[Constants.PRIMARY] == true &&
          (!memberDetail.hasOwnProperty(Constants.REQUIRED_IN_UPDATE) ||
              memberDetail[Constants.REQUIRED_IN_UPDATE] == true)
      ) {
        primaryKeys.set(keyName, true);
      }

      if (
          memberDetail.hasOwnProperty(Constants.REQUIRED_IN_UPDATE) &&
          memberDetail[Constants.REQUIRED_IN_UPDATE] == true
      ) {
        requiredInUpdateKeys.set(keyName, true);
      }

      var fieldValue = null;

      if (modification != null && modification != 0) {
        fieldValue = Reflect.get(requestInstance, memberName);

        if (
            await this.valueChecker(
                requestInstance.constructor.name,
                memberName,
                memberDetail,
                fieldValue,
                this.uniqueValuesMap,
                instanceNumber
            ).catch((err) => {
              throw err;
            })
        ) {
          if (fieldValue != null) {
            requiredKeys.delete(keyName);

            primaryKeys.delete(keyName);

            requiredInUpdateKeys.delete(keyName);
          }

          if (requestInstance instanceof FileDetails) {
            if (fieldValue == null || fieldValue == "null") {
              requestJSON[keyName.toLowerCase()] = null;
            } else {
              requestJSON[keyName.toLowerCase()] = fieldValue;
            }
          } else {
            requestJSON[keyName] = await this.setData(
                memberDetail,
                fieldValue
            ).catch((err) => {
              throw err;
            });
          }
        }
      }
    }

    if (
        skipMandatory ||
        this.checkException(
            classMemberName,
            requestInstance,
            instanceNumber,
            lookUp,
            requiredKeys,
            primaryKeys,
            requiredInUpdateKeys
        ) === true
    ) {
      return requestJSON;
    }
  }

  checkException(
      memberName,
      requestInstance,
      instanceNumber,
      lookUp,
      requiredKeys,
      primaryKeys,
      requiredInUpdateKeys
  ) {
    if (
        requiredInUpdateKeys.size > 0 &&
        this.commonAPIHandler.getCategoryMethod() != null &&
        this.commonAPIHandler.getCategoryMethod().toUpperCase() ==
        Constants.REQUEST_CATEGORY_UPDATE
    ) {
      let error = {};

      error.field = memberName;

      error.type = requestInstance.constructor.name;

      error.keys = Array.from(requiredInUpdateKeys.keys()).toString();

      if (instanceNumber != null) {
        error.instance_number = instanceNumber;
      }

      throw new SDKException(
          Constants.MANDATORY_VALUE_ERROR,
          Constants.MANDATORY_KEY_ERROR,
          error,
          null
      );
    }

    if (
        this.commonAPIHandler.isMandatoryChecker() != null &&
        this.commonAPIHandler.isMandatoryChecker()
    ) {
      if (
          this.commonAPIHandler.getCategoryMethod().toUpperCase() ==
          Constants.REQUEST_CATEGORY_CREATE
      ) {
        if (lookUp) {
          if (primaryKeys.size > 0) {
            let error = {};

            error.field = memberName;

            error.type = requestInstance.constructor.name;

            error.keys = Array.from(primaryKeys.keys()).toString();

            if (instanceNumber != null) {
              error.instance_number = instanceNumber;
            }

            throw new SDKException(
                Constants.MANDATORY_VALUE_ERROR,
                Constants.PRIMARY_KEY_ERROR,
                error,
                null
            );
          }
        } else if (requiredKeys.size > 0) {
          let error = {};

          error.field = memberName;

          error.type = requestInstance.constructor.name;

          error.keys = Array.from(requiredKeys.keys()).toString();

          if (instanceNumber != null) {
            error.instance_number = instanceNumber;
          }

          throw new SDKException(
              Constants.MANDATORY_VALUE_ERROR,
              Constants.MANDATORY_KEY_ERROR,
              error,
              null
          );
        }
      }

      if (
          this.commonAPIHandler.getCategoryMethod().toUpperCase() ==
          Constants.REQUEST_CATEGORY_UPDATE &&
          primaryKeys.size > 0
      ) {
        let error = {};

        error.field = memberName;

        error.type = requestInstance.constructor.name;

        error.keys = Array.from(primaryKeys.keys()).toString();

        if (instanceNumber != null) {
          error.instance_number = instanceNumber;
        }

        throw new SDKException(
            Constants.MANDATORY_VALUE_ERROR,
            Constants.PRIMARY_KEY_ERROR,
            error,
            null
        );
      }
    } else if (
        lookUp &&
        this.commonAPIHandler.getCategoryMethod().toUpperCase() ==
        Constants.REQUEST_CATEGORY_UPDATE
    ) {
      if (primaryKeys.size > 0) {
        let error = {};

        error.field = memberName;

        error.type = requestInstance.constructor.name;

        error.keys = Array.from(primaryKeys.keys()).toString();

        if (instanceNumber != null) {
          error.instance_number = instanceNumber;
        }

        throw new SDKException(
            Constants.MANDATORY_VALUE_ERROR,
            Constants.PRIMARY_KEY_ERROR,
            error,
            null
        );
      }
    }

    return true;
  }

  async isRecordRequest(
      recordInstance,
      classDetail,
      instanceNumber,
      memberDetail
  ) {
    var lookUp = false;

    var skipMandatory = false;

    var classMemberName = null;

    if (memberDetail != null) {
      lookUp = memberDetail.hasOwnProperty(Constants.LOOKUP)
          ? memberDetail[Constants.LOOKUP]
          : false;

      skipMandatory = memberDetail.hasOwnProperty(Constants.SKIP_MANDATORY)
          ? memberDetail[Constants.SKIP_MANDATORY]
          : false;

      classMemberName = this.buildName(memberDetail[Constants.NAME]);
    }

    var requestJSON = {};

    var moduleDetail = {};

    var moduleAPIName = this.commonAPIHandler.getModuleAPIName();

    if (moduleAPIName != null) {
      // entry
      this.commonAPIHandler.setModuleAPIName(null);

      var fullDetail = await Utility.searchJSONDetails(moduleAPIName).catch(
          (err) => {
            throw err;
          }
      ); // to get correct moduleapiname in proper format

      if (fullDetail != null) {
        // from Jsondetails
        moduleDetail = fullDetail[Constants.MODULEDETAILS];
      } else {
        // from user spec
        moduleDetail = await this.getModuleDetailFromUserSpecJSON(
            moduleAPIName
        ).catch((err) => {
          throw err;
        });
      }
    } else {
      // inner case
      moduleDetail = classDetail;

      classDetail = Initializer.jsonDetails[Constants.RECORD_NAMESPACE];
    } // class detail must contain record structure at this point

    let uniqueValues = new Map();

    var keyValues = Reflect.get(recordInstance, Constants.KEY_VALUES);

    var keyModified = Reflect.get(recordInstance, Constants.KEY_MODIFIED);

    var requiredKeys = new Map();

    var primaryKeys = new Map();

    if (!skipMandatory) {
      for (let keyName of Object.keys(moduleDetail)) {
        const keyDetail = moduleDetail[keyName];

        let name = keyDetail[Constants.NAME];

        if (
            keyDetail != null &&
            keyDetail.hasOwnProperty(Constants.REQUIRED) &&
            keyDetail[Constants.REQUIRED] == true
        ) {
          requiredKeys.set(name, true);
        }

        if (
            keyDetail != null &&
            keyDetail.hasOwnProperty(Constants.PRIMARY) &&
            keyDetail[Constants.PRIMARY] == true
        ) {
          primaryKeys.set(name, true);
        }
      }

      for (let keyName of Object.keys(classDetail)) {
        const keyDetail = classDetail[keyName];

        let name = keyDetail[Constants.NAME];

        if (
            keyDetail.hasOwnProperty(Constants.REQUIRED) &&
            keyDetail[Constants.REQUIRED] == true
        ) {
          requiredKeys.set(name, true);
        }

        if (
            keyDetail.hasOwnProperty(Constants.PRIMARY) &&
            keyDetail[Constants.PRIMARY] == true
        ) {
          primaryKeys.set(name, true);
        }
      }
    }

    for (let keyName of Array.from(keyModified.keys())) {
      if (keyModified.get(keyName) != 1) {
        continue;
      }

      let keyDetail = {};

      let keyValue = keyValues.has(keyName) ? keyValues.get(keyName) : null;

      let jsonValue = null;

      if (keyValue != null) {
        requiredKeys.delete(keyName);

        primaryKeys.delete(keyName);
      }

      let memberName = this.buildName(keyName);

      if (
          moduleDetail != null &&
          Object.keys(moduleDetail).length > 0 &&
          (moduleDetail.hasOwnProperty(keyName) ||
              moduleDetail.hasOwnProperty(memberName))
      ) {
        if (moduleDetail.hasOwnProperty(keyName)) {
          keyDetail = moduleDetail[keyName]; // incase of user spec json
        } else {
          keyDetail = moduleDetail[memberName]; // json details
        }
      } else if (classDetail.hasOwnProperty(memberName)) {
        keyDetail = classDetail[memberName];
      }

      if (Object.keys(keyDetail).length > 0) {
        if (
            (keyDetail.hasOwnProperty(Constants.READ_ONLY) &&
                (keyDetail[Constants.READ_ONLY] == true ||
                    keyDetail[Constants.READ_ONLY] == "true")) ||
            !keyDetail.hasOwnProperty(Constants.NAME)
        ) {
          // read only or no keyName
          continue;
        }

        if (
            await this.valueChecker(
                recordInstance.constructor.name,
                memberName,
                keyDetail,
                keyValue,
                uniqueValues,
                instanceNumber
            ).catch((err) => {
              throw err;
            })
        ) {
          jsonValue = await this.setData(keyDetail, keyValue).catch((err) => {
            throw err;
          });
        }
      } else {
        jsonValue = await this.redirectorForObjectToJSON(keyValue).catch(
            (err) => {
              throw err;
            }
        );
      }

      requestJSON[keyName] = jsonValue;
    }

    if (
        skipMandatory ||
        this.checkException(
            classMemberName,
            recordInstance,
            instanceNumber,
            lookUp,
            requiredKeys,
            primaryKeys,
            new Map()
        )
    ) {
      return requestJSON;
    }

    return requestJSON;
  }

  async setData(memberDetail, fieldValue) {
    if (fieldValue != null) {
      let type = memberDetail[Constants.TYPE].toString();

      if (type.toLowerCase() == Constants.LIST_NAMESPACE.toLowerCase()) {
        return await this.setJSONArray(fieldValue, memberDetail).catch(
            (err) => {
              throw err;
            }
        );
      } else if (type.toLowerCase() == Constants.MAP_NAMESPACE.toLowerCase()) {
        return await this.setJSONObject(fieldValue, memberDetail).catch(
            (err) => {
              throw err;
            }
        );
      } else if (
          type == Constants.CHOICE_NAMESPACE ||
          (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME) &&
              memberDetail[Constants.STRUCTURE_NAME] == Constants.CHOICE_NAMESPACE)
      ) {
        return fieldValue.getValue();
      } else if (
          memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME) &&
          memberDetail.hasOwnProperty(Constants.MODULE)
      ) {
        return await this.isRecordRequest(
            fieldValue,
            await this.getModuleDetailFromUserSpecJSON(
                memberDetail[Constants.MODULE]
            ).catch((err) => {
              throw err;
            }),
            null,
            memberDetail
        ).catch((err) => {
          throw err;
        });
      } else if (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME)) {
        return await this.formRequest(
            fieldValue,
            memberDetail[Constants.STRUCTURE_NAME],
            null,
            memberDetail
        ).catch((err) => {
          throw err;
        });
      } else {
        return DatatypeConverter.postConvert(fieldValue, type);
      }
    }

    return null;
  }

  async setJSONObject(requestObject, memberDetail) {
    var jsonObject = {};

    if (Array.from(requestObject.keys()).length > 0) {
      if (
          memberDetail == null ||
          (memberDetail != null && !memberDetail.hasOwnProperty(Constants.KEYS))
      ) {
        for (let key of Array.from(requestObject.keys())) {
          jsonObject[key] = await this.redirectorForObjectToJSON(
              requestObject.get(key)
          ).catch((err) => {
            throw err;
          });
        }
      } else {
        if (
            memberDetail !== null &&
            memberDetail.hasOwnProperty(Constants.KEYS)
        ) {
          var keysDetail = memberDetail[Constants.KEYS];

          for (let keyIndex = 0; keyIndex < keysDetail.length; keyIndex++) {
            let keyDetail = keysDetail[keyIndex];

            let keyName = keyDetail[Constants.NAME];

            let keyValue = null;

            if (
                requestObject.has(keyName) &&
                requestObject.get(keyName) != null
            ) {
              keyValue = await this.setData(
                  keyDetail,
                  requestObject.get(keyName)
              ).catch((err) => {
                throw err;
              });

              jsonObject[keyName] = keyValue;
            }
          }
        }
      }
    }

    return jsonObject;
  }

  async setJSONArray(requestObjects, memberDetail) {
    var jsonArray = [];

    if (requestObjects.length > 0) {
      if (
          memberDetail == null ||
          (memberDetail != null &&
              !memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME))
      ) {
        for (let request of requestObjects) {
          jsonArray
              .push(await this.redirectorForObjectToJSON(request));
        }
      } else {
        let pack = memberDetail[Constants.STRUCTURE_NAME].toString();

        if (pack == Constants.CHOICE_NAMESPACE) {
          for (let request of requestObjects) {
            jsonArray.push(request.getValue());
          }
        } else if (
            memberDetail.hasOwnProperty(Constants.MODULE) &&
            memberDetail[Constants.MODULE] != null
        ) {
          let instanceCount = 0;

          for (let request of requestObjects) {
            jsonArray.push(
                await this.isRecordRequest(
                    request,
                    await this.getModuleDetailFromUserSpecJSON(
                        memberDetail[Constants.MODULE]
                    ).catch((err) => {
                      throw err;
                    }),
                    instanceCount++,
                    memberDetail
                ).catch((err) => {
                  throw err;
                })
            );
          }
        } else {
          let instanceCount = 0;

          for (let request of requestObjects) {
            jsonArray.push(
                await this.formRequest(
                    request,
                    pack,
                    instanceCount++,
                    memberDetail
                ).catch((err) => {
                  throw err;
                })
            );
          }
        }
      }
    }

    return jsonArray;
  }

  async redirectorForObjectToJSON(request) {
    if (Array.isArray(request)) {
      return await this.setJSONArray(request, null).catch((err) => {
        throw err;
      });
    } else if (request instanceof Map) {
      return await this.setJSONObject(request, null).catch((err) => {
        throw err;
      });
    } else {
      return request;
    }
  }

  async getWrappedResponse(response, pack) {
    if (response.body.length != 0) {
      var responseJson = JSON.parse(response.body);

      return await this.getResponse(responseJson, pack).catch((err) => {
        throw err;
      });
    }

    return null;
  }

  async getResponse(responseJson, packageName) {
    var instance = null;

    if (
        responseJson == null ||
        responseJson == "" ||
        responseJson.length == 0
    ) {
      return instance;
    }

    var classDetail = Initializer.jsonDetails[packageName];

    if (
        classDetail.hasOwnProperty(Constants.INTERFACE) &&
        classDetail[Constants.INTERFACE]
    ) {
      let classes = classDetail[Constants.CLASSES];

      instance = await this.findMatch(classes, responseJson).catch((err) => {
        throw err;
      }); // findmatch returns instance(calls getresponse() recursively)
    } else {

      let ClassName = (await import("../../".concat(packageName).concat(".js"))).MasterModel;

      instance = new ClassName();

      if (instance instanceof Record) {
        // if record -> based on response json data will be assigned to field Values
        let moduleAPIName = this.commonAPIHandler.getModuleAPIName();

        instance = await this.isRecordResponse(
            responseJson,
            classDetail,
            packageName
        ).catch((err) => {
          throw err;
        });

        this.commonAPIHandler.setModuleAPIName(moduleAPIName);
      } else {
        instance = await this.notRecordResponse(
            instance,
            responseJson,
            classDetail
        ).catch((err) => {
          throw err;
        }); // based on json details data will be assigned
      }
    }

    return instance;
  }

  async notRecordResponse(instance, responseJSON, classDetail) {
    for (let memberName in classDetail) {
      let keyDetail = classDetail[memberName];

      let keyName = keyDetail.hasOwnProperty(Constants.NAME)
          ? keyDetail[Constants.NAME]
          : null; // api-name of the member

      if (
          keyName != null &&
          responseJSON.hasOwnProperty(keyName) &&
          responseJSON[keyName] !== null
      ) {
        let keyData = responseJSON[keyName];

        let memberValue = await this.getData(keyData, keyDetail).catch(
            (err) => {
              throw err;
            }
        );

        Reflect.set(instance, memberName, memberValue);
      }
    }
    return instance;
  }

  async isRecordResponse(responseJson, classDetail, pack) {

    let className = (await import("../../"+pack+".js")).MasterModel;

    let recordInstance = new className();

    let moduleAPIName = this.commonAPIHandler.getModuleAPIName();

    let moduleDetail = {};

    if (moduleAPIName != null) {
      // entry
      this.commonAPIHandler.setModuleAPIName(null);

      let fullDetail = await Utility.searchJSONDetails(moduleAPIName).catch(
          (err) => {
            throw err;
          }
      ); // to get correct moduleapiname in proper format

      if (fullDetail != null) {
        // from Jsondetails
        moduleDetail = fullDetail[Constants.MODULEDETAILS];

        let moduleClassName = (await import("../../" + fullDetail[Constants.MODULEPACKAGENAME] + ".js")).MasterModel;

        recordInstance = new moduleClassName();
      } else {
        // from user spec
        moduleDetail = await this.getModuleDetailFromUserSpecJSON(
            moduleAPIName
        ).catch((err) => {
          throw err;
        });
      }
    }

    for (let key in classDetail) {
      moduleDetail[key] = classDetail[key];
    }

    var recordDetail = Initializer.jsonDetails[Constants.RECORD_NAMESPACE];

    var keyValues = new Map();

    for (let keyName in responseJson) {
      let memberName = this.buildName(keyName);

      let keyDetail = {};

      if (
          moduleDetail != null &&
          Object.keys(moduleDetail).length > 0 &&
          (moduleDetail.hasOwnProperty(keyName) ||
              moduleDetail.hasOwnProperty(memberName))
      ) {
        if (moduleDetail.hasOwnProperty(keyName)) {
          keyDetail = moduleDetail[keyName];
        } else {
          keyDetail = moduleDetail[memberName];
        }
      } else if (recordDetail.hasOwnProperty(memberName)) {
        keyDetail = recordDetail[memberName];
      }

      let keyValue = null;

      let keyData = responseJson[keyName];

      if (keyDetail != null && Object.keys(keyDetail).length > 0) {
        keyName = keyDetail[Constants.NAME];

        keyValue = await this.getData(keyData, keyDetail).catch((err) => {
          throw err;
        });
      } else {
        // if not key detail
        keyValue = await this.redirectorForJSONToObject(keyData).catch(
            (err) => {
              throw err;
            }
        );
      }

      keyValues.set(keyName, keyValue);
    }

    Reflect.set(recordInstance, Constants.KEY_VALUES, keyValues);

    return recordInstance;
  }

  async getData(keyData, memberDetail) {
    let memberValue = null;

    if (keyData != null) {
      let type = memberDetail[Constants.TYPE].toString();

      if (type.toLowerCase() == Constants.LIST_NAMESPACE.toLowerCase()) {
        memberValue = await this.getCollectionsData(
            keyData,
            memberDetail
        ).catch((err) => {
          throw err;
        });
      } else if (type.toLowerCase() == Constants.MAP_NAMESPACE.toLowerCase()) {
        memberValue = await this.getMapData(keyData, memberDetail).catch(
            (err) => {
              throw err;
            }
        );
      } else if (
          type == Constants.CHOICE_NAMESPACE ||
          (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME) &&
              memberDetail[Constants.STRUCTURE_NAME] == Constants.CHOICE_NAMESPACE)
      ) {
        let Choice = (await import(Constants.CHOICE_PATH+".js")).MasterModel;
        memberValue = new Choice(keyData);
      } else if (
          memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME) &&
          memberDetail.hasOwnProperty(Constants.MODULE)
      ) {
        memberValue = await this.isRecordResponse(
            keyData,
            await this.getModuleDetailFromUserSpecJSON(
                memberDetail[Constants.MODULE]
            ).catch((err) => {
              throw err;
            }),
            memberDetail[Constants.STRUCTURE_NAME]
        ).catch((err) => {
          throw err;
        });
      } else if (memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME)) {
        memberValue = await this.getResponse(
            keyData,
            memberDetail[Constants.STRUCTURE_NAME]
        ).catch((err) => {
          throw err;
        });
      } else {
        memberValue = await DatatypeConverter.preConvert(keyData, type);
      }
    }

    return memberValue;
  }

  async getMapData(response, memberDetail) {
    var mapInstance = new Map();

    if (Object.keys(response).length > 0) {
      if (
          memberDetail == null ||
          (memberDetail != null && !memberDetail.hasOwnProperty(Constants.KEYS))
      ) {
        for (let key in response) {
          mapInstance.set(
              key,
              await this.redirectorForJSONToObject(response[key]).catch((err) => {
                throw err;
              })
          );
        }
      } else {
        // member must have keys
        if (memberDetail.hasOwnProperty(Constants.KEYS)) {
          var keysDetail = memberDetail[Constants.KEYS];

          for (let keyIndex = 0; keyIndex < keysDetail.length; keyIndex++) {
            var keyDetail = keysDetail[keyIndex];

            var keyName = keyDetail[Constants.NAME];

            var keyValue = null;

            if (response.hasOwnProperty(keyName) && response[keyName] != null) {
              keyValue = await this.getData(response[keyName], keyDetail).catch(
                  (err) => {
                    throw err;
                  }
              );

              mapInstance.set(keyName, keyValue);
            }
          }
        }
      }
    }

    return mapInstance;
  }

  async getCollectionsData(responses, memberDetail) {
    var values = new Array();

    if (responses.length > 0) {
      if (
          memberDetail == null ||
          (memberDetail != null &&
              !memberDetail.hasOwnProperty(Constants.STRUCTURE_NAME))
      ) {
        for (let response of responses) {
          values.push(
              await this.redirectorForJSONToObject(response).catch((err) => {
                throw err;
              })
          );
        }
      } else {
        // need to have structure Name in memberDetail
        var pack = memberDetail[Constants.STRUCTURE_NAME];

        if (pack == Constants.CHOICE_NAMESPACE) {
          for (let response of responses) {

            let choiceClass = (await import(Constants.CHOICE_PATH+".js")).MasterModel;

            let choiceInstance = new choiceClass(response);

            values.push(choiceInstance);
          }
        } else if (
            memberDetail.hasOwnProperty(Constants.MODULE) &&
            memberDetail[Constants.MODULE] != null
        ) {
          for (let response of responses) {
            values.push(
                await this.isRecordResponse(
                    response,
                    await this.getModuleDetailFromUserSpecJSON(
                        memberDetail[Constants.MODULE]
                    ).catch((err) => {
                      throw err;
                    }),
                    pack
                ).catch((err) => {
                  throw err;
                })
            );
          }
        } else {
          for (let response of responses) {
            values.push(
                await this.getResponse(response, pack).catch((err) => {
                  throw err;
                })
            );
          }
        }
      }
    }

    return values;
  }

  async getModuleDetailFromUserSpecJSON(module) {
    let initializer = await Initializer.getInitializer();

    var recordFieldDetailsPath = join(
        initializer.getResourcePath(),
        Constants.FIELD_DETAILS_DIRECTORY,
        await this.getEncodedFileName().catch((err) => {
          throw err;
        })
    );

    var moduleDetail = await Utility.getJSONObject(
        Initializer.getJSON(recordFieldDetailsPath),
        module
    ).catch((err) => {
      throw err;
    });

    return moduleDetail;
  }

  async redirectorForJSONToObject(keyData) {
    let type = Object.prototype.toString.call(keyData);

    if (type == Constants.OBJECT_TYPE) {
      return await this.getMapData(keyData, null).catch((err) => {
        throw err;
      });
    } else if (type == Constants.ARRAY_TYPE) {
      return await this.getCollectionsData(keyData, null).catch((err) => {
        throw err;
      });
    } else {
      return keyData;
    }
  }

  async findMatch(classes, responseJson) {
    let pack = "";

    let ratio = 0;

    for (let className of classes) {
      var matchRatio = await this.findRatio(className, responseJson);

      if (matchRatio == 1.0) {
        pack = className;

        ratio = 1;

        break;
      } else if (matchRatio > ratio) {
        ratio = matchRatio;

        pack = className;
      }
    }

    return this.getResponse(responseJson, pack);
  }

  findRatio(className, responseJson) {
    var classDetail = Initializer.jsonDetails[className];

    var totalPoints = Array.from(Object.keys(classDetail)).length;

    var matches = 0;

    if (totalPoints == 0) {
      return 0;
    } else {
      for (let memberName in classDetail) {
        var memberDetail = classDetail[memberName];

        var keyName = memberDetail.hasOwnProperty(Constants.NAME)
            ? memberDetail[Constants.NAME]
            : null;

        if (
            keyName != null &&
            responseJson.hasOwnProperty(keyName) &&
            responseJson[keyName] != null
        ) {
          // key not empty
          var keyData = responseJson[keyName];

          let type = Object.prototype.toString.call(keyData);

          let structureName = memberDetail.hasOwnProperty(
              Constants.STRUCTURE_NAME
          )
              ? memberDetail[Constants.STRUCTURE_NAME]
              : null;

          if (type == Constants.OBJECT_TYPE) {
            type = Constants.MAP_TYPE;
          }

          if (
              Constants.TYPE_VS_DATATYPE.has(
                  memberDetail[Constants.TYPE].toLowerCase()
              ) &&
              Constants.TYPE_VS_DATATYPE.get(
                  memberDetail[Constants.TYPE].toLowerCase()
              ) == type
          ) {
            matches++;
          } else if (
              keyName.toLowerCase() == Constants.COUNT &&
              memberDetail[Constants.TYPE].toLowerCase() ==
              Constants.LONG_NAMESPACE.toLowerCase() &&
              type == Constants.NUMBER_TYPE
          ) {
            matches++;
          } else if (
              memberDetail[Constants.TYPE] == Constants.CHOICE_NAMESPACE
          ) {
            let values = memberDetail[Constants.VALUES];

            for (let value in values) {
              if (keyData == values[value]) {
                matches++;

                break;
              }
            }
          }

          if (
              structureName != null &&
              structureName == memberDetail[Constants.TYPE]
          ) {
            if (memberDetail.hasOwnProperty(Constants.VALUES)) {
              let values = memberDetail[Constants.VALUES];

              for (let value in values) {
                if (keyData == values[value]) {
                  matches++;

                  break;
                }
              }
            } else {
              matches++;
            }
          }
        }
      }
    }

    return matches / totalPoints;
  }

  buildName(memberName) {
    let name = memberName.toLowerCase().split("_");

    var index = 0;

    if (name.length == 0) {
      index = 1;
    }

    var sdkName = name[0];

    sdkName = sdkName[0].toLowerCase() + sdkName.slice(1);

    index = 1;

    for (var nameIndex = index; nameIndex < name.length; nameIndex++) {
      var fieldName = name[nameIndex];

      var firstLetterUppercase = "";

      if (fieldName.length > 0) {
        firstLetterUppercase = fieldName[0].toUpperCase() + fieldName.slice(1);
      }

      sdkName = sdkName.concat(firstLetterUppercase);
    }

    return sdkName;
  }

  getFileName(name) {
    let fileName = [];

    let nameParts = name.split(/([A-Z][a-z]+)/).filter(function (e) {
      return e;
    });

    fileName.push(nameParts[0].toLowerCase());

    for (let i = 1; i < nameParts.length; i++) {
      fileName.push(nameParts[i].toLowerCase());
    }

    return fileName.join("_");
  }
}

export {
  JSONConverter as JSONConverter,
  JSONConverter as MasterModel
}
