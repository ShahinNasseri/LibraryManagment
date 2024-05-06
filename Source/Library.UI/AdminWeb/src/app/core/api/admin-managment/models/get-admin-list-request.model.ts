import { EntityList } from '@core/general/models/entity-list.model';

export class GetAdminListRequest extends EntityList {
    constructor(
        public userId?: number, // 'long' in C# maps to 'number' in TypeScript
      ) {
        super();
    }
}
