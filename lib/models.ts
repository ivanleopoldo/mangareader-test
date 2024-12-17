export type SearchResultList = {
  results?: SearchResult[];
  next?: number | null;
  lastPage?: number | null;
};

export type SearchResult = {
  id?: string;
  title: string;
  url: string;
  authors: string[];
  cover: string;
};
