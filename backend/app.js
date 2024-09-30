const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // load environment variable in .env file through dotenv
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})