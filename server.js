const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose
  .connect(`mongodb://root:mongo@127.0.0.1:27017/natours`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});

// UNHANDLED PROMIS REJECTION
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, Shutting down......");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception, Shutting down.......");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
