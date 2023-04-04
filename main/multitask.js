const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Request:', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

// The FS module reaches out to the hard drive to fetch metadata about a file.
// The thread to which this task is/was assigned is now free to do other things.
// Such as doHash with the crypto module.
fs.readFile('multitask.js', 'utf8', (err, data) => {
  console.log('FS:', Date.now() - start);
  // console.log(data);
});

// These are all async, so they will all run at the same time
// They take a (relatively) long time to run.
// It waits for the first thing to finish, then moves on to the next thing.
// Whichever thing finishes first will be the one that is logged first.
doHash();
doHash();
doHash();
doHash();

//Result: (Depends on threadpool size)
// Hash: 603
// FS: 607
// Hash: 610
// Hash: 617
// Hash: 623
// Request: 636
