import User from "./user.interface";

export default interface AuthenticateService {
    login(user: User): Promise<User>;
    logout(): Promise<void>
}