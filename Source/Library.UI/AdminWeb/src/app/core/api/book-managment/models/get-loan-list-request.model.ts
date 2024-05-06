import { EntityList } from '@core/general/models/entity-list.model';

export class GetLoanListRequest extends EntityList {
    constructor(
        public userId?: number, 
        public loanId?: number, 
        public isReturned?: boolean,
        public isOverDue?: boolean,
      ) {
        super();
      }
}
