const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  maker: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'address is empty'],
  },
  offerType: {
    type: String,
    enum: ['buy', 'sell'],
    required: [true, 'offerType is empty'],
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  payMethods: {
    type: [
      {
        type: {
          bank: {
            type: mongoose.Schema.ObjectId,
            ref: 'Bank',
            required: [true, 'Bank is empty'],
          },
          cardNumber: {
            type: String,
            minLenght: 4,
            required: [true, 'card Number is empty'],
          },
          region: {
            type: mongoose.Schema.ObjectId,
            ref: 'Region',
            required: [true, 'activeRegion is empty'],
          },
          paymentDescription: {
            type: String,
            maxLenght: 600,
          },
        },
        required: true,
      },
    ],
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  fiat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Fiat',
    required: [true, 'Fiat is empty'],
  },
  unitPrice: {
    type: Number,
    min: [1, 'unitPrice very small'],
    required: [true, 'unitPrice is empty'],
  },
  totalAmount: {
    type: Number,
    min: [0, 'totalAmount very small'],
    required: [true, 'total Amount is empty'],
  },
  pendingAmount: {
    type: Number,
    min: [0, 'pendingAmount very small'],
    default: 0,
    required: [true, 'pendingAmount is empty'],
  },
  amount: {
    type: Number,
    min: [0, 'amount very small'],
    required: [true, 'factual Amount is empty'],
  },
  totalQuantity: {
    type: Number,
    min: [0, 'quantity very small'],
    required: [true, 'quantity is empty'],
  },
  pendingQuantity: {
    type: Number,
    min: [0, 'pendingQuantity very small'],
    default: 0,
    required: [true, 'pendingQuantity is empty'],
  },
  quantity: {
    type: Number,
    min: [0, 'quantity very small'],
    required: [true, 'quantity is empty'],
  },
  minLimit: {
    type: Number,
    required: [true, 'minLimit is empty'],
  },
  maxLimit: {
    type: Number,
    required: [true, 'minLimit is empty'],
  },
  crypto: {
    type: mongoose.Schema.ObjectId,
    ref: 'Crypto',
    required: [true, 'Crypto is empty'],
  },
  offerComment: {
    type: String,
    maxLenght: 600,
  },
  takerNumber: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
