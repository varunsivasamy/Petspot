require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/product');
const paymentRoute = require('./routes/payment');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.use('/api/products', productsRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
