import { Request, Response } from 'express';
import {  User } from '../../schemas/users';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';





export async function login(req: Request, res: Response) {
    try {

        validate(req);
        const user = await User.findOne({email: req.body.email}) as any;
        if(!user)  throw new Error('Email is invalid');

        console.log('the passwords ', req.body.password, user.password);
        const matches = await bcrypt.compare(req.body.password, user.password);
        console.log('the matches result ', matches);

        if(!matches) throw new Error('Password is invalid')

        const token = user.generateAuthToken();

        return res.status(200).send(token);

    } catch(e) {

        return res.status(400).send(e.message);
    }
}




function validate(req: Request) {
    const schema = {
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    }

    const {error } = Joi.validate(req.body, schema);

    if(error) {throw new Error(error.details[0].message)}
}