import path from "path";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth-route.js";
import personInfoRouter from "./routes/person-info-route.js";
import medicalInfoRouter from "./routes/medical-info-route.js";
import adminInfoRouter from "./routes/admin-info-route.js";
import accountRouter from "./routes/account-router.js";
import unitRouter from "./routes/unit-router.js"

const __dirname = path.resolve();

const app = express();

//dotenv config
dotenv.config();

// set cors
app.options("*", cors());
app.use(cors());

// handle req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static file

app.use("/auth", authRouter);
app.use("/personinfo", personInfoRouter);
app.use("/medicalinfo", medicalInfoRouter);
app.use("/admininfo", adminInfoRouter);
app.use("/account", accountRouter);
app.use("/unit", unitRouter);

// for test purpose only
app.get("/", (req, res, next) => {
	res.json({ message: "Wellcome to server" });
});

// error handlers
app.use((errors, req, res, next) => {
	console.log(errors);
	const { statusCode, message } = errors;
	if (!statusCode) {
		statusCode = 500;
	}
	const data = errors.data;
	res.status(statusCode).json({ message, data });
});

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		const PORT = process.env.PORT || 4000;
		app.listen(PORT, () => {
			console.log("App listening");
		});
	})
	.catch((err) => console.log(err));
