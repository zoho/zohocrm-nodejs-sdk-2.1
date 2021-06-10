/**
 * This class represents the Logger level and the file path.
 */
class Logger {
    level;
    filePath;

    constructor(level, filePath) {
        this.level = level;
        this.filePath = filePath;
    }

    /**
     * Creates an Logger class instance with the specified log level and file path.
     * @param {Levels} level A Levels class member containing log level.
     * @param {String} filePath A string containing absolute file path to write logs.
     */
    static getInstance(level, filePath) {
        return new Logger(level, filePath)
    }

    /**
     * The method to get the logger level
     * @returns {String} A string representing the Log level.
     */
    getLevel() {
        return this.level;
    }

    /**
     * The method to get the logger filepath
     * @returns {String} A string representing the Log filepath
     */
    getFilePath() {
        return this.filePath;
    }
}

/**
 * This class represents the possible logger levels
 */
class Levels {
    static INFO = 'info';
    static DEBUG = 'debug';
    static WARN = 'warn';
    static VERBOSE = 'verbose';
    static ERROR = 'error';
    static SILLY = 'silly';
}

module.exports = {
    Logger: Logger,
    Levels: Levels
};
