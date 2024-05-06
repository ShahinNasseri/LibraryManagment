export class GetUserDataResponse {
    constructor(
        public id: number,
        public fullName: string,
        public username: string,
        public isActive: boolean,
        public isAdmin: boolean,
      ) {}
}
