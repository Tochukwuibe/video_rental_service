import * as  express  from 'express';
import { getGenres, addGenre, updateGenre, deleteGenre, getGnere } from './genre.handlers';



const router = express.Router();


router.get('/', getGenres);
router.post('/', addGenre)
router.put('/:id', updateGenre)
router.delete('/:id', deleteGenre)
router.get('/:id', getGnere)

export const genres = router;