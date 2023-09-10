const fs = require('fs');
const os = require('os');
const { performance } = require('perf_hooks');

// Set the UV_THREADPOOL_SIZE to the number of CPUs available on the machine
process.env.UV_THREADPOOL_SIZE = os.cpus().length;

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

const run = async () => {
  const start = performance.now();

  // Reading two files concurrently
  const [data1, data2] = await Promise.all([
    readFile('./storage/cryptocurrencies.csv'),
    readFile('./storage/stocks.csv'),
  ]);

  const end = performance.now();

  console.log(`cryptocurrencies.csv =>`);
  console.log(data1);
  console.log(`stocks.csv =>`);
  console.log(data2);
  console.log(`Time taken: ${end - start} milliseconds`);
};

run().catch(console.error);
