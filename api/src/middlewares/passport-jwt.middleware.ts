import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";
import { User } from "../interfaces/user.interface";
import { UserServices } from "../services/user.services";
import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../interfaces/server-response.interface";
import { StatusCode } from "../common/status-codes.enum";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const service = new UserServices();
const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const strategy = new Strategy(strategyOptions, async (payload, done) => {
  {
    try {
      const user: string = payload.username;
      if (await service.userExist(user)) {
        if (await service.isLogedIn(user)){
          return done(null, true);
        }
      }
      throw new Error("Unauthorized");
    } catch (e) {
      done(null, false);
    }
  }
});
passport.use(strategy);

export default {
  initialize: passport.initialize(),
  authenticate: function (req: Request, res: Response, next: NextFunction) {
    return passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        const result: ServerResponse<string> = {
          success: false,
          errorMessage: "Unauthorized",
        };
        try{
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!user) {
            return res.status(StatusCode.UNAUTHORIZED).json(result);
          }
          // Forward user information to the next middleware
          req.user = user;
          next();
        }
        catch (err){
          return res.status(StatusCode.BADREQUEST).send(result);
        }
      }
    )(req, res, next);
  },
};
