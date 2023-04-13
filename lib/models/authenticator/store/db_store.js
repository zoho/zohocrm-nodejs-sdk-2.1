import {OAuthBuilder} from "../oauth_builder.js";

import mysql from "mysql";

import {TokenStore} from "./token_store.js";

import {OAuthToken} from "../oauth_token.js";

import {Constants} from "../../../utils/util/constants.js";

import {SDKException} from "../../../core/com/zoho/crm/api/exception/sdk_exception.js";


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
  constructor(
      host = null,
      databaseName = null,
      tableName = null,
      userName = null,
      password = null,
      portNumber = null
  ) {
    super();

    this.host = host;

    this.databaseName = databaseName;

    this.tableName = tableName;

    this.userName = userName;

    this.password = password;

    this.portNumber = portNumber;
  }

  /**
   *
   * @param user
   * @param token
   * @returns {Promise<unknown>}
   */

  async getToken (user, token) {
    try {
      var connection = await this.getConnection();

      if (token instanceof OAuthToken) {
        var oauthToken = token;

        var sql = await this.constructDBQuery(
            user.getName(),
            oauthToken,
            false
        );

        return new Promise (function (resolve, reject) {
          connection.connect(function (err) {
            // if (err) throw err;
            if (err) {
              return reject(err);
            }

            connection.query(sql, function (err, result) {
              connection.end();
              if (err) {
                return reject(err);
                // throw err;
              }
              // connection.end();

              if (result.length != 0) {
                oauthToken.setId(result[0].id);

                oauthToken.setUserMail(result[0].user_mail);

                oauthToken.setClientId(result[0].client_id);

                oauthToken.setClientSecret(result[0].client_secret);

                oauthToken.setRefreshToken(result[0].refresh_token);

                oauthToken.setAccessToken(result[0].access_token);

                oauthToken.setGrantToken(result[0].grant_token);

                oauthToken.setExpiresIn(result[0].expiry_time);

                oauthToken.setRedirectURL(result[0].redirect_url);

                return resolve(oauthToken);
              }

              return resolve(null);
            });
          });
        }).catch(err => {
          throw err;
        });
      }
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.GET_TOKEN_DB_ERROR,
          null,
          error
      );
    }
  }

  async saveToken(user, token){
    try {
      var connection = await this.getConnection();

      var dbStoreInstance = this;

      if (token instanceof OAuthToken) {
        token.setUserMail(user.getName());

        var sqlQuery =
            "INSERT INTO " +
            this.tableName +
            "(id,user_mail,client_id,client_secret,refresh_token,access_token,grant_token,expiry_time,redirect_url) VALUES ?";

        var values = [
          [
            token.getId(),
            user.getName(),
            token.getClientId(),
            token.getClientSecret(),
            token.getRefreshToken(),
            token.getAccessToken(),
            token.getGrantToken(),
            token.getExpiresIn(),
            token.getRedirectURL(),
          ],
        ];

        await dbStoreInstance.deleteToken(token).catch(err => {throw err;});

        return new Promise(function (resolve, reject) {
            connection.connect(function (err) {
              if (err) {
                return reject(err);
              }

              connection.query(sqlQuery, [values], function (err, result) {
                connection.end();
                if (err) {
                  return reject(err);
                }

                return resolve();
              })
            })
          }).catch(err => {throw err;});
      }
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.SAVE_TOKEN_DB_ERROR,
          null,
          error
      );
    }
  }

  async deleteToken(token) {
    try {
      var connection = await this.getConnection();

      if (token instanceof OAuthToken) {
        var sqlQuery = await this.constructDBQuery(
            token.getUserMail(),
            token,
            true
        )

        return new Promise(function (resolve, reject) {
          connection.connect(function (err) {
            if (err){
              return reject(err);
            }

            connection.query(sqlQuery, function (err, result) {
              connection.end();
              if (err) {
                return reject(err);
              }

              return resolve(result);
            })
          })
        }).catch(err=>{throw err;});
      }
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.DELETE_TOKEN_DB_ERROR,
          null,
          error
      );
    }
  }

  async getTokens() {
    var tokens = [];

    try {
      var connection = await this.getConnection();

      var sqlQuery = "select * from " + this.tableName + ";";

      return new Promise(function (resolve, reject) {
        connection.connect(function (err) {
          if (err){
            return reject(err);
          }

          connection.query(sqlQuery, function (err, result) {
            connection.end();
            if (err) {
              return reject(err);
            }

            if (result.length > 0) {
              for (let row of result) {
                let grantToken =
                    row.grant_token !== null &&
                    row.grant_token !== Constants.NULL_VALUE &&
                    row.grant_token.length > 0
                        ? row.grant_token
                        : null;

                let token = new OAuthBuilder()
                    .clientId(row.client_id)
                    .clientSecret(row.client_secret)
                    .refreshToken(row.refresh_token)
                    .build();

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

              return resolve(tokens);
            }

            return resolve(null);
          });
        });
      }).catch(err=>{throw err;});
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.GET_TOKENS_DB_ERROR,
          null,
          error
      );
    }
  }

  async deleteTokens() {
    try {
      var connection = await this.getConnection();

      var sqlQuery = "delete from " + this.tableName + ";";

      return new Promise(function (resolve, reject) {
        connection.connect(function (err) {
          if (err){
            return reject(err);
          }

          connection.query(sqlQuery, function (err, result) {

            connection.end();
            if (err) {
              return reject(err);
            }

            return resolve(result);
          });
        });
      }).catch(err=> {throw err;});
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.DELETE_TOKENS_DB_ERROR,
          null,
          error
      );
    }
  }

  constructDBQuery(email, token, isDelete) {
    if (email == null) {
      throw new SDKException(
          Constants.USER_MAIL_NULL_ERROR,
          Constants.USER_MAIL_NULL_ERROR_MESSAGE
      );
    }

    var query = isDelete ? "delete from " : "select * from ";

    query +=
        this.tableName +
        " where user_mail ='" +
        email +
        "' and client_id='" +
        token.getClientId() +
        "' and ";

    if (token.getGrantToken() != null) {
      query += "grant_token='" + token.getGrantToken() + "'";
    } else {
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
      port: Number(this.portNumber),
    });

    return connection;
  }

  async getTokenById(id, token) {
    try {
      var connection = await this.getConnection();

      if (token instanceof OAuthToken) {
        var sql = "select * from " + this.tableName + " where id='" + id + "'";

        return new Promise(function (resolve, reject) {
          connection.connect(function (err) {
            if (err){
              return reject(err);
            }

            connection.query(sql, function (err, result) {
              connection.end();
              if (err) {
                return reject(err);
              }

              if (result.length != 0) {
                let grantToken =
                    result[0].grant_token != null &&
                    result[0].grant_token !== Constants.NULL_VALUE &&
                    result[0].grant_token.length > 0
                        ? result[0].grant_token
                        : null;

                token.setClientId(result[0].client_id);

                token.setClientSecret(result[0].client_secret);

                token.setRefreshToken(result[0].refresh_token);

                token.setId(result[0].id);

                if (grantToken != null) {
                  token.setGrantToken(grantToken);
                }

                token.setUserMail(result[0].user_mail);

                token.setAccessToken(result[0].access_token);

                token.setExpiresIn(result[0].expiry_time);

                token.setRedirectURL(result[0].redirect_url);

                return resolve(token);
              } else {
                return reject(new SDKException(Constants.TOKEN_STORE, Constants.GET_TOKEN_BY_ID_DB_ERROR));
              }
            });
          });
        }).catch(err=> { throw err;});
      }
    } catch (error) {
      throw new SDKException(
          Constants.TOKEN_STORE,
          Constants.GET_TOKEN_DB_ERROR,
          null,
          error
      );
    }
  }
}

export { DBStore as DBStore, DBStore as MasterModel };
