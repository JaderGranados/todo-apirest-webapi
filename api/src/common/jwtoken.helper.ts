import jwt from "jsonwebtoken";
import passport from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

export class JWTHelper {
  static createToken(payload: any): string {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: 3600 });
  }
}
