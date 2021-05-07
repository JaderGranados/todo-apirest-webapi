import ReducerType from "../types/reducer.type";

export default interface ReduxAction<T> {
    type: ReducerType;
    payload: T
}