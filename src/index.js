require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./api/app");

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.DB_CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

mongoose.connection.on("error", (error) => {
  console.log(error);
});

app.listen(PORT, () => {
  console.log("Listening on PORT 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to College Academics Manager Backend!");
});
