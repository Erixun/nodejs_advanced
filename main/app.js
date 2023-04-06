// import cluster from 'cluster';
import express from 'express';
import crypto from 'crypto';

// console.log(cluster.isPrimary); //.isMaster);
// //Is the file being executed in primary mode?
// if (cluster.isPrimary) {
//   // Fork workers.
//   // Forking is the process of creating a new process that is an exact copy of the current process.
//   // The new process is called a child process, and the current process is called the parent process.
//   cluster.fork();
// }
// I'm a child, I'm going to act like a server and do nothing else

const app = express();

// function doWork(duration) {
//   const start = Date.now();
//   while (Date.now() - start < duration) {}
// }

app.get('/', (req, res) => {
  // Simulate a long running process
  // Will block the event loop
  // doWork(5000);
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    // console.log('1:', Date.now() - start);
    res.send('Hello World!');
  });
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});

export default app;
