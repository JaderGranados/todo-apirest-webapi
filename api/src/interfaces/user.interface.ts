import { Document } from "mongoose";

export interface User extends Document {
  name?: string;
  username: string;
  password: string;
  email?: string;
  token?: string;
}
