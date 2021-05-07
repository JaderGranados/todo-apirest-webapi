import { withRouter } from "react-router";
import {BaseComponent} from "../base.component";
import Page from "./page";

class TodoManage extends BaseComponent<{history: any, location: any, match: any}> {

    render(){
        console.log(this.props);
        return <Page  todo={{name: "", user:""}}/>
    }
}

export default withRouter(TodoManage);