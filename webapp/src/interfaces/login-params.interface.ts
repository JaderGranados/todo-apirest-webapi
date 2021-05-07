import ReduxAction from "./redux-action.interface";
import User from "./user.interface";

export default interface LoginParams {
    login(user: User): ReduxAction<User>
}