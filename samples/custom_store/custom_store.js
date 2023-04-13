import mysql from "mysql";
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
/**
 * This class stores the user token details to the MySQL DataBase.
 */
class CustomStore extends ZOHOCRMSDK.TokenStore {

    userName;
    portNumber;
    password;
    host;
    databaseName;
    /**
     * Creates an DBStore class instance with the specified parameters.
     * @param {string} host - A String containing the DataBase host name. Default value is localhost
     * @param {string} databaseName - A String containing the DataBase name. Default value is zohooauth
     * @param {string} userName - A String containing the DataBase user name. Default value is root
     * @param {string} password - A String containing the DataBase password. Default value is an empty string
     * @param {string} portNumber - A String containing the DataBase port number. Default value is 3306
     */
    constructor(host = null, databaseName = null, userName = null, password = null, portNumber = null) {
        super();

        this.host = host != null ? host : ZOHOCRMSDK.Constants.MYSQL_HOST;

        this.databaseName = databaseName != null ? databaseName : ZOHOCRMSDK.Constants.MYSQL_DATABASE_NAME;

        this.userName = userName != null ? userName : ZOHOCRMSDK.Constants.MYSQL_USER_NAME;

        this.password = password != null ? password : "";

        this.portNumber = portNumber != null ? portNumber : ZOHOCRMSDK.Constants.MYSQL_PORT_NUMBER;
    }

    getToken(user, token) {
        try {
            var connection = this.getConnection();

            if (token instanceof ZOHOCRMSDK.OAuthToken) {

                var sql = this.constructDBQuery(user.email, token, false);

                var oauthToken = token;

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
                                oauthToken.accessToken = result[0].access_token;

                                oauthToken.refreshToken = result[0].refresh_token;

                                oauthToken.expiresIn = result[0].expiry_time;

                                resolve(oauthToken);
                            }

                            resolve(null);
                        });
                    });
                })
            }

        } catch (error) {
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.TOKEN_STORE, ZOHOCRMSDK.Constants.GET_TOKEN_DB_ERROR, null, error);
        }
    };

    async saveToken(user, token) {
        try {
            var connection = this.getConnection();

            var dbStoreInstance = this;

            if (token instanceof ZOHOCRMSDK.OAuthToken) {
                token.userMail = user.email;

                var sqlQuery = "INSERT INTO oauthtoken(user_mail,client_id,refresh_token,access_token,grant_token,expiry_time) VALUES ('" + user.email + "'," + "'" + token.clientID + "'," + "'" + token.refreshToken + "'," + "'" + token.accessToken + "'," + "'" + token.grantToken + "'," + "'" + token.expiresIn + "')";

                return new Promise(function (resolve, reject) {
                    dbStoreInstance.deleteToken(token).then(function () {
                        connection.connect(function (err) {
                            if (err) {
                                throw new Error(err);
                            }

                            connection.query(sqlQuery, function (err, result) {
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
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.TOKEN_STORE, ZOHOCRMSDK.Constants.SAVE_TOKEN_DB_ERROR, null, error);
        }
    }

    deleteToken(token) {
        try {
            var connection = this.getConnection();

            if (token instanceof ZOHOCRMSDK.OAuthToken) {

                var sqlQuery = this.constructDBQuery(token.userMail, token, true);

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
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.TOKEN_STORE, ZOHOCRMSDK.Constants.DELETE_TOKEN_DB_ERROR, null, error);
        }
    };

    getTokens() {
        var tokens = [];

        try {
            var connection = this.getConnection();

            var sqlQuery = "select * from oauthtoken;";

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
                                let tokenType = (row.grant_token != null && row.grant_token != ZOHOCRMSDK.Constants.NULL_VALUE && row.grant_token.length > 0) ? TokenType.GRANT : TokenType.REFRESH;

                                let tokenValue = (tokenType == TokenType.REFRESH) ? row.refresh_token : row.grant_token;

                                let token = new ZOHOCRMSDK.OAuthToken(row.client_id, null, tokenValue, tokenType);

                                token.id = row.id;

                                token.expiresIn = row.expiry_time;

                                token.userMail = row.user_mail;

                                token.accessToken = row.access_token;

                                tokens.push(token);
                            }

                            resolve(tokens);
                        }

                        resolve(null);
                    });
                });
            })

        } catch (error) {
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.TOKEN_STORE, ZOHOCRMSDK.Constants.GET_TOKENS_DB_ERROR, null, error);

        }
    }

    deleteTokens() {
        try {
            var connection = this.getConnection();

            var sqlQuery = "delete from oauthtoken";

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
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.TOKEN_STORE, ZOHOCRMSDK.Constants.DELETE_TOKENS_DB_ERROR, null, error);
        }
    }

    constructDBQuery(email, token, isDelete) {
        if (email == null) {
            throw new ZOHOCRMSDK.SDKException(ZOHOCRMSDK.Constants.USER_MAIL_NULL_ERROR, ZOHOCRMSDK.Constants.USER_MAIL_NULL_ERROR_MESSAGE);
        }

        var query = isDelete ? "delete from " : "select * from ";

        query += "oauthtoken " + "where user_mail ='" + email + "' and client_id='" + token.clientID + "' and ";

        if (token.grantToken != null) {
            query += "grant_token='" + token.grantToken + "'";
        }
        else {
            query += "refresh_token='" + token.refreshToken + "'";
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
}

export {
    CustomStore as CustomStore
}