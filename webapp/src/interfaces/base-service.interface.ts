export default interface BaseService<T, TId> {
    getAll(): Promise<Array<T>>;
    getById(id: TId): Promise<T>;
    create(item: T): Promise<void>;
    update(item: T): Promise<void>;
    delete(item: T): Promise<void>;
}