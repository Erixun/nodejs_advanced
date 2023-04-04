import express from 'express';
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  // Simulate a long running process
  // Will block the event loop
  doWork(5000);
  res.send('Hello World!');
});

export default app;
