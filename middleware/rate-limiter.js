import rateLimit from "express-rate-limit";
import { config } from "../config.js";

export default rateLimit({
  // 1분
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequest, // IP별로 100번 요청 가능
});
