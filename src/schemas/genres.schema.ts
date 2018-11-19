import * as  mongoose from 'mongoose';
import * as Joi from 'joi';

export const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export const Genre =  mongoose.model('Genre', genreSchema)


export function validate(genre: any) {
    const schema = {
        name: Joi.string().min(5).required()
    }
    const { error } = Joi.validate(genre, schema);
    return error;
}