import AuthenticateParams from "../../interfaces/authenticate-params.interface";
import User from "../../interfaces/user.interface";
import { BaseComponent } from "../base.component";
import Page from "./page";

export default class NavBar extends BaseComponent<{}> {
  async logout(): Promise<void> {
    localStorage.clear();
    this.forceUpdate();
  }

  constructor(props: Omit<AuthenticateParams, "logout">) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    const userString = localStorage.getItem('user');
    if (userString != null){
      this.forceUpdate();
    }
  }

  render() {
    const userString = localStorage.getItem('user');
    let user: User;
    if (userString != null){
      user = JSON.parse(userString);
    }else{
      user = {
        username: "",
        isLoged: false
      }
    }
    return <Page user={user} logout={this.logout} />;
  }
}