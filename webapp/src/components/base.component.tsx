import {Component} from "react";
import State from "../interfaces/authorization-state-component.interface";
import { PAGES } from "../types/pages.enum";

export abstract class BaseComponent<TProps> extends Component<TProps, State>{
    constructor(props: TProps){
        super(props);
        this.state = {
            redirect: false,
            redirectUrl: PAGES.LOGIN
        };
    }
}