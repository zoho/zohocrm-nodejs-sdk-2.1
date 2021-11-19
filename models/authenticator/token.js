/**
 * This class verifies and sets token to APIHTTPConnector instance.
 */
 class Token {

    /**
     * This method is to set authentication token to APIHTTPConnector instance.
     * @param {APIHTTPConnector} urlConnection - A APIHTTPConnector class instance.
     * @throws {SDKException}
     */
    authenticate(urlConnection) { }

    /**
     * The method to remove the current token from the Store.
     * @returns {Boolean} - A Boolean value representing the removed status.
     * @throws {SDKException}
     */
    remove() { }
}

module.exports = {
    MasterModel: Token,
    Token: Token
}