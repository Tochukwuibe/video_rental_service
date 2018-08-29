import { Genre } from './../../schemas/genres.schema';
import { Request, Response } from 'express'
import { Movie, validate } from '../../schemas/movies';



export async function getMovie(req: Request, res: Response) {
    try {

        const movie = await Movie.findById(req.params.id);
        if(!movie) {throw new Error()}

        return res.status(200).send(movie)

    } catch (e) {

        return res.status(404).send('Movie not found')
    }
}


export async function getMovies(req: Request, res: Response) {
    const movies = await Movie.find();
    return res.status(200).send(movies)
}

export async function addMovie(req: Request, res: Response) {
    try {

        let movie = req.body;
        validate(movie);

        const genre = await findGenre(movie.genreId) as any;

        movie = new Movie({
            ...movie, 
            genre: {
                _id: genre.id, 
                name: genre.name
             }
        })
        await movie.save();

        return res.status(201).send(movie)
    } catch (e) {

        return res.status(400).send(e.message)
    }


}

export async function updateMovie(req: Request, res: Response) {
    try {
        let update = req.body;
        validate(update);

        const genre = await findGenre(req.body.genreId) as any;

        const movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
            ...update, 
            genre: {
                _id: genre.id, 
                name: genre.name
             }
        }, { new: true })
        movie.save()

        return res.status(201).send(movie)
    } catch (e) {

        return res.status(400).send(e.message)
    }
}

export async function deleteMovie(req: Request, res: Response) {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);

        return res.status(200).send(movie)
    } catch (e) {

        return res.status(400).send(e.message)
    }
}

async function findGenre(genreId) {
    const genre = await Genre.findById(genreId)
    if(!genre) {throw new Error('No Genre found')}
    return genre
}