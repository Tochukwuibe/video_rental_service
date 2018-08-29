
import * as Joi from 'joi';
import * as mongoose from 'mongoose';
const mongoJoi = require ('joi-objectid');

const JoiobjectId = mongoJoi(Joi)


// thumbnail schema for the customer
const thumbCustomerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50
    },
    phone:  {
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 10
    },
    isGold: {
        type: Boolean, 
        require: true
    },
    
});

const thumbMovieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        maxlength: 50, 
        minlength: 2,
        trim: true
    },
    dailyRentalRate: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 255
    },
    dateOut: {
        type: Date, 
        required: true, 
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number, 
        min: 0
    }
})



const rentalSchema = new mongoose.Schema({
    customer: {
        type: thumbCustomerSchema
    }, 
    movie: {
        type: thumbMovieSchema 
    }
})

export const Rental = mongoose.model('Rental', rentalSchema);

export function validate(rental){
    const schema = {
        customerId: JoiobjectId().required(),
        movieId: JoiobjectId().required()
    }
    const {error } = Joi.validate(rental, schema);

   
    if(error) {throw new Error(error.details[0].message)}
    // if(!mongoose.Types.ObjectId.isValid(rental.customerId)) {throw new Error ('Invalid customer')}
    // if(!mongoose.Types.ObjectId.isValid(rental.movieId)) {throw new Error ('Invalid movie')}
}