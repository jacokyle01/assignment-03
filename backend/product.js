const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: {
    type: Long,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: ""
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  category: {
    type: String,
    required: false,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default: ""
  },
  rating: { //TODO store as (rate, count)
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Product', productSchema);