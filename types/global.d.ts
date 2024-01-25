export {};

declare global {
  interface FrontMatter {
    slug: string;
    date: string;
    title: string;
    summary: string;
    keywords: string[];
    type: string;
  }
  type FrontMatterList = FrontMatter[];
  interface MetaProps {
    title?: string;
    keywords?: string;
    description?: string;
  }
  interface SearchEdgeData {
    data: {
      results: object[];
    };
  }
  interface SearchResJSON {
    [x: string]: JSONArray;
  }
  type SearchResult = Partial<FrontMatter>;
}
