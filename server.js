import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Routes from "./api/routes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", Routes);

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && "body" in err) {
		return res.status(400).json({
			message:
				"Invalid JSON in request body. Check for trailing commas or extra characters.",
		});
	}
	next(err);
});

try {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
} catch (err) {
	console.error("Error starting server:", err);
}
