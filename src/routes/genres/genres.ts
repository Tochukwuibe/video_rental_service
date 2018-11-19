import * as  express  from 'express';
import { getGenres, addGenre, updateGenre, deleteGenre, getGnere } from './genre.handlers';
import { auth } from '../../middleware/auth';
import { admin } from '../../middleware/admin';




const router = express.Router();


router.get('/',  getGenres);
router.post('/', auth, addGenre);
router.put('/:id', auth,updateGenre);
router.delete('/:id', [auth, admin],  deleteGenre);
router.get('/:id',  getGnere);

export const genres = router;