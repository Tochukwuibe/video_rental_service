const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

export function winstonConfig() {
    winston.add(new winston.transports.File({ filename: 'log.log' }))
    // winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error' }))
}


export function handelUncaughtExceptions() {
    process.on('uncaughtException', (err) => {
        console.log('an uncaught exception cool')
        winston.error(err.message, err)
        process.exit(1)
    })
}


export function unhandledPromiseRejection() {
    process.on('unhandledRejection', (err) => {
        console.log('an unhandeled rejection')
        winston.error(err.message, err)
        process.exit(1)
    })
}
