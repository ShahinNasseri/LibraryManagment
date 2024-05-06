export class GetAdminListReponse {
    constructor(
        public id: number,
        public fullName: string,
        public username: string,
        public isActive: boolean,
        public isAdmin: boolean,
        public totalCount: number,
      ) {}
}
