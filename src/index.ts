import * as  express from 'express';

import { routes } from './startup/routes';
import { connect } from './startup/database';
import { winstonConfig, handelUncaughtExceptions, unhandledPromiseRejection } from './startup/logging';
import { validateConfig } from './startup/config';



const app = express();
const port = process.env.PORT || 5000;


async function startUp() {
    await connect();
    winstonConfig()
    handelUncaughtExceptions();
    unhandledPromiseRejection();
    validateConfig();

    routes(app);


    app.listen(port, () => {
        console.log(`serve listening on port ${port}`)
    })
}


startUp();

// throw new Error('again')
// Promise.reject(new Error('bad'))












