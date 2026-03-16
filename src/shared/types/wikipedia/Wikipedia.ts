export interface WikipediaResponse {
  batchcomplete: string;
  query: {
    normalized?: { from: string; to: string }[];
    pages: {
      [key: string]: WikipediaQuery;
    };
  };
}

export interface WikipediaQuery {
  pageid?: string;
  ns: number;
  title: string;
  extract: string;
  missing?: string;
}
