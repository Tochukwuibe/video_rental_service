import {Router} from 'express'
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie } from './movie.handler';


const router = Router();


router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie)

export const movies = router;
