export default interface ServerResponse<T> {
    success: boolean;
    data?: T;
    errorMessage?: string;
}