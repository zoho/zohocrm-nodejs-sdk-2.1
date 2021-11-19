/**
 * This class represents the Zoho CRM environment.
 */
class Environment {

    url;

    accountsUrl;

    fileUploadUrl;

    name;

    /**
     * Creates an Environment class instance with the specified parameters.
     * @param {string} url - A String representing the domain URL
     * @param {string} accountsUrl - A String representing the accounts URL to fetch tokens.
     * @param {string} fileUploadUrl - A string representing the file Upload URL
     * @param {string} name - A string
     */
    constructor(url, accountsUrl, fileUploadUrl, name) {

        this.url = url;

        this.accountsUrl = accountsUrl;

        this.fileUploadUrl = fileUploadUrl;

        this.name = name;
    }

    /**
     * The method is used to get the Zoho CRM API URL.
     * @returns {string} A String representing the Zoho CRM API URL.
     */
    getUrl() {
        return this.url;
    }

    /**
     * The method to get the Zoho CRM Accounts URL.
     * @returns {string} A String representing the accounts URL.
     */
    getAccountsUrl() {
        return this.accountsUrl;
    }

    /**
     * The method to get the File Upload URL.
     * @returns {string} A String representing the File Upload URL.
     */
    getFileUploadUrl() {
        return this.fileUploadUrl;
    }

    /**
     * This method to get name.
     * @return {string} A string representing the name.
     */
    getName() {
        return this.name;
    }
}

module.exports = {
    MasterModel: Environment,
    Environment: Environment
}