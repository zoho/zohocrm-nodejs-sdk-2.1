const Token = require("./token").Token;
const Initializer = require("../../routes/initializer").Initializer;
const Logger = require('winston');
const SDKException = require('../../core/com/zoho/crm/api/exception/sdk_exception').SDKException;
const Constants = require('../../utils/util/constants').Constants;
const got = require("got");
const formData = require("form-data");

/**
 * This class maintains the tokens and authenticates every request.
 */
class OAuthToken extends Token {
    clientID;

    clientSecret;

    redirectURL;

    grantToken;

    refreshToken;

    accessToken;

    expiresIn;

    userMail;

    id;

    /**
     * This is a setter method to set OAuth client id.
     * @param {string} clientID - A String containing the client Id.
     */
    setClientId(clientID) {
        this.clientID = clientID;
    }

    /**
     * This is a getter method to get OAuth client id.
     * @returns A String representing the OAuth client id.
     */
    getClientId() {
        return this.clientID;
    }

    /**
     * This is a setter method to set OAuth client secret.
     * @param {string} clientSecret - A String containing the client Secret.
     */
    setClientSecret(clientSecret) {
        this.clientSecret = clientSecret;
    }

    /**
     * This is a getter method to get OAuth client secret.
     * @returns A String representing the OAuth client secret.
     */
    getClientSecret() {
        return this.clientSecret;
    }

    /**
     * This is a getter method to get OAuth redirect URL.
     * @returns A String representing the OAuth redirect URL.
     */
    getRedirectURL() {
        return this.redirectURL;
    }

    /**
     * This is a setter method to set OAuth redirect URL.
     * @param {string} redirectURL - A String containing the redirectURL.
     */
    setRedirectURL(redirectURL) {
        this.redirectURL = redirectURL;
    }

    /**
     * This is a setter method to set grant token.
     * @param {string} grantToken - A String containing the grantToken.
     */
    setGrantToken(grantToken) {
        this.grantToken = grantToken;
    }

    /**
     * This is a getter method to get grant token.
     * @returns A String representing the grant token.
     */
    getGrantToken() {
        return this.grantToken;
    }

    /**
     * This is a getter method to get refresh token.
     * @returns A String representing the refresh token.
     */
    getRefreshToken() {
        return this.refreshToken;
    }

    /**
     * This is a setter method to set refresh token.
     * @param {string} refreshToken - A String containing the refresh token.
     */
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
    }

    /**
     * This is a getter method to get access token.
     * @returns A String representing the access token.
     */
    getAccessToken() {
        return this.accessToken;
    }

    /**
     * This is a setter method to set access token.
     * @param {string} accessToken A String containing the access token.
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }

    /**
     * This is a getter method to get token expire time.
     * @returns A String representing the token expire time.
     */
    getExpiresIn() {
        return this.expiresIn;
    }

    /**
     * This is a setter method to set token expire time.
     * @param {string} expiresIn A String containing the token expire time.
     */
    setExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
    }

    /**
     * This is a getter method to get token user mail.
     * @returns A String representing the userMail
     */
    getUserMail() {
        return this.userMail;
    }

    /**
     * This is a setter method to set token user email.
     * @param {String} userMail A String containing the userMail
     */
    setUserMail(userMail) {
        this.userMail = userMail;
    }

    /**
     * This is a getter method to get the id
     * @returns the id
     */
    getId() {
        return this.id;
    }

    /**
     * This is a setter method to set the id
     * @param {String} id A String containing the id
     */
    setId(id) {
        this.id = id;
    }

    async authenticate(urlConnection) {
        try {
            var token = "";

            var initializer = await Initializer.getInitializer();

            var store = initializer.getStore();

            var user = initializer.getUser();

            var oauthToken = null;

            if (this.accessToken == null) {
                if (this.id != null) {
                    oauthToken = await store.getTokenById(this.id, this);
                }
                else {
                    oauthToken = await store.getToken(user, this);
                }
            }
            else {
                oauthToken = this;
            }

            if (oauthToken === null) {//first time
                token = (this.refreshToken != null) ? (await this.refreshAccessToken(user, store)).getAccessToken() : (await this.generateAccessToken(user, store)).getAccessToken();
            }
            else if (oauthToken.getExpiresIn() != null && (parseInt(oauthToken.getExpiresIn()) - parseInt(new Date().getTime())) < 5000) { //access token will expire in next 5 seconds or less
                Logger.info(Constants.REFRESH_TOKEN_MESSAGE);

                token = (await this.refreshAccessToken(user, store)).getAccessToken();
            }
            else {
                token = this.accessToken;
            }

            await urlConnection.addHeader(Constants.AUTHORIZATION, Constants.OAUTH_HEADER_PREFIX + token);
        } catch (error) {
            if (!(error instanceof SDKException)) {
                error = new SDKException(null, null, null, error);
            }

            throw error;
        }
    }

    async refreshAccessToken(user, store) {
        let initializer = await Initializer.getInitializer();

        var url = initializer.getEnvironment().getAccountsUrl();

        var formDataRequestBody = new formData();

        formDataRequestBody.append(Constants.CLIENT_ID, this.clientID);

        formDataRequestBody.append(Constants.CLIENT_SECRET, this.clientSecret);

        formDataRequestBody.append(Constants.GRANT_TYPE, Constants.REFRESH_TOKEN);

        formDataRequestBody.append(Constants.REFRESH_TOKEN, this.refreshToken);

        const requestDetails = {
            method: Constants.REQUEST_METHOD_POST,
            headers: {},
            body: formDataRequestBody,
            encoding: "utf8",
            allowGetBody: true,
            throwHttpErrors: false
        };

        var response = await this.getResponse(url, requestDetails);

        try {
            await this.parseResponse(response.body);

            if (this.id == null) {
                await this.generateId();
            }

            await store.saveToken(user, this);
        } catch (error) {
            if (error instanceof SDKException) {
                throw error;
            }
            else if (error instanceof Error) {
                throw new SDKException(Constants.SAVE_TOKEN_ERROR, null, null, error);
            }
        }

        return this;
    }

    async generateAccessToken(user, store) {
        let initializer = await Initializer.getInitializer();

        var url = initializer.getEnvironment().getAccountsUrl();

        var formDataRequestBody = new formData();

        formDataRequestBody.append(Constants.CLIENT_ID, this.clientID);

        formDataRequestBody.append(Constants.CLIENT_SECRET, this.clientSecret);

        if (this.redirectURL != null) {
            formDataRequestBody.append(Constants.REDIRECT_URI, this.redirectURL);
        }

        formDataRequestBody.append(Constants.GRANT_TYPE, Constants.GRANT_TYPE_AUTH_CODE);

        formDataRequestBody.append(Constants.CODE, this.grantToken);

        const requestDetails = {
            method: Constants.REQUEST_METHOD_POST,
            headers: {},
            body: formDataRequestBody,
            encoding: "utf8",
            allowGetBody: true,
            throwHttpErrors: false
        };

        var response = await this.getResponse(url, requestDetails);

        try {

            await this.parseResponse(response.body);

            await this.generateId();

            await store.saveToken(user, this);

        } catch (error) {
            if (error instanceof SDKException) {
                throw error;
            }
            else if (error instanceof Error) {
                throw new SDKException(Constants.SAVE_TOKEN_ERROR, null, null, error);
            }
        }

        return this;
    }

    async getResponse(url, requestDetails) {
        return await got(url, requestDetails);
    }

    async parseResponse(response) {
        var responseJSON = JSON.parse(response);

        if (!responseJSON.hasOwnProperty(Constants.ACCESS_TOKEN)) {
            throw new SDKException(Constants.INVALID_TOKEN_ERROR, responseJSON.hasOwnProperty(Constants.ERROR_KEY) ? responseJSON[Constants.ERROR_KEY].toString() : Constants.NO_ACCESS_TOKEN_ERROR);
        }

        this.accessToken = responseJSON[Constants.ACCESS_TOKEN];

        this.expiresIn = (new Date().getTime() + await this.getTokenExpiryTime(responseJSON)).toString();

        if (responseJSON.hasOwnProperty(Constants.REFRESH_TOKEN)) {
            this.refreshToken = responseJSON[Constants.REFRESH_TOKEN];
        }

        return this;
    }

    getTokenExpiryTime(response) {
        return response.hasOwnProperty(Constants.EXPIRES_IN_SEC) ? response[Constants.EXPIRES_IN] : response[Constants.EXPIRES_IN] * 1000;
    }

    async remove() {
        try {
            let initializer = await Initializer.getInitializer();

            await initializer.store.deleteToken(this);

            return true;

        } catch (error) {
            if (error instanceof SDKException) {
                throw error;
            }
            else if (error instanceof Error) {
                throw new SDKException(null, null, null, error);
            }
        }
    }

    /**
     * Creates an OAuthToken class instance with the specified parameters.
     * @param {String} clientID - A String containing the OAuth client id.
     * @param {String} clientSecret - A String containing the OAuth client secret.
     * @param {String} grantToken - A String containing the GRANT token.
     * @param {String} refreshToken - A String containing the REFRESH token.
     * @param {String} redirectURL - A String containing the OAuth redirect URL.
     * @param {String} id - A string
     */
    constructor(clientID, clientSecret, grantToken, refreshToken, redirectURL = null, id = null, accessToken = null) {
        super();

        this.clientID = clientID;

        this.clientSecret = clientSecret;

        this.grantToken = grantToken;

        this.refreshToken = refreshToken;

        this.redirectURL = redirectURL;

        this.accessToken = accessToken;

        this.expiresIn = null;

        this.id = id;
    }

    async generateId() {
        let email = (await Initializer.getInitializer()).getUser().getEmail();

        let builder = Constants.NODEJS + (email).substring(0, (email.indexOf('@'))) + "_";

        builder = builder + (await Initializer.getInitializer()).getEnvironment().getName() + "_";

        builder = builder + this.refreshToken.substring(this.refreshToken.length - 4);

        this.id = builder;
    }
}

module.exports = {
    MasterModel: OAuthToken,
    OAuthToken: OAuthToken
}