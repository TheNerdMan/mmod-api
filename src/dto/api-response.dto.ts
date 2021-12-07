
export interface PagedResponseDto<T> {
    totalCount: number;
    returnCount: number;
    response: T;
}
