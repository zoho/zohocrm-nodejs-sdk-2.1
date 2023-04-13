import { DBStore } from "./db_store.js";

import { Constants } from "../../../utils/util/constants.js";

class DBBuilder {
  _userName = Constants.MYSQL_USER_NAME;

  _portNumber = Constants.MYSQL_PORT_NUMBER;

  _password = "";

  _host = Constants.MYSQL_HOST;

  _databaseName = Constants.MYSQL_DATABASE_NAME;

  _tableName = Constants.MYSQL_TABLE_NAME;

  userName(userName) {
    if (userName != null) {
      this._userName = userName;
    }

    return this;
  }

  portNumber(portNumber) {
    if (portNumber != null) {
      this._portNumber = portNumber;
    }

    return this;
  }

  password(password) {
    if (password != null) {
      this._password = password;
    }

    return this;
  }

  host(host) {
    if (host != null) {
      this._host = host;
    }

    return this;
  }

  databaseName(databaseName) {
    if (databaseName != null) {
      this._databaseName = databaseName;
    }

    return this;
  }

  tableName(tableName) {
    if (tableName != null) {
      this._tableName = tableName;
    }

    return this;
  }

  build() {
    return new DBStore(
        this._host,
        this._databaseName,
        this._tableName,
        this._userName,
        this._password,
        this._portNumber
    );
  }
}
export {
  DBBuilder as DBBuilder,
  DBBuilder as MasterModel
}
