var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/RoomeaseTest",
  { useCreateIndex: true, useNewUrlParser: true },
  function() {
    /* dummy function */
  }
);

