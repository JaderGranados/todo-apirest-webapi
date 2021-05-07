import { Response, Request, NextFunction } from "express";

// Add headers
export default function (req: Request, res: Response, next: NextFunction) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Content-Type', 'application/json');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin, crossdomain, responseType, observe")

    res.header('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
}