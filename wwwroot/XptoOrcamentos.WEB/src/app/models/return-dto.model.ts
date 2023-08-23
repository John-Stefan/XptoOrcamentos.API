export interface ReturnDTO<T> {
    success: boolean;
    message: string;
    data: T;
}
