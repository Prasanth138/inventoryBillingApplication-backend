import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productRoutes from "./routes/products.js";
import checkoutApi from "./routes/checkout-api.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LL7u6SFApoQBYjoeQWWIgLmLJ8bGVJE9nrpqfc4VwwceSsolBKUdEweko72Zav1kch2QKtqcQVgOBzzq8SgG33S0062qVCJbV');
import { v4 as uuidv4 } from 'uuid';

var router = express.Router();
const app = express()
dotenv.config()


//Body parser
app.use(express.json());
//Cookie-Parser
app.use(cookieParser());
//CORS
app.use(cors())

// routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("It works...");
});
app.post('/payment', (req, res) => {
  const {product, token} = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  const idempotencyKey = uuid();

  return stripe.customers.create({
      email: token.email,
      source: token.id
  }).then(customer => {
      stripe.charges.create({
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_emal: token.email,
          description: `Purchase Of ${product.name}`,
          shipping: {
              name: token.card.name,
              address: {
                  country: token.card.address_country
              }
          }
      }, {idempotencyKey});
  }).then(result => res.status(200).json(result)).catch(err => console.log(err));

});



//port
const PORT=process.env.PORT || 5000;
//Router
app.use('/',router)



const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

  app.listen(PORT, ()=>{
    connect();
    console.log(`Server is running on ${PORT}`)
})