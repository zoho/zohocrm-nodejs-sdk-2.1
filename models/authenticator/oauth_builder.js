const Utility = require('../../utils/util/utility').Utility;

const Constants = require('../../utils/util/constants').Constants;

const SDKException = require('../../core/com/zoho/crm/api/exception/sdk_exception').SDKException;

const OAuthToken = require('./oauth_token').OAuthToken;

class OAuthBuilder {
    _clientID;

    _clientSecret;

    _redirectURL;

    _refreshToken;

    _grantToken;

    _accessToken;

    _id;

    id(id) {
        if (id != null && typeof id !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.ID;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._id = id;

        return this;
    }

    clientId(clientID) {
        Utility.assertNotNull(clientID, Constants.TOKEN_ERROR, Constants.CLIENT_ID_NULL_ERROR_MESSAGE);

        if (typeof clientID !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.CLIENT_ID_FIELD;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._clientID = clientID;

        return this;
    }

    clientSecret(clientSecret) {
        Utility.assertNotNull(clientSecret, Constants.TOKEN_ERROR, Constants.CLIENT_SECRET_NULL_ERROR_MESSAGE);

        if (typeof clientSecret !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.CLIENT_SECRET_FIELD;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._clientSecret = clientSecret;

        return this;
    }

    redirectURL(redirectURL) {
        if (redirectURL != null && typeof redirectURL !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.REDIRECT_URL_FIELD;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._redirectURL = redirectURL;

        return this;
    }

    refreshToken(refreshToken) {
        if (typeof refreshToken !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.REFRESH_TOKEN;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._refreshToken = refreshToken;

        return this;
    }

    grantToken(grantToken) {
        if (typeof grantToken !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.GRANT_TOKEN;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._grantToken = grantToken;

        return this;
    }

    accessToken(accessToken) {
        if (accessToken != null && typeof accessToken !== Constants.STRING_NAMESPACE.toLowerCase()) {
            let error = {};

            error[Constants.ERROR_HASH_FIELD] = Constants.ACCESS_TOKEN;

            error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.STRING_NAMESPACE;

            error[Constants.ERROR_HASH_CLASS] = OAuthToken.name;

            throw new SDKException(Constants.TOKEN_ERROR, null, error, null);
        }

        this._accessToken = accessToken;

        return this;
    }

    build() {
        if (this._grantToken == null && this._refreshToken == null && this._id == null && this._accessToken == null) {
            throw new SDKException(Constants.MANDATORY_VALUE_ERROR, Constants.MANDATORY_KEY_ERROR, Constants.OAUTH_MANDATORY_KEYS);
        }

        return new OAuthToken(this._clientID, this._clientSecret, this._grantToken, this._refreshToken, this._redirectURL, this._id, this._accessToken);
    }
}

module.exports = {
    MasterModel: OAuthBuilder,
    OAuthBuilder: OAuthBuilder
}