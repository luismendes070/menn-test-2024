// models/City.js

import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    _id: String,
    city: String,
    state_id: String,
    state_name: String,
  });
  
  module.exports = mongoose.model('Cities', CitySchema);