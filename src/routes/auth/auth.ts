import { Router } from 'express';
import { login } from './auth.handlers';


const router = Router();



router.post('/', login);


export const auth = router;