export interface IColumnConfig {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface ITableConfig {
  columns: IColumnConfig[];
  pageSize: number;
}
