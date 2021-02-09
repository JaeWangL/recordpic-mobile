export interface PaginatedItemsViewModel<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}
