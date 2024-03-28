// pages/api/csv.js
import formidable from "formidable";
import { pipeline } from "stream";
import parse from "csv-parse";
import stringify from "csv-stringify";

// ChatGPT rate limit fix
// Import express-rate-limit package
var RateLimit = require('express-rate-limit');

// Define rate limiting middleware with specified parameters
var limiter = new RateLimit({
  windowMs: parseInt(config.RATE_LIMITING_WINDOW_MILLISECONDS),
  max: parseInt(config.RATE_LIMITING_REQUEST_LIMIT),
  delayMs: 0, // Disable delaying - full speed until the max limit is reached
  skip: function (req) {
    return req.url.startsWith('/public'); // Skip rate limiting for public assets
  }
});

// Apply rate limiting middleware to all requests
app.use(limiter);


export const config = {
    // Define various configuration settings here
    RATE_LIMITING_ENABLED: 'true', // Indicates whether rate limiting is enabled
    RATE_LIMITING_WINDOW_MILLISECONDS: 60000, // Time window for rate limiting in milliseconds (e.g., 1 minute)
    RATE_LIMITING_REQUEST_LIMIT: 100, // Maximum number of requests allowed within the window
    BASIC_AUTH_ENABLED: 'true', // Indicates whether basic authentication is enabled
    BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME, // Username for basic authentication
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD, // Password for basic authentication
    // Other configuration settings...
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Parse the incoming file stream
  const { fields, files } = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  // Get the CSV file from the files object
  const csvFile = files.csv;

  // Create a read stream from the file path
  const readStream = fs.createReadStream(csvFile.path);

  // Create a parse stream to read CSV data
  const parseStream = parse({ columns: true });

  // Create a transform stream to perform your processing logic
  // For example, this stream adds a new column with a random number
  const transformStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      chunk.random = Math.floor(Math.random() * 100);
      this.push(chunk);
      callback();
    },
  });

  // Create a stringify stream to write CSV data
  const stringifyStream = stringify({ header: true });

  // Set the response headers for the CSV file
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=modified.csv`);

  // Pipe the streams together and send the response
  await pipeline(readStream, parseStream, transformStream, stringifyStream, res);
}
