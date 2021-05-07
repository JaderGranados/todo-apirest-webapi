import axios from "axios";
import { createContext } from "react";
import BaseService from "../interfaces/base-service.interface";
import ServerResponse from "../interfaces/server-response.interface";
import ToDo from "../interfaces/todo.interface";

class TodoServices implements BaseService<ToDo, string>{
    private readonly _serviceUrl: string = process.env.API_URL || "http://localhost:5000/api";
    async getAll(): Promise<ToDo[]> {
        try {
            if (!this._serviceUrl){
                throw new Error("Url service not provided.");
            }
            const url: string = this._serviceUrl + '/todo';
            // const userString = localStorage.getItem('user');
            // if (userString != null){

            // }
            const response = await axios.get<ServerResponse<Array<ToDo>>>(url, {headers: {crossDomain: true}});
            if (response.status === 200){
                if (response.data.success && response.data.data !== undefined){
                    return response.data.data;
                }
            }
            throw new Error(response.data.errorMessage);
        }
        catch (e) {
            throw e;
        }
    }
    getById(id: string): Promise<ToDo> {
        throw new Error("Method not implemented.");
    }
    create(item: ToDo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(item: ToDo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(item: ToDo): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export const todoServices = new TodoServices();

export const todoServicesContext = createContext<BaseService<ToDo, string>>(todoServices);