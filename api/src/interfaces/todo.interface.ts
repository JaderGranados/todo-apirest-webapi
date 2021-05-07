import { Document } from "mongoose";
import { User } from "./user.interface";

export interface ToDo extends Document {
  name: string;
  description: string;
  user: string | User;
}
