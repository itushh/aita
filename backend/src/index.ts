import express from "express";
import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/auth.route.js";
import { analyzeRouter } from "./routes/analyze.route.js";
import { savedAnalysisRouter } from "./routes/savedAnalysis.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server running",
    health: "good",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/analyze", analyzeRouter);
app.use("/api/saved-analysis", savedAnalysisRouter);


app.listen(PORT, async () => {
  await connectDB();
  console.log(`running on port ${PORT}`);
});
