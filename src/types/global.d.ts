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

  // for my MDX posts 
  type toc = object[]

  interface MDXPostProps {
    frontMatter: FrontMatter;
    mdxSource: MDXRemoteSerializeResult;
    toc?: toc;
  }

  // everything p5js
  type P5jsContainerRef = HTMLDivElement;

  type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

  type P5jsContainer = ({
    sketch,
  }: {
    sketch: P5jsSketch;
  }) => React.JSX.Element;

  interface Researchdata {
    cristin_result_id: string;
    authors: string;
    year: string;
    title: string;
    event: string;
    // link: string;
  }

  type ResearchDataList = Researchdata[];

  interface CristinDataResponseJSON {
    [x: string]: JSONArray;
  }

  // for use in commentsection.tsx
  interface MyComment {
    name: string;
    comment: string;
    date: string;
    slug: string;
    _id?: string;
  }

  type CommentList = MyComment[];

  // for MyH1 MyH2 etc.
  interface MyTextProps<T> {
    children: string;
    object: T;
  }

  // for use in Bank.tsx

  interface TableItem {
    value: number;
    date: string;
    _id: any;
  }

  type TableList = TableItem[];

  // type BankProps = {
  //   table: TableList;
  //   total: number;
  // }

  //type OneOrMany<Type> = Type | Type[];
  //const flaton: OneOrMany<string> = ["hey", "two", "three"];
}
