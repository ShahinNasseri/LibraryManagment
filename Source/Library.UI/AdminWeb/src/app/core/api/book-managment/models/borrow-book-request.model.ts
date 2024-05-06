export class BorrowBookRequest {
    constructor(
        public bookId: number,
        public returnDate: string, 
        public userId?: number, // Optional 'long' property mapped to 'number'
      ) {}
}
