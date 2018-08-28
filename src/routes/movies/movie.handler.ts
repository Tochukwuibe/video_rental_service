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
        movie = new Movie(movie)
        await movie.save();

        return res.status(201).send(movie)
    } catch (e) {

        return res.status(400).send(e.message)
    }


}

export async function updateMovie(req: Request, res: Response) {
    try {
        let update = req.body;
        validate(update)
        const movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, update, { new: true })
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