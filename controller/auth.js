import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as authRepository from "../data/auth.js";
import { config } from "../config.js";

export async function signUp(req, res) {
  const {
    username,
    password,
    nickname,
    url,
    wakeUpTime,
    bedTime,
    limitCups,
    limitTime,
    wakeUpReminder,
    bedTimeReminder,
    limitReminder,
  } = req.body;

  // 데이터베이스에 있는지 확인
  const found = await authRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  // 패스워드를 해싱한다.
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // 회원 정보를 넘기고 서버에서 받은 고유의 아이디
  const userId = await authRepository.createUser({
    username,
    password: hashed,
    nickname,
    url,
    wakeUpTime,
    bedTime,
    limitCups,
    limitTime,
    wakeUpReminder,
    bedTimeReminder,
    limitReminder,
  });
  // 받은 유저 ID로 토큰을 만든다.
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username });
}

export async function logIn(req, res) {
  const { username, password } = req.body;

  // 유저 아이디가 있는지 확인 - 보안 메세지는 어떤 것이 틀린 것인지 알려줄 필요 없음
  const user = await authRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  // password가 맞는지 확인 - 보안 메세지는 어떤 것이 틀린 것인지 알려줄 필요 없음
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  // 토큰을 생성해서 보내준다.
  const token = createJwtToken(user.userId);
  res.status(200).json({ token, username });
}

export async function getMe(req, res) {
  const user = await authRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // 토큰와 유저 데이터를 또 보내준다.
  res.status(200).json({ token: req.token, username: user.username });
}

// 공통 함수
// 토큰을 생성
function createJwtToken(userId) {
  return jwt.sign({ userId }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
