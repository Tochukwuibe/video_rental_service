import * as config from 'config'

export function validateConfig() {
    const key = config.get('jwtPrivateKey');
    if (!key) {
        throw new Error('Missing config variable')
    }
}