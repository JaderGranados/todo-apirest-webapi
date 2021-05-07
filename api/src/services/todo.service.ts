import { BaseService } from "../interfaces/base-service.interface";
import { ToDo } from "../interfaces/todo.interface";
import ToDoModel from "../data/models/todo.model";
import { Error } from "mongoose";
import { ServerError } from "../exceptions/server-error.exception";
import { StatusCode } from "../common/status-codes.enum";
import UserModel from "../data/models/user.model";

export class ToDoService implements BaseService<ToDo, string> {
  async getById(id: string): Promise<ToDo> {
    const todo = await ToDoModel.findById(id)
      .select("-__v")
      .populate("user", "-todoList -token -__v");
    if (!todo) {
      throw new ServerError(StatusCode.BADREQUEST, "Todo id isn't correct");
    }
    return todo;
  }
  async create(item: ToDo): Promise<void> {
    try {
      const newTodo = new ToDoModel(item);
      await newTodo.save();
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new ServerError(StatusCode.BADREQUEST, e.message);
      } else {
        throw e;
      }
    }
  }
  async getAll(): Promise<ToDo[]> {
    const todoList = await ToDoModel.find()
      .select("-__v")
      .populate("user", "-todoList -token -__v");
    return todoList;
  }
  async update(id: string, toDo: ToDo): Promise<void> {
    try {
      if (toDo.user) {
        const user = await UserModel.findById(toDo.user);
        if (!user) {
          throw new ServerError(StatusCode.BADREQUEST, "User is incorrect");
        }
      }
      await ToDoModel.findByIdAndUpdate(id, toDo, { new: true });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new ServerError(StatusCode.BADREQUEST, e.message);
      } else {
        throw e;
      }
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const todo = await ToDoModel.findById(id);
      if (!todo) {
        throw new ServerError(StatusCode.BADREQUEST, "Todo id isn't correct");
      }
      await todo.delete();
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new ServerError(StatusCode.BADREQUEST, e.message);
      } else {
        throw e;
      }
    }
  }
}
