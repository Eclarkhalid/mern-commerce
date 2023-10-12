const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const stripe = require('stripe')(config.get('StripeAPIKey'));

module.exports.get_orders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { source } = req.body;

    // Retrieve cart and user
    const cart = await Cart.findOne({ userId });
    const user = await User.findOne({ _id: userId });
    const email = user.email;

    if (cart) {
      // Create a charge using Stripe
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: 'USD',
        source: source,
        receipt_email: email,
      });

      if (!charge) {
        throw Error('Payment failed');
      }

      // If charge is successful, create an order and delete the cart
      const order = await Order.create({
        userId,
        items: cart.items,
        bill: cart.bill,
      });

      const data = await Cart.findByIdAndDelete({ _id: cart.id });

      return res.status(201).send(order);
    } else {
      res.status(400).send('You do not have items in the cart');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
