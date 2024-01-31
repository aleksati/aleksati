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

  interface SearchResJSON {
    [x: string]: JSONArray;
  }

  interface MDXPostProps {
    mdxSource: MDXRemoteSerializeResult;
    frontMatter: FrontMatter;
  }

  type P5jsContainerRef = HTMLDivElement;

  type P5jsSketchCleanup = { cleanup: () => void };

  type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

  interface Researchdata {
    authors: string;
    year: string;
    title: string;
    journal: string;
    link: string;
  }

  type ResearchDataList = Researchdata[];

  interface CristinDataResponseJSON {
    [x: string]: JSONArray;
  }

  //type OneOrMany<Type> = Type | Type[];
  //const flaton: OneOrMany<string> = ["hey", "two", "three"];
}
