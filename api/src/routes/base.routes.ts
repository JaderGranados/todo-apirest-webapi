import { Router } from "express";

export abstract class BaseRouterConfig {
  constructor(private _name: string, private _pathBase: string) {}

  getName(): string {
    return this._name;
  }

  getPathBase(): string {
    return this._pathBase;
  }

  abstract configureRoutes(): Router;
}
