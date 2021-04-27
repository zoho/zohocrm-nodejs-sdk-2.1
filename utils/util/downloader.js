const Converter = require("./converter").Converter;
const StreamWrapper = require("./stream_wrapper").StreamWrapper;
const Initializer = require("../../routes/initializer").Initializer;
const Constants = require("./constants").Constants;
const fs = require("fs");

/**
 * This class is to process the download file and stream response.
 * @extends Converter
 */
class Downloader extends Converter{
    uniqueValuesMap = [];

    constructor(commonApiHandler) {
        super(commonApiHandler);
    }

    appendToRequest(requestBase,requestObject) {
        return;
    }

    formRequest(requestObject, pack, instanceNumber, classMemberDetail) {
        return null;
    }

    getWrappedResponse(response, pack) {
        return this.getResponse(response,pack);
    }

    getResponse(response, pack) {
        var instance = null;

        var classDetail = Initializer.jsonDetails[pack];

        if (classDetail.hasOwnProperty(Constants.INTERFACE) && classDetail[Constants.INTERFACE]){
            let classes = classDetail[Constants.CLASSES];

            for (let index = 0; index < classes.length; index++) {
                let eachClass = classes[index];

                if(eachClass.toString().includes(Constants.FILE_BODY_WRAPPER)){
                    return this.getResponse(response, eachClass);
                }
            }
        }
        else{
            let ClassName = require("../../" + pack).MasterModel;

            instance = new ClassName();

            for (let memberName in classDetail) {
                var memberDetail = classDetail[memberName];

                var type = memberDetail[Constants.TYPE];

                if(type === Constants.STREAM_WRAPPER_CLASS_PATH){

                    var fileName = "";

                    let contentDisposition = (response.headers[Constants.CONTENT_DISPOSITION]).toString();

                    if(contentDisposition.includes("'")){
                        let start_index = contentDisposition.lastIndexOf("'");

                        fileName = contentDisposition.substring(start_index + 1);
                    }
                    else if(contentDisposition.includes("\"")){
                        let start_index = contentDisposition.lastIndexOf("=");

                        fileName = contentDisposition.substring(start_index + 1).replace(/"/g, "");
                    }

                    var instanceValue = new StreamWrapper(fileName, response.rawBody, null);
                }

               Reflect.set(instance, memberName, instanceValue);
            }

            return instance;
        }
    }
}

module.exports = {
    MasterModel : Downloader,
    Downloader : Downloader
};