import { Router } from 'express';
import { getRentals, addRental } from './rentals.helpers';
import { auth } from '../../middleware/auth';

const router = Router();




router.get('/', getRentals);
router.post('/', auth, addRental);



export const rentals = router;
