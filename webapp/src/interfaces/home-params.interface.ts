import ToDo from "./todo.interface";
import User from "./user.interface";

export default interface HomeParams {
    user: User;
    todoList: Array<ToDo>
}