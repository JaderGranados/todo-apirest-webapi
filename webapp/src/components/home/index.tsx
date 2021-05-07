import { Component } from "react";
import { Redirect } from "react-router";
import State from "../../interfaces/authorization-state-component.interface";
import ToDo from "../../interfaces/todo.interface";
import { todoServices } from "../../services/todo.services";
import Page from "./page";

export default class Home extends Component<{}, State & {todoList: ToDo[]}> {
  private todoList: Array<ToDo> | undefined;

  constructor(props: {}){
    super(props);
    this.state = {redirectUrl: '/login', todoList: [], redirect: false}
  }
  componentDidMount(){
    const user = localStorage.getItem('user');
    if (user == null){
      this.setState({redirect: true,});
    }
    todoServices.getAll().then(entries => {
      this.setState({todoList: entries});
    }).catch(e => console.error(e));
  }
  render() {
    if (this.state.redirect){
      return <Redirect to={this.state.redirectUrl} />
    }
    return <Page todoList={this.state.todoList} />;
  }
}