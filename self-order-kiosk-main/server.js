require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const data = require('./data');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/self_order_kiosk', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ================= PRODUCTS =================
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
    stock: {
      type: Number,
      default: 10,
    },
  })
);

// Seed products with stock
app.get('/api/products/seed', async (req, res) => {
  await Product.deleteMany({});

  const productsWithStock = data.products.map((product) => ({
    ...product,
    stock: product.stock || 10,
  }));

  const products = await Product.insertMany(productsWithStock);
  res.send({ products });
});

app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

// ================= SERVICES =================
const Service = mongoose.model(
  'services',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
  })
);

app.get('/api/services/seed', async (req, res) => {
  await Service.deleteMany({});

  const services = await Service.insertMany(data.services || []);
  res.send({ services });
});

app.get('/api/services', async (req, res) => {
  const { category } = req.query;
  const services = await Service.find(category ? { category } : {});
  res.send(services);
});

app.post('/api/services', async (req, res) => {
  const newService = new Service(req.body);
  const savedService = await newService.save();
  res.send(savedService);
});

// ================= CATEGORIES =================
app.get('/api/categories', (req, res) => {
  res.send(data.categories);
});

app.get('/api/service-categories', (req, res) => {
  res.send(data.serviceCategories || []);
});

// ================= ORDERS =================
const Order = mongoose.model(
  'Order',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,

      isPaid: { type: Boolean, default: false },

      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },

      itemsPrice: Number,
      taxPrice: Number,
      totalPrice: Number,

      orderItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
          },

          service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'services',
          },

          productId: String,
          serviceId: String,
          _id: String,

          name: String,
          price: Number,
          quantity: Number,
          itemType: String,
        },
      ],
    },
    { timestamps: true }
  )
);

// Get active orders
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});

// ✅ Admin approve / disapprove / deliver order
app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    // ================= APPROVE ORDER =================
    if (req.body.action === 'approve' || req.body.action === 'ready') {
      if (order.isReady) {
        return res.status(400).send({ message: 'Order already approved' });
      }

      if (order.isCanceled) {
        return res.status(400).send({ message: 'Cannot approve canceled order' });
      }

      const isServiceOrder =
        order.orderType === 'Services' ||
        order.orderType === 'Service' ||
        order.orderType === 'services';

      // ✅ Only product orders reduce stock
      if (!isServiceOrder) {
        // Check stock first
        for (const item of order.orderItems) {
          let product = null;

          const possibleId = item.product || item.productId || item._id;

          if (possibleId && mongoose.Types.ObjectId.isValid(possibleId)) {
            product = await Product.findById(possibleId);
          }

          if (!product && item.name) {
            product = await Product.findOne({ name: item.name });
          }

          if (!product) {
            return res.status(404).send({
              message: `Product not found: ${item.name}`,
            });
          }

          if (product.stock < item.quantity) {
            return res.status(400).send({
              message: `Not enough stock for ${product.name}. Available stock: ${product.stock}`,
            });
          }
        }

        // Reduce stock after stock checking
        for (const item of order.orderItems) {
          let product = null;

          const possibleId = item.product || item.productId || item._id;

          if (possibleId && mongoose.Types.ObjectId.isValid(possibleId)) {
            product = await Product.findById(possibleId);
          }

          if (!product && item.name) {
            product = await Product.findOne({ name: item.name });
          }

          await Product.findByIdAndUpdate(product._id, {
            $inc: { stock: -item.quantity },
          });
        }
      }

      order.isReady = true;
      order.inProgress = false;
      await order.save();

      return res.send({
        message: isServiceOrder
          ? 'Service request approved'
          : 'Product order approved and stock reduced',
        order,
      });
    }

    // ================= DISAPPROVE / CANCEL ORDER =================
    if (req.body.action === 'disapprove' || req.body.action === 'cancel') {
      if (order.isReady) {
        return res.status(400).send({
          message: 'Cannot disapprove already approved order',
        });
      }

      order.isCanceled = true;
      order.inProgress = false;
      order.isReady = false;

      await order.save();

      return res.send({
        message: 'Order disapproved/canceled',
        order,
      });
    }

    // ================= DELIVER ORDER =================
    if (req.body.action === 'deliver') {
      order.isDelivered = true;
      await order.save();

      return res.send({
        message: 'Order delivered',
        order,
      });
    }

    return res.status(400).send({ message: 'Invalid action' });
  } catch (error) {
    return res.status(500).send({
      message: 'Server error',
      error: error.message,
    });
  }
});

// Create order from customer kiosk
app.post('/api/orders', async (req, res) => {
  try {
    const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;

    if (
      !req.body.orderType ||
      !req.body.paymentType ||
      !req.body.orderItems ||
      req.body.orderItems.length === 0
    ) {
      return res.send({ message: 'Data is required.' });
    }

    const order = await Order({
      ...req.body,
      number: lastNumber + 1,
      inProgress: true,
      isReady: false,
      isCanceled: false,
      isDelivered: false,
    }).save();

    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: 'Order creation failed',
      error: error.message,
    });
  }
});

// Queue screen
app.get('/api/orders/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    'number orderType'
  );

  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number orderType'
  );

  res.send({ inProgressOrders, servingOrders });
});

// ================= FRONTEND BUILD =================
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});