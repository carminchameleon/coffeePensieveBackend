import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";
import { config } from "../config.js";
const AUTH_ERROR = { message: "Authentication Error" };

// 모든 요청에 대해서 헤더에 authorization이 있는지 확인
// 우리가 가지고 있는 데이터와 맞는지 확인
// 사용자가 우리 데이터에 존재하는지 한번 더 확인 해준다.
export const isAuth = async (req, res, next) => {
  // 헤더 키의 벨류
  const authHeader = req.get("Authorization");
  // 존재하지 않거나, 우리가 지정한 것 처럼 Bearer로 시작하지 않는 경우 -> 우리가 검증할 수 없음
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(404).json(AUTH_ERROR);
  }

  // 토큰 부분
  const token = authHeader.split(" ")[1];
  //  토큰이 유효한지에 대해서 검사

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    //사용자를 데이터베이스에서 찾기

    const user = await authRepository.findById(decoded.userId);

    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    // req 자체에 유저 아이디를 추가해준다.
    // req.custom 다른 콜백 함수에서 동일하게 계속 접근 하므로 아예 등록해주는 것
    req.userId = user.userId;
    req.token = token;
    next();
  });
};
