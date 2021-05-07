import { Connection } from "mongoose";

export interface BaseDatabase {
  setUri(uri: string): void;
  connect(): void;
  getConnection(): Connection;
  once(event: string, callback: (...args: any[]) => void): void;
  on(event: string, callback: (...args: any[]) => void): void;
}
