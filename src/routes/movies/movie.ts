import {Router} from 'express'
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie } from './movie.handler';
import { auth } from '../../middleware/auth';


const router = Router();


router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', auth, addMovie);
router.put('/:id', auth, updateMovie);
router.delete('/:id', auth, deleteMovie)

export const movies = router;
