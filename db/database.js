import { config } from "../config.js";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: config.db.host,
  // 어디에 접속
  user: config.db.user,
  // 유저
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

export const db = pool.promise();
