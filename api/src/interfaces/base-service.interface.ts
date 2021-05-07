
export interface BaseService<T, I extends string | number> {
  create(item: T): Promise<void>;
  getAll(): Promise<Array<T>>;
  update(id: I, toDo: T): Promise<void>;
  delete(id: I): Promise<void>;
  getById(id: I): Promise<T>;
}
