import {Router} from 'express';
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from './customers.handlers';

const router = Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);



export const customers = router;