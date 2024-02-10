// netlify/functions/parse-csv.js

const csv = require('csv-parser');
const fs = require('fs');

exports.handler = async (event) => {
    try {
        // Assuming you receive the CSV data as a base64-encoded string
        const base64Data = event.body;
        const csvData = Buffer.from(base64Data, 'base64').toString('utf-8');

        const parsedRows = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvData)
                .pipe(csv())
                .on('data', (row) => {
                    // Process each row as needed
                    parsedRows.push(row);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        // Do something with the parsedRows (e.g., save to database, transform, etc.)
        console.log(parsedRows);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'CSV data parsed successfully' }),
        };
    } catch (error) {
        console.error('Error parsing CSV data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error parsing CSV data' }),
        };
    }
};
