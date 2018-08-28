import {Genre} from '../../schemas/genres.schema'
import { Request, Response } from 'express';
import { validate } from '../../schemas/genres.schema';


export async function getGenres(req: Request, res: Response) {
    const genres = await Genre.find().sort('name');
    res.send(genres)
}

export async function addGenre(req: Request, res: Response) {
    const err = validate(req.body);

    if (err) { return res.status(400).send(err.details[0].message) }
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()

    return res.status(201).send(genre);
}

export async function updateGenre(req: Request, res: Response) {


    const err = validate(req.body);
    if (err) { return res.status(400).send(err.details[0].message) };

    const id = req.params.id;
    const genre = await findAndUpdateGnere(id, req.body.name);

    if (!genre) { return res.status(404).send('Genre not found') };

    return res.status(201).send(genre)
}

export async function deleteGenre(req: Request, res: Response) {
    const id = req.params.id;
    const genre = await findAndRemoveGnere(id);

    if (!genre) { return res.status(404).send('Genre not found') };

    return res.status(200).send(genre)
}

export async function getGnere(req: Request, res: Response) {
    const id = req.params.id;
    const genre = await findGenre(id);

    if (!genre) { return res.status(404).send('Genre not found') };

    return res.send(genre)
}




async function findGenre(id: string) {
    try {
        const genre = await Genre.find({ _id: id });
        return genre
    } catch (e) {
        return null;
    }
}

function findAndRemoveGnere(id: string) {
    return Genre.findByIdAndRemove(id)
}

function findAndUpdateGnere(id: string, name: string) {
    return Genre.findByIdAndUpdate(id, { name: name }, { new: true });
}


