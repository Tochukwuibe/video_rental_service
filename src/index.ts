import * as  express from 'express';
import * as mongoose from 'mongoose';

import { genres } from './routes/genres/genres';
import { customers } from './routes/customers/customers';
import { movies } from './routes/movies/movie';

const app = express();
const port = process.env.PORT || 5000;

connect()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to vidly')
})


app.use('/api/genres', genres);
app.use('/api/customers', customers)
app.use('/api/movies', movies)




app.listen(port, () => {
    console.log(`serve listening on port ${port}`)
}) 





async function connect() {
    await mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true});
    console.log('connected to Mongodb...')
}
