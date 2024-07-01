const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['NSW', 'VIC', 'WA', 'SA', 'TAS'],
    },
    title: {
      type: String,
      required: true,
      min: 8,
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'duplex', 'townhouse'],
    },
    desc: {
      type: String,
      required: true,
      min: 20,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);