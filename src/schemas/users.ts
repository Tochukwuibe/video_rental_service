import * as Joi from 'joi';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        maxlength: 255,
    },
    password: {
        type: String, 
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean
});

// adding methods to the user object
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

export const User = mongoose.model('User', userSchema)

export function validate(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(6).max(255)
    }

    const {error} = Joi.validate(user, schema);
    if(error) {throw new Error(error.details[0].message)};
}

