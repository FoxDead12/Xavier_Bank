export interface IBaseRepositories<T, S = T> {

    GetById(id: number): Promise<T>;
    GetEntityBy(entity: Partial<T>, source?: S): Promise<T>;
    Add(entity: T, source?: S): Promise<void>;
    Delete(id: number): Promise<void>;
    Delete(entity: T): Promise<void>;
}