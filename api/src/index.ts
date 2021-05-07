import dotenv from "dotenv";
import express, { Application } from "express";
import { Server, createServer } from "http";
import { BaseRouterConfig } from "./routes/base.routes";
import { ToDoRouterCongif } from "./routes/todo.routes";
import { MongooseDatabase } from "./data/database";
import { BaseDatabase } from "./interfaces/base-database.interface";
import { DatabaseConfig } from "./interfaces/database-config.interface";
import { AuthenticateRouterCongif } from "./routes/authenticate.routes";
import passportMiddleware from "./middlewares/passport-jwt.middleware";
// import allowOriginsMiddleware from "./middlewares/allow-origins.middleware";
import cors from "cors";

const app: Application = express();
const server: Server = createServer(app);
const routes: Array<BaseRouterConfig> = [];

// Enviroment settings
dotenv.config();
const port = process.env.PORT || 3000;
const databaBaseConfig: DatabaseConfig = {
  uri: process.env.DATABASE_URI,
  password: process.env.DATABASE_USER || null,
  username: process.env.DATABASE_PASSWORD || null,
};

// Database settings
const database: BaseDatabase = new MongooseDatabase(databaBaseConfig);
database.connect();

// Middleware settings
app.use(cors());
// app.use(allowOriginsMiddleware);
app.use(express.json());
app.use(passportMiddleware.initialize);

// Routes settings
routes.push(new ToDoRouterCongif("/api/todo"));
routes.push(new AuthenticateRouterCongif("/api/authenticate"));

server.listen(port, () => {
  console.log(`App running on port ${port}`);
  routes.forEach((route) => {
    app.use(route.getPathBase(), route.configureRoutes());
    console.log(`Route configured for ${route.getName()}`);
  });
});
