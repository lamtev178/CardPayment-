const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')
const CardSchema = new Schema({
  CardNumber : Number,
  ExpirationDate : String,
  CVV : Number,
  Amount : Number
})
const card = mongoose.model('Card', CardSchema)

module.exports = card