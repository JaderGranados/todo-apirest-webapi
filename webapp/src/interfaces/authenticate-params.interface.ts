import ReduxAction from "./redux-action.interface";
import User from "./user.interface";

export default interface NavBarParams {
  user?: User;
  logout(): Promise<void>;
  isLoged(username: string): ReduxAction<string>
}
