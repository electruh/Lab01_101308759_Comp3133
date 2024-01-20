const fs = require('fs');
const csv = require('csv-parser');

const deleteIfExists = (filename) => {
    try {
        fs.unlinkSync(filename);
        console.log(`${filename} deleted.`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
};

deleteIfExists('canada.txt');
deleteIfExists('usa.txt');

// Read the CSV file and filter data
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            fs.appendFileSync('canada.txt', `${row.country},${row.year},${row.population}\n`);
        } else if (row.country === 'United States') {
            fs.appendFileSync('usa.txt', `${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('Processing complete. Check canada.txt and usa.txt for results.');
    });
