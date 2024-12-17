interface Page {
  next?: number;
}

export interface SearchResult extends Page {
  title: string;
  url: string;
  authors: string[];
  cover: string;
}
