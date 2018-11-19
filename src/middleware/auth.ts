import { Response, Request, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export function auth(req, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Acess denied. No token provided');

    try {

        const payload =  jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        return next();

    } catch (e) {

        return res.status(400).send('Invalid token')
    }
  

}