const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
