import User from "./user.interface";

export default interface ToDo{
    name: string;
    description?: string;
    user: User | string
}