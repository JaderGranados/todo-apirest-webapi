import {createContext} from "react";
import axios from "axios";
import AuthenticateService from "../interfaces/authenticate-service.interface";
import dotenv from "dotenv";
import User from "../interfaces/user.interface";
import ServerResponse from "../interfaces/server-response.interface";
dotenv.config();

class AxiosAuthenticateService implements AuthenticateService{
   
    private readonly _serviceUrl: string = process.env.API_URL || "http://localhost:5000/api";
    async login(user: User): Promise<User> {
        try {
            if (!this._serviceUrl){
                throw new Error("Url service not provided.");
            }
            const url: string = this._serviceUrl + '/authenticate/sigin';
            const response = await axios.post<ServerResponse<User>>(url, user, {headers: {crossDomain: true}});
            if (response.status === 200){
                if (response.data.success && response.data.data !== undefined){
                    const token = `Bearer ${response.data.data.token}`;
                    axios.interceptors.request.use(function (config) {
                        config.headers.Authorization =  `${token}`;
                        return config;
                    });
                    axios.defaults.headers.common['Authorization'] = token;
                    return response.data.data;
                }
            }
            throw new Error(response.data.errorMessage);
        }
        catch (e) {
            throw e;
        }
    }
    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }  
} 

export const axiosAuthenticateService = new AxiosAuthenticateService();

export const authenticateService = createContext<AuthenticateService>(axiosAuthenticateService);