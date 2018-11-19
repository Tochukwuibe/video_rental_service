import {Router} from 'express';
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from './customers.handlers';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', auth, addCustomer);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth,  deleteCustomer);



export const customers = router;