import('./app.js').then((module) => {
  module.default.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
