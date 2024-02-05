// server.js

import mongoose from "mongoose";

const express = require("express");
const app = express();
// const mongoose:any = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const fs = require("fs");
const csv = require("csv-parser");

// Define your City model as usual
const City = mongoose.model("City", require("./app/models/City.tsx"));

fs.createReadStream("uscities-data.csv")
  .pipe(csv())
  .on("data", (row: any) => {
    // Create a new city instance for each row in the CSV
    const city = new City(row);
    try {
      // Save it to the database
      city.save();
    } catch (error: any) {
      console.error("outer", error.message);
    } finally {
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.use(cors());
app.use(bodyParser.json());

// Import Routes
const cityRoute = require("./routes/cities");
app.use("/state/city", cityRoute);

// Copilot
try {
  mongoose.connect(
    process.env.MONGODB_URI as string
  ).then(() => console.log("connected to DB!")); // use then method instead of callback
} catch (error:any) {
  console.log(error.message);
}


app.listen(3000);
