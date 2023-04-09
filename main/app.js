// import cluster from 'cluster';
import express from 'express';
import { Worker } from 'worker_threads';
// const { Worker } = require('worker_threads');

const app = express();

app.get('/', (req, res) => {
  //Create a new worker thread for each request
  const worker = new Worker('./worker.js');
  //Start the worker by posting a message to it
  worker.postMessage('start!');

  //When the worker is done, send the result to the client
  worker.on('message', (message) => {
    res.send(`The CPU can count to ${message}!!`);
  });
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

export default app;
