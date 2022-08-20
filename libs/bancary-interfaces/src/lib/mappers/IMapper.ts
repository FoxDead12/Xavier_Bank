
export interface IMapper<T, S> {

    Map(inObject: T): S;
    MapMany(inObjects: T[]): S[];
}