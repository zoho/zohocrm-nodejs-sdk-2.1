const mysql = require('mysql');
const TokenStore = require('./token_store').TokenStore;
const Constants = require('../../../utils/util/constants').Constants;
const SDKException = require('../../../core/com/zoho/crm/api/exception/sdk_exception').SDKException;
const OAuthToken = require("../oauth_token").OAuthToken;
const OAuthBuilder = require("../oauth_builder").OAuthBuilder;

/**
 * This class stores the user token details to the MySQL DataBase.
 */
class DBStore extends TokenStore {

    userName;

    portNumber;

    password;

    host;

    databaseName;

    tableName;

    /**
     * Creates an DBStore class instance with the specified parameters.
     * @param {string} host - A String containing the DataBase host name. Default value is localhost
     * @param {string} databaseName - A String containing the DataBase name. Default value is zohooauth
     * @param {string} tableName - A String containing the DataBase table name. Default value is oauthtoken
     * @param {string} userName - A String containing the DataBase user name. Default value is root
     * @param {string} password - A String containing the DataBase password. Default value is an empty string
     * @param {string} portNumber - A String containing the DataBase port number. Default value is 3306
     */
    constructor(host = null, databaseName = null, tableName = null, userName = null, password = null, portNumber = null) {
        super();

        this.host = host;

        this.databaseName = databaseName;

        this.tableName = tableName;

        this.userName = userName;

        this.password = password;

        this.portNumber = portNumber;
    }

    getToken(user, token) {
        try {
            var connection = this.getConnection();

            if (token instanceof OAuthToken) {

                var oauthToken = token;

                var sql = this.constructDBQuery(user.getEmail(), oauthToken, false);

                return new Promise(function (resolve, reject) {
                    connection.connect(function (err) {
                        if (err) throw err;

                        connection.query(sql, function (err, result) {
                            if (err) {
                                connection.end();

                                throw new Error(err);
                            }

                            connection.end();

                            if (result.length != 0) {
                                oauthToken.setId(result[0].id);

                                oauthToken.setAccessToken(result[0].access_token);

                                oauthToken.setExpiresIn(result[0].expiry_time);

                                oauthToken.setRefreshToken(result[0].refresh_token);

                                oauthToken.setUserMail(result[0].user_mail);

                                resolve(oauthToken);
                            }

                            resolve(null);
                        });
                    });
                })
            }

        } catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.GET_TOKEN_DB_ERROR, null, error);
        }
    };

    saveToken(user, token) {
        try {
            var connection = this.getConnection();

            var dbStoreInstance = this;

            if (token instanceof OAuthToken) {
                token.setUserMail(user.getEmail());

                var sqlQuery = "INSERT INTO " + this.tableName + "(id,user_mail,client_id,client_secret,refresh_token,access_token,grant_token,expiry_time,redirect_url) VALUES ?";

                var values = [
                    [token.getId(), user.getEmail(), token.getClientId(), token.getClientSecret(), token.getRefreshToken(), token.getAccessToken(), token.getGrantToken(), token.getExpiresIn(), token.getRedirectURL()]
                ]

                return new Promise(function (resolve, reject) {
                    dbStoreInstance.deleteToken(token).then(function () {
                        connection.connect(function (err) {
                            if (err) {
                                throw new Error(err);
                            }

                            connection.query(sqlQuery, [values], function (err, result) {
                                if (err) {
                                    connection.end();

                                    throw new Error(err);
                                }

                                connection.end();

                                resolve();
                            })
                        })
                    })
                })
            }
        }
        catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.SAVE_TOKEN_DB_ERROR, null, error);
        }
    }

    deleteToken(token) {
        try {
            var connection = this.getConnection();

            if (token instanceof OAuthToken) {

                var sqlQuery = this.constructDBQuery(token.getUserMail(), token, true);

                return new Promise(function (resolve, reject) {
                    connection.connect(function (err) {
                        if (err) throw err;

                        connection.query(sqlQuery, function (err, result) {
                            if (err) {
                                throw new Error(err);
                            }

                            connection.end();

                            resolve(result);
                        })
                    })
                })
            }
        }
        catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.DELETE_TOKEN_DB_ERROR, null, error);
        }
    };

    getTokens() {
        var tokens = [];

        try {
            var connection = this.getConnection();

            var sqlQuery = "select * from " + this.tableName + ";";

            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    if (err) throw err;

                    connection.query(sqlQuery, function (err, result) {
                        if (err) {
                            connection.end();

                            throw new Error(err);
                        }

                        connection.end();

                        if (result.length > 0) {
                            for (let row of result) {
                                let grantToken = (row.grant_token !== null && row.grant_token !== Constants.NULL_VALUE && row.grant_token.length > 0) ? row.grant_token : null;

                                let token = new OAuthBuilder().clientId(row.client_id).clientSecret(row.client_secret).refreshToken(row.refresh_token).build();

                                token.setId(row.id);

                                if (grantToken != null) {
                                    token.setGrantToken(grantToken);
                                }

                                token.setUserMail(row.user_mail);

                                token.setAccessToken(row.access_token);

                                token.setExpiresIn(row.expiry_time);

                                token.setRedirectURL(row.redirect_url);

                                tokens.push(token);
                            }

                            resolve(tokens);
                        }

                        resolve(null);
                    });
                });
            })

        } catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.GET_TOKENS_DB_ERROR, null, error);

        }
    }

    deleteTokens() {
        try {
            var connection = this.getConnection();

            var sqlQuery = "delete from " + this.tableName + ";";

            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    if (err) throw err;

                    connection.query(sqlQuery, function (err, result) {
                        if (err) {
                            throw new Error(err);
                        }

                        connection.end();

                        resolve(result);
                    })
                })
            })
        }
        catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.DELETE_TOKENS_DB_ERROR, null, error);
        }
    }

    constructDBQuery(email, token, isDelete) {
        if (email == null) {
            throw new SDKException(Constants.USER_MAIL_NULL_ERROR, Constants.USER_MAIL_NULL_ERROR_MESSAGE);
        }

        var query = isDelete ? "delete from " : "select * from ";

        query += this.tableName + " where user_mail ='" + email + "' and client_id='" + token.getClientId() + "' and ";

        if (token.getGrantToken() != null) {
            query += "grant_token='" + token.getGrantToken() + "'";
        }
        else {
            query += "refresh_token='" + token.getRefreshToken() + "'";
        }

        return query;
    }

    getConnection() {
        var connection = mysql.createConnection({
            host: this.host,
            user: this.userName,
            password: this.password,
            database: this.databaseName,
            port: this.portNumber
        });

        return connection;
    }

    getTokenById(id, token) {
        try {
            var connection = this.getConnection();

            if (token instanceof OAuthToken) {

                var sql = "select * from " + this.tableName + " where id='" + id + "'";

                return new Promise(function (resolve, reject) {
                    connection.connect(function (err) {
                        if (err) throw err;

                        connection.query(sql, function (err, result) {
                            if (err) {
                                connection.end();

                                throw new Error(err);
                            }

                            connection.end();

                            if (result.length != 0) {
                                let grantToken = (result[0].grant_token != null && result[0].grant_token !== Constants.NULL_VALUE && strlen(result[0].grant_token) > 0) ? result[0].grant_token : null;

                                token.setClientId(result[0].client_id);

                                token.setClientSecret(result[0].client_secret);

                                token.setRefreshToken(result[0].refresh_token);

                                token.setId(result[0].id);

                                if (grantToken != null) {
                                    oauthToken.setGrantToken(grantToken);
                                }

                                token.setUserMail(result[0].user_mail);

                                token.setAccessToken(result[0].access_token);

                                token.setExpiresIn(result[0].expiry_time);

                                token.setRedirectURL(result[0].redirect_url);

                                resolve(token);
                            }
                            else {
                                throw new SDKException(Constants.TOKEN_STORE, Constants.GET_TOKEN_BY_ID_DB_ERROR);
                            }

                            resolve(null);
                        });
                    });
                })
            }

        } catch (error) {
            throw new SDKException(Constants.TOKEN_STORE, Constants.GET_TOKEN_DB_ERROR, null, error);
        }
    };
}

module.exports = {
    MasterModel: DBStore,
    DBStore: DBStore
}