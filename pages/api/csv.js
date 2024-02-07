// pages/api/csv.js
import formidable from "formidable";
import { pipeline } from "stream";
import parse from "csv-parse";
import stringify from "csv-stringify";

export const config = {
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
