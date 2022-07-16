//const mongoose = require('mongoose');
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productInfo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
});

//module.exports = mongoose.model("Product", ProductSchema);

export default mongoose.model("Product", ProductSchema);