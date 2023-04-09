import { parentPort } from 'worker_threads';

//Listen for messages from the main thread
parentPort.on('message', (message) => {
  //Once a message is received, start "doing work"
  let counter = 0;
  while (counter < 1e9) {
    counter++;
  }
  //Once the work is done, send the result back to the main thread
  parentPort.postMessage(counter);
});
