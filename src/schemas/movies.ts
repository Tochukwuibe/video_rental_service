import * as mongoose from 'mongoose';
import * as Joi from 'joi';
import { genreSchema } from './genres.schema';
const mongoJoi = require ('joi-objectid');

const JoiobjectId = mongoJoi(Joi)

export const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        maxlength: 50, 
        minlength: 2,
        trim: true
    },
    genre:{
        type: genreSchema, 
        required: true
    },
    numberInStock: {
        type: Number, 
        required: true,
        min: 0, 
        max: 255
    }, 
    dailyRentalRate: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 255
    }
});

export const Movie = mongoose.model('Movie', movieSchema);

export function validate(movie) {
    const schema = {
        title: Joi.string().required().max(50).min(2), 
        genreId: JoiobjectId().required().max(50).min(2),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    }

    const {error} = Joi.validate(movie, schema);
   if(error) {throw new Error(error.details[0].message)}
}