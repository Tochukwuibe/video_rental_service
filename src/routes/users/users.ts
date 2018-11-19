import { Router } from 'express';
import { registerUser, getUser } from './users.handlers';
import { auth } from '../../middleware/auth';

const router = Router();

router.post ('/', registerUser);
router.get('/me', auth, getUser)


export const users = router;