const express = require('express');
const app = express();
const port = 3000;
const request = require('request');

app.get("/", (req, res) => {
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});