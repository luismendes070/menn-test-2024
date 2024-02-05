// models/City.js

const CitySchema = new mongoose.Schema({
    name: String,
    state: String,
    articles: Array,
    faqs: Array,
    reviews: Array,
    videos: Array,
    attorneys: Array
  });
  
  module.exports = mongoose.model('Cities', CitySchema);