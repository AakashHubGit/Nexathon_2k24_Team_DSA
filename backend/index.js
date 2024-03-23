const express = require("express");
var app = express();
var cors = require('cors');

app.use(cors);



app.listen(5000, function () {
  console.log("Started application on port %d", 3000);
});
