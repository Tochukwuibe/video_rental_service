import {Router } from 'express';
import { getRentals, addRental } from './rentals.helpers';

const router = Router();




router.get('/',  getRentals);
router.post('/',  addRental);



export const rentals = router;
