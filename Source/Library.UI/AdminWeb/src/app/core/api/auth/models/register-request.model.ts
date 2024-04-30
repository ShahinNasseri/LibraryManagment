export class RegisterRequest {
    constructor(
        public fullName?: string,
        public email?: string,
        public username?: string,
        public password?: string,
      ) {}
}
