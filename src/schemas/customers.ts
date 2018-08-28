import * as  mongoose from 'mongoose';
import * as Joi from 'joi';

export const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
      
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
    date: {
        type: Date,
        default: Date.now()
    }
})

export const Customer =  mongoose.model('Customers', customerSchema)

export function validate(customer: any) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().required().min(10).max(10)
    }
    const { error } = Joi.validate(customer, schema);
    return error;
}