const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

/**
 * Creates a Winston logger instance with daily rotating file transport.
 * @type {import('winston').Logger}
 * @property {string} level - The logging level. Default is 'info'.
 * @property {Object} format - The format configuration for the logger.
 * @property {Array} transports - The transports configuration for the logger.
 */
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;