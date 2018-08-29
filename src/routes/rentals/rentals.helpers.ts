import { Movie } from './../../schemas/movies';
import { Customer } from './../../schemas/customers';
import { Request, Response } from 'express';
import { Rental, validate } from '../../schemas/rentals';
import * as Fawn from 'fawn';
import * as mongoose from 'mongoose';


Fawn.init(mongoose);

export async function getRentals(req: Request, res: Response) {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).send(rentals);
}

export async function addRental(req: Request, res: Response) {

    try {
        // validat the rental 
        let rental = req.body;
        validate(rental)

        // find the customer and movie
        const customer = await getCustomer(rental.customerId);
        const movie = await getMovie(rental.movieId);

        console.log('the customer ', customer);
        console.log('the movie ', movie)

        // create and save the rental
        rental = await createRental(customer, movie);

        console.log('the rental ', rental)

        const batch = new Fawn.Task();

        batch.save('rentals', rental);
        batch.update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })

        try{

            batch.run();

        } catch (e) {

          return  res.status(500).send('Somthing went wrong')
        }
        

       return res.status(201).send(rental)

    } catch (e) {

       return res.status(400).send(e.message)
    }
}


async function getCustomer(id: string) {

    const customer = await Customer.findById(id);
    if (!customer) { throw new Error('Customer not found') };

    return customer;
}


async function getMovie(id: string) {

    const movie = await Movie.findById(id) as any;
    if (!movie) { throw new Error('Movie not found') };
    if (!movie.numberInStock) { throw new Error('Movie not in Stock') };

    return movie;
}
async function createRental(customer, movie) {
    return new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },

    })
}