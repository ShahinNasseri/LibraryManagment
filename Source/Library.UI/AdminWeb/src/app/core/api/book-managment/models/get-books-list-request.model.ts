import { EntityList } from '@core/general/models/entity-list.model';

export class GetBooksListRequest extends EntityList {
    constructor(
        public bookId?: number,  // Optional 'int' property mapped to 'number'
        public inLoan?: boolean, // Optional boolean property
        public freeBooks?: boolean, // Optional boolean property
      ) {
        super();
      }
}
