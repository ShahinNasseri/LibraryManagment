export class InsertBookRequest {
    constructor(
        public bookId: number,
        public title: string,
        public isbn?: string, // Optional string property
        public publicationYear?: number, // Optional number property
        public publisher?: string, // Optional string property
        public genre?: string, // Optional string property
        public summary?: string, // Optional string property
      ) {}
}
