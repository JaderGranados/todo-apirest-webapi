import { request, Router } from "express";
import { StatusCode } from "../common/status-codes.enum";
import { BaseRouterConfig } from "./base.routes";
import passportMiddleware from "../middlewares/passport-jwt.middleware";
import { ServerResponse } from "../interfaces/server-response.interface";
import { ToDo } from "../interfaces/todo.interface";
import { ToDoService } from "../services/todo.service";
import { ServerError } from "../exceptions/server-error.exception";

export class ToDoRouterCongif extends BaseRouterConfig {
  private readonly _todoServices = new ToDoService();
  constructor(pathBase: string) {
    super("ToDo", pathBase);
  }

  configureRoutes(): Router {
    const router = Router();
    router.use(passportMiddleware.authenticate);
    router
      .route("")
      .get(async (request, response) => {
        const result: ServerResponse<ToDo> = {
          success: true,
        };
        try {
          result.data = await this._todoServices.getAll();
          response.status(StatusCode.OK);
        } catch (e) {
          response.status(StatusCode.SERVERERROR);
          result.errorMessage = e.message;
        }
        response.send(result);
      })
      .post(async (request, response) => {
        const result: ServerResponse<string> = {
          success: true,
        };
        try {
          const todo = request.body as ToDo;
          await this._todoServices.create(todo);
          result.data = "Todo created succesfully";
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

      router.route('/:id')
      .get(async (request, response) => {
        const result: ServerResponse<ToDo> = {
          success: true,
        };
        try {
          const id: string = request.params.id;
          result.data = await this._todoServices.getById(id);
          response.status(StatusCode.OK);
        } catch (e) {
          response.status(StatusCode.SERVERERROR);
          result.errorMessage = e.message;
        }
        response.send(result);
      })
      .put(async (request, response) => {
        const result: ServerResponse<string> = {
          success: true,
        };
        try {
          const todo: ToDo = request.body;
          const id: string = request.params.id;

          await this._todoServices.update(id, todo);
          result.data = "Todo updated successfully";
          response.status(StatusCode.OK);
        } catch (e) {
          response.status(StatusCode.SERVERERROR);
          result.errorMessage = e.message;
        }
        response.send(result);
      })
      .delete(async (request, response) => {
        const result: ServerResponse<string> = {
          success: true,
        };
        try {
          const id: string = request.params.id;

          await this._todoServices.delete(id);
          result.data = "Todo deleted successfully";
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
