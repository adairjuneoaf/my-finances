export interface DataResponseAPI<T> {
  pagination: {
    page: number;
    totalCount: number;
    refNextPage: string | undefined;
    refPreviousPage: string | undefined;
  };
  payload: {
    list: Array<T>;
  };
}
