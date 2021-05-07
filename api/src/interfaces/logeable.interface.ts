export interface Authenticable<TUser> {
  login(user: TUser): Promise<TUser>;
  userExist(username: string): Promise<boolean>;
  isLogedIn(username: string): Promise<boolean>;
  logOut(id: string | number): Promise<void>;
}
