import { Request, Response } from 'express';
import { validate, User } from '../../schemas/users';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';



export async function registerUser(req: Request, res: Response) {
    try {

        let user = req.body;
        validate(user);

        const exists = await User.findOne({ email: user.email })

        if (exists) { throw new Error('An account already exists with that email') }

        user = createNewUser(user);

        // incripting the users password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        const token = user.generateAuthToken();;

        return res.header('x-auth-token', token).status(200).send(_.pick(user, ['name', 'email', '_id']))
    } catch (e) {

        return res.status(400).send(e.message)
    }
}


export async function getUser(req: Request, res: Response) {
    const userId = (req as any).user._id;
    const user = await User.findById(userId).select('-password'); // return the user excluding the password
    res.status(200).send(user)
}




function createNewUser(user) {
    return new User(_.pick(user, ['name', 'email', 'password']))
}