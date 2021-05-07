import { Schema, model } from "mongoose";
import { ToDo } from "../../interfaces/todo.interface";

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    trim: true
  },
  user: {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"]
  }
});

export default model<ToDo>('todo', todoSchema);