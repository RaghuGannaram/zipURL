const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const connectToDataBase = require("./middlewares/database.middleware");
const morganMiddleware = require("./middlewares/morgan.middleware");
const customErrorHandler = require("./middlewares/custom-error-handler.middleware");
const hashRouter = require("./routes/hash.route");

const app = express();

// app.use(cors({
// 	origin: ["http://127.0.0.1:5173"],
// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// 	credentials: true,
// 	optionsSuccessStatus: 204,
// }));

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectToDataBase);

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
