const Environment = require("./environment").Environment;

/**
 * The abstract class represents the properties of Zoho CRM DataCenter.
 */
class DataCenter {

    /**
     * This method to get accounts URL. URL to be used when calling an OAuth accounts.
     * @returns A String representing the accounts URL.
     */
    getIAMUrl() { }

    /**
     * The method to get the File Upload URL
     * @returns A String representing the File Upload URL.
     */
    getFileUploadUrl() { }

    /**
     * This method sets the environment to the calling DataCenter instance
     * @param {string} url - A String representing the domain URL
     * @param {string} accountsUrl - A String representing the accounts URL to fetch tokens.
     * @param {string} fileUploadUrl - A String representing the File Upload URL
     * @param {string} name - A string
     */
    static setEnvironment(url, accountsUrl, fileUploadUrl, name) {
        return new Environment(url, accountsUrl, fileUploadUrl, name);
    }
}

module.exports = {
    MasterModel: DataCenter,
    DataCenter: DataCenter
}