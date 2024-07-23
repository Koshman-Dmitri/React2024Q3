export type ApiElement = {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: {
    uid: string;
    name: string;
  } | null;
  url?: string;
};

export type ApiPagination = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

export type ApiData = {
  page: ApiPagination;
  astronomicalObjects: ApiElement[];
};

export type SearchProps = {
  query: string;
  page: number;
};
