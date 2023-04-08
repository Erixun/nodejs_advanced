// import cluster from 'cluster';
import express from 'express';
const { Worker } = require('worker_threads');

const app = express();

app.get('/', (req, res) => {
  const worker = new Worker('./worker.js');
  worker.on('message', (message) => {
    res.send('', message);
  });

  worker.postMessage('start!');
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

export default app;
