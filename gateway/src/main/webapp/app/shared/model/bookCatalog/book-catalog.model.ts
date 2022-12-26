export interface IBookCatalog {
  id?: string;
  title?: string;
  author?: string;
  description?: string | null;
}

export class BookCatalog implements IBookCatalog {
  constructor(public id?: string, public title?: string, public author?: string, public description?: string | null) {}
}
