const path = require("path");
const fs = require("fs");
const SDKException = require("../../core/com/zoho/crm/api/exception/sdk_exception").SDKException;
const Constants = require("./constants").Constants;

/**
 * This class handles the file stream and name.
 */
class StreamWrapper {

    name;

    stream;

    file;

    /**
     * Creates a StreamWrapper class instance with the specified parameters.
     * @param {string} name - A String containing the file name.
     * @param {object} stream - A InputStream containing the file stream.
     * @param {string} filePath - A String containing the absolute file path.
     */
    constructor(name = null, stream = null, filePath = null) {
        if (filePath == null) {
            this.name = name;

            this.stream = stream;
        }
        else {
            if (!fs.existsSync(filePath)) {
                throw new SDKException(Constants.FILE_ERROR, Constants.FILE_DOES_NOT_EXISTS);
            }

            this.file = filePath;

            this.name = path.basename(filePath);

            this.stream = fs.createReadStream(filePath);
        }
    }

    /**
     * This is a getter method to get the file name.
     * @returns A String representing the file name.
     */
    getName() {
        return this.name;
    }

    /**
     * This is a getter method to get the file input stream.
     * @returns A ReadStream representing the file input stream.
     */
    getStream() {
        return this.stream;
    }
}

module.exports = {
    MasterModel: StreamWrapper,
    StreamWrapper: StreamWrapper
}
