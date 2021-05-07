import { User } from "../interfaces/user.interface";
import { BaseService } from "../interfaces/base-service.interface";
import { Authenticable } from "../interfaces/logeable.interface";
import { ServerError } from "../exceptions/server-error.exception";
import { StatusCode } from "../common/status-codes.enum";
import UserModel from "../data/models/user.model";
import { JWTHelper } from "../common/jwtoken.helper";
import { Error } from "mongoose";

export class UserServices implements BaseService<User, string>, Authenticable<User> {
  async logOut(id: string | number): Promise<void> {
    const userFinded = await UserModel.findById(id);
    if (!userFinded) {
      throw new ServerError(
        StatusCode.BADREQUEST,
        "User id doen't exists"
      );
    }

    const token = JWTHelper.createToken({
      id: userFinded.id,
      username: userFinded.username,
      email: userFinded.email,
    });

    userFinded.token = undefined;
    await userFinded.save();
  }
  async isLogedIn(username: string): Promise<boolean> {
    if (!username) {
      return false;
    }
    const userFinded = await UserModel.findOne({
      username: username
    });
    return userFinded.token != undefined;
  }
  async userExist(username: string): Promise<boolean> {
    if (!username) {
      return false;
    }
    const userFinded = await UserModel.findOne({
      username: username
    });
    return userFinded != null;
  }
  async login(user: User): Promise<User> {
    if (!user.username || !user.password) {
      console.log(user);
      throw new ServerError(
        StatusCode.BADREQUEST,
        "Username or password can't be empty"
      );
    }
    const userFinded = await UserModel.findOne({
      username: user.username,
      password: user.password,
    });
    if (!userFinded) {
      throw new ServerError(
        StatusCode.BADREQUEST,
        "Username and password don't match"
      );
    }

    const token = JWTHelper.createToken({
      id: userFinded.id,
      username: userFinded.username,
      email: userFinded.email,
    });

    userFinded.token = token;
    await userFinded.save();
    return userFinded;
  }
  async create(item: User): Promise<void> {
    try {
      const newUser = new UserModel(item);
      await newUser.save();
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new ServerError(StatusCode.BADREQUEST, e.message);
      } else {
        throw e;
      }
    }
  }
  async getAll(): Promise<User[]> {
    const userList = await UserModel.find();
    return userList;
  }
  update(id: string, toDo: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
