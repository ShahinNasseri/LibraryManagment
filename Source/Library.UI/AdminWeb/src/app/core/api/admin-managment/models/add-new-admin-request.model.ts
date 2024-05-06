export class AddNewAdminRequest {
    constructor(
        public fullName?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public isActive?: boolean, // Optional boolean property
      ) {}
}
