export class EntityList {
    constructor(
        public searchString?: string,
        public columnOrder?: string,
        public sortOrder: SortOrder = SortOrder.Ascending, // Default value for SortOrder
        public pageIndex?: number,
        public pageSize?: number,
      ) {}
}
export enum SortOrder{
    Ascending = 1,
    Descending = 2
}