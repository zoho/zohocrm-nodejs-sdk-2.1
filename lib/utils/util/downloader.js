import {Converter} from "./converter.js";

import {StreamWrapper} from "./stream_wrapper.js";

import {Initializer} from "../../routes/initializer.js";

import {Constants} from "./constants.js";


/**
 * This class is to process the download file and stream response.
 * @extends Converter
 */
class Downloader extends Converter {
    uniqueValuesMap = [];

    constructor(commonApiHandler) {
        super(commonApiHandler);
    }

    appendToRequest(requestBase, requestObject) {
        return;
    }

    formRequest(requestObject, pack, instanceNumber, classMemberDetail) {
        return null;
    }

    getWrappedResponse(response, pack) {
        return this.getResponse(response, pack);
    }

    async getResponse(response, pack) {
        var instance = null;

        var instanceValue = null;

        var recordJsonDetails = Initializer.jsonDetails[pack];

        if (recordJsonDetails.hasOwnProperty(Constants.INTERFACE) && recordJsonDetails[Constants.INTERFACE]) {
            let classes = recordJsonDetails[Constants.CLASSES];

            for (let index = 0; index < classes.length; index++) {
                let className = classes[index];

                if (className.toString().includes(Constants.FILE_BODY_WRAPPER)) {
                    return this.getResponse(response, className);
                }
            }
        }
        else {
            let ClassName = (await import("../../"+pack+".js")).MasterModel;

            instance = new ClassName();

            for (let memberName in recordJsonDetails) {
                var memberJsonDetails = recordJsonDetails[memberName];

                var type = memberJsonDetails[Constants.TYPE];

                if (type === Constants.STREAM_WRAPPER_CLASS_PATH) {

                    var fileName = "";

                    let contentDisposition = (response.headers[Constants.CONTENT_DISPOSITION]).toString();

                    if (contentDisposition.includes("'")) {
                        let start_index = contentDisposition.lastIndexOf("'");

                        fileName = contentDisposition.substring(start_index + 1);
                    }
                    else if (contentDisposition.includes("\"")) {
                        let start_index = contentDisposition.lastIndexOf("=");

                        fileName = contentDisposition.substring(start_index + 1).replace(/"/g, "");
                    }

                    instanceValue = new StreamWrapper(fileName, response.rawBody, null);
                }

                Reflect.set(instance, memberName, instanceValue);
            }

            return instance;
        }
    }
}

export {
    Downloader as Downloader,
    Downloader as MasterModel
}