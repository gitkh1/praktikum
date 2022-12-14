/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('*', (_, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
