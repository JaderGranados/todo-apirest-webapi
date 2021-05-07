import { Redirect } from "react-router";
import { BaseComponent } from "../base.component";
import Page from "./page";
import User from "../../interfaces/user.interface";
import LoginParams from "../../interfaces/login-params.interface";
import AuthenticateService from "../../interfaces/authenticate-service.interface";
import {axiosAuthenticateService} from "../../services/authenticate.services";


export default class Login extends BaseComponent<{}> {
  private readonly _services: AuthenticateService = axiosAuthenticateService;

  constructor(props: LoginParams){
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(user: User) {
    try {
      const userLoged: User = await this._services.login(user);
      userLoged.isLoged = true;
      localStorage.setItem('user', JSON.stringify(userLoged));
      this.setState({redirect: true, redirectUrl: '/'})
    }
    catch (e){
      alert(e.message);
    }
  }
  
  render() {
    if (this.state.redirect){
      return <Redirect to={this.state.redirectUrl} />
    }
    return <Page submit={this.submit} />;
  }
}