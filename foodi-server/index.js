const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 3000;
const verifyToken = require('./api/middlewares/verifyToken')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(cors());
app.use(express.json());

// Mongodb configuration using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.agpfhfm.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
    .then(console.log(`MonogDB connected successfully`)).catch((error) => { console.log(`Error connecting to Database`, error) });

// jwt authentication
app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })

// import routes here
const menuRoutes = require('./api/routes/menuRoutes');
app.use('/menu', menuRoutes);
const cartRoutes = require('./api/routes/cartRoutes'); 
app.use('/carts', cartRoutes);
const userRoutes = require('./api/routes/userRoutes.');
app.use('/users', userRoutes);
const paymentRoutes = require('./api/routes/paymentsRoutes');
app.use('/payments', paymentRoutes);

// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "aud",

    "payment_method_types": ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
    
app.get('/', (req, res) => {
    res.send('Server');
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})