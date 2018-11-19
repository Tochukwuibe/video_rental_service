import { Express, json } from 'express'
import { genres } from '../routes/genres/genres';
import { customers } from '../routes/customers/customers';
import { movies } from '../routes/movies/movie';
import { rentals } from '../routes/rentals/rentals';
import { users } from '../routes/users/users';
import { auth } from '../middleware/auth';
import { error } from '../middleware/error';

export function routes(app: Express) {
    app.use(json())

    app.get('/', welcome)
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error)
}


function welcome(req, res) {
    res.send('Welcome to vidly')
};

