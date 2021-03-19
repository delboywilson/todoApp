const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);

// routes
const indexRouter = require("./routes/index");
const notFoundRouter = require("./routes/notFound");

app.use("/", indexRouter);

app.use("*", notFoundRouter);

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`);
});
