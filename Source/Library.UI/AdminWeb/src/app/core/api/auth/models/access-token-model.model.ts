export class AccessTokenModel {
    constructor(
        public id: number, 
        public accessToken: string,
        public refreshToken: string,
        public tokenType: string,
        public expiresIn: number,
      ) {}
}
