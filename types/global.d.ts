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
    keywords?: string | string[];
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

  interface MDXPostProps {
    mdxSource: MDXRemoteSerializeResult;
    frontMatter: FrontMatter;
  }

  type P5jsContainerRef = HTMLDivElement;

  type P5jsSketch = <T>(p: p5Types, ref: React.MutableRefObject<T>) => void;

  //type OneOrMany<Type> = Type | Type[];
  //const flaton: OneOrMany<string> = ["hey", "two", "three"];
}
