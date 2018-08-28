import { Customer, validate } from './../../schemas/customers';
import { Request, Response } from 'express';


export async function getCustomers(req: Request, res: Response) {
   const customers = await Customer.find().sort('name');

   res.status(200).send(customers)
}   


export async function getCustomer(req: Request, res: Response) {
    try {

        const customer = await Customer.findById(req.params.id)
        return res.status(200).send(customer);

    } catch (e) {

        return res.status(404).send('No user found')
    } 
}


export async function addCustomer(req: Request, res: Response) {
    try {
        const err = validate(req.body);
        if(err) {throw new Error(err.message)}

        const customer = await Customer.create({
            name: req.body.name, 
            isGold: req.body. isGold, 
            phone: req.body.phone
        })

        await customer.save();

        return res.status(201).send(customer);

    } catch (e) {

      return  res.status(400).send(e.message)
    }
}


export async function updateCustomer(req: Request, res: Response) {
    try {
        const err = validate(req.body);
        if(err) {throw new Error(err.message)}

        const customer = Customer.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.status(201).send(customer);

    } catch (e) {

      return  res.status(400).send(e)
    }
}


export async function deleteCustomer(req: Request, res: Response) {
    try {

        const customer = await Customer.findOneAndRemove(req.params.id)

        return res.status(200).send(customer)
    } catch (e) {
        return res.status(400).send(e)
    }
}




