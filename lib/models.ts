export type MangaList = {
  results?: MangaDetails[];
  next?: number | null;
  lastPage?: number | null;
};

export type MangaDetails = {
  id: string;
  title: string;
  url: string;
  cover?: string;
  summary?: string;
};

export type MangaChapter = {
  title: string;
  url: string;
};

export type Manga = {
  details: MangaDetails;
  chapters?: MangaChapter[];
};
