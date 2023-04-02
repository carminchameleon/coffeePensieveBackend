import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import drinksRouter from "./router/drinks.js";
import moodsRouter from "./router/moods.js";
import tagsRouter from "./router/tags.js";
import usersRouter from "./router/users.js";
import recordsRouter from "./router/records.js";
import commitsRouter from "./router/commits.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { db } from "./db/database.js";
import rateLimit from "./middleware/rate-limiter.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors(corsOption));
app.use(rateLimit);

app.use("/auth", authRouter);
app.use("/drinks", drinksRouter);
app.use("/moods", moodsRouter);
app.use("/tags", tagsRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/commits", commitsRouter);

// 그 어떤 값도 아닌 url
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 발생하는 그 모든 에러의 마지막 단계
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection();
console.log(`Server is started.....${new Date()}`);
app.listen(config.port);
