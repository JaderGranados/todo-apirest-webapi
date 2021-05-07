import { request, Router } from "express";
import { User } from "../interfaces/user.interface";
import { StatusCode } from "../common/status-codes.enum";
import { BaseRouterConfig } from "./base.routes";
import { UserServices } from "../services/user.services";
import { ServerResponse } from "../interfaces/server-response.interface";
import { ServerError } from "../exceptions/server-error.exception";
import passportMiddleware from "../middlewares/passport-jwt.middleware";

export class AuthenticateRouterCongif extends BaseRouterConfig {
  private readonly _userService: UserServices;
  constructor(pathBase: string) {
    super("Authenticate", pathBase);
    this._userService = new UserServices();
  }

  configureRoutes(): Router {
    const router = Router();

    router.post("/sigin", async (request, response) => {
      const result: ServerResponse<User> = {
        success: true,
      };
      try {
        const user = request.body as User;
        result.data = await this._userService.login(user);
        response.status(StatusCode.OK);
      } catch (e) {
        if (e instanceof ServerError) {
          response.status(e.statusCode);
        } else {
          response.status(500);
        }
        result.success = false;
        result.errorMessage = e.message;
      }

      response.send(result);
    });

    router.post("/register", async (request, response) => {
      const result: ServerResponse<string> = {
        success: true,
      };
      try {
        const user = request.body as User;
        await this._userService.create(user);
        result.data = "User created succesfully";
        response.status(StatusCode.CREATED);
      } catch (e) {
        if (e instanceof ServerError) {
          response.status(e.statusCode);
        } else {
          response.status(500);
        }
        result.success = false;
        result.errorMessage = e.message;
      }

      response.send(result);
    });

    router.get(
      "",
      passportMiddleware.authenticate,
      async (request, response) => {
        const result: ServerResponse<User> = {
          success: true,
        };
        try {
          result.data = await this._userService.getAll();
          response.status(StatusCode.OK);
        } catch (e) {
          response.status(StatusCode.SERVERERROR);
          result.errorMessage = e.message;
        }
        response.send(result);
      }
    );

    router.get(
      "/isLoged/:username",
      passportMiddleware.authenticate,
      async (request, response) => {
        const result: ServerResponse<User> = {
          success: true,
        };
        try {
          const user = request.params.username;

          if (!(await this._userService.isLogedIn(user))) {
            throw new ServerError(StatusCode.UNAUTHORIZED, "Isn't loged");
          } else {
            response.status(StatusCode.OK);
          }
        } catch (e) {
          if (e instanceof ServerError) {
            response.status(e.statusCode);
          } else {
            response.status(500);
          }
          result.success = false;
          result.errorMessage = e.message;
        }
        response.send(result);
      }
    );

    router.get("/singout/:id", async (request, response) => {
      const result: ServerResponse<string> = {
        success: true,
      };
      const id = request.params.id;
      try {
        await this._userService.logOut(id);
        result.data = "Logout successfully";
        response.status(StatusCode.OK);
      } catch (e) {
        response.status(StatusCode.SERVERERROR);
        result.errorMessage = e.message;
      }
      response.send(result);
    });
    return router;
  }
}
