import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  // null or undefined
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 8080)),
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
    port: parseInt(required("DB_PORT"), 3306),
    charset: required("DB_CHARSET"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  rateLimit: {
    windowMs: required("RATE_LIMIT_WINDOWMS"),
    maxRequest: required("RATE_LIMIT_MAX_REQUEST"),
  },
};
