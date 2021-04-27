const DBStore = require('./db_store').DBStore;

const Constants = require('../../../utils/util/constants').Constants;

class DBBuilder {
    _userName = Constants.MYSQL_USER_NAME;

    _portNumber = Constants.MYSQL_PORT_NUMBER;

    _password = "";

    _host = Constants.MYSQL_HOST;

    _databaseName = Constants.MYSQL_DATABASE_NAME;

    _tableName = Constants.MYSQL_TABLE_NAME;

    userName(userName) {
        this._userName = userName;

        return this;
    }

    portNumber(portNumber) {
        this._portNumber = portNumber;

        return this;
    }

    password(password) {
        this._password = password;

        return this;
    }

    host(host) {
        this._host = host;

        return this;
    }

    databaseName(databaseName) {
        this._databaseName = databaseName;

        return this;
    }

    tableName(tableName) {
        this._tableName = tableName;

        return this;
    }

    build() {
        return new DBStore(this._host, this._databaseName, this._tableName, this._userName, this._password, this._portNumber);
    }
}

module.exports = {
    MasterModel : DBBuilder,
    DBBuilder : DBBuilder
}