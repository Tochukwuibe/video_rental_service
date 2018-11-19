import * as winston from 'winston';

export function error(err, req, res, next) {
    console.log('the error handeling middlewear');
    winston.error(err.message, err)
    return res.status(500).send('somthing went wrong')
}