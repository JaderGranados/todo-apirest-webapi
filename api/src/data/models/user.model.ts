import { Schema, model } from "mongoose";
import { User } from "../../interfaces/user.interface";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username should be unique"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  token: {
    type: String
  },
  todoList: [{
    ref: 'todo',
    type: Schema.Types.ObjectId
  }]
});

export default model<User>('user', userSchema);