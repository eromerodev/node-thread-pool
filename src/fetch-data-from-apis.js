const express = require('express');
const axios = require('axios');
const os = require('os');
const { performance } = require('perf_hooks');

// Set UV_THREADPOOL_SIZE to the number of CPUs
process.env.UV_THREADPOOL_SIZE = os.cpus().length;

const app = express();
const port = 3000;
const weatherApiKey = '0878164f32934383663ef664adb391ab'

const fetchWeather = async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
  return response.data;
};

const fetchTodo = async (id) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.data;
};

const fetchJoke = async () => {
  const response = await axios.get(`https://official-joke-api.appspot.com/random_joke`);
  return response.data;
};

app.get('/api/data', async (req, res) => {
  const start = performance.now();

  try {
    const [weather, todo, joke] = await Promise.all([
      fetchWeather('Santiago'),
      fetchTodo(1),
      fetchJoke()
    ]);

    const end = performance.now();

    res.json({
      weather,
      todo,
      joke,
      timeTaken: `${end - start} milliseconds`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
