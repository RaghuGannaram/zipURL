const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const dbMiddleware = require("./middlewares/database.middleware");
const morganMiddleware = require("./middlewares/morgan.middleware");
const customErrorHandler = require("./middlewares/custom-error-handler.middleware");
const hashRouter = require("./routes/hash.route");

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbMiddleware);

app.get("/health-check", (req, res) => {
	res.status(200).json({ message: "OK" });
});
app.use("/app", express.static("./public"));
app.use("/", hashRouter);

app.use((req, res) => {
	res.redirect("/app");
});

app.use(customErrorHandler);

module.exports = app;