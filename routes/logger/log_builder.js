const Logger = require("./logger").Logger;

class LogBuilder {
    _level;

    _filePath;

    level(level) {
        this._level = level;

        return this;
    }

    filePath(filePath) {
        this._filePath = filePath;

        return this;
    }

    build() {
        return Logger.getInstance(this._level, this._filePath);
    }
}

module.exports = {
    MasterModel: LogBuilder,
    LogBuilder: LogBuilder
};