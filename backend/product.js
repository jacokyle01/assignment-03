const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose);


const productSchema = new mongoose.Schema({
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
    required: false,
    default: ""
  },
  rating: { //TODO store as (rate, count)
    type: Number,
    required: true,
    default: 0
  }
})

productSchema.plugin(autoIncrement, { inc_field: 'id' });


module.exports = mongoose.model('Product', productSchema);