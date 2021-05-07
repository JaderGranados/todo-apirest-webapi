import { connect, Connection } from "mongoose";
import { DatabaseConfig } from "../interfaces/database-config.interface";
import { BaseDatabase } from "../interfaces/base-database.interface";

export class MongooseDatabase implements BaseDatabase {
  private _connection: Connection;
  constructor(private databaseConfig: DatabaseConfig) {}
  setUri(uri: string): void {
    this.databaseConfig.uri = uri;
  }
  async connect() {
    if (!this.databaseConfig.uri) {
      throw Error("Database uri must be provided");
    }
    const con = await connect(this.databaseConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this._connection = con.connection;
    this.on("error", (error: Error) => console.error(error));
    this.once("open", () => console.log("Connection stablished"));
  }
  getConnection() {
    return this._connection;
  }
  once(event: string, callback: (...args: any[]) => void): void {
    this._connection.once(event, callback);
  }
  on(event: string, callback: (...args: any[]) => void): void {
    this._connection.on(event, callback);
  }
}
