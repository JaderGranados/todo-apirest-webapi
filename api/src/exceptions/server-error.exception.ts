import { StatusCode } from "../common/status-codes.enum";

export class ServerError extends Error {
  constructor(public statusCode: StatusCode, message: string) {
    super(message);
  }
}
