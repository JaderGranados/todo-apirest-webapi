export default interface User {
  name?: string;
  username: string;
  password?: string;
  email?: string;
  isLoged: boolean;
  token?: string;
}
