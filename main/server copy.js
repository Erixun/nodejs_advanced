// import app from './app.js';
import cluster from 'cluster';
import os from 'os';
// if (cluster.isPrimary) {
// }

console.log(cluster.isPrimary); //.isMaster);
//Is the file being executed in primary mode?
if (cluster.isPrimary) {
  // Fork workers.
  // Forking is the process of creating a new process that is an exact copy of the current process.
  // The new process is called a child process, and the current process is called the parent process.
  // Every child has its own thread pool, so we can use all the cores of the machine
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  os.cpus().forEach(() => cluster.fork());
  // I have 12 cores, so I can fork 12 times!?!
} else {
  // I'm a child, I'm going to act like a server and do nothing else
  import('./app.js').then((module) => {
    module.default.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  });
}
