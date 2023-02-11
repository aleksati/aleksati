import { getAllFr } from "../../../functions/loadPosts";
import LayoutPage from "../../../layouts/LayoutPage";
import PostList from "../../../components/PostList";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

const pageMeta = {
  title: "tidemann.xyz",
  keywords:
    "music technology, music, software development, networked audio, programming",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function Posts({ pageFrontMatter, numbPages }) {
  const currPage = parseInt(pageFrontMatter[0].page);

  return (
    <LayoutPage
      showSearch={true}
      showTheme={true}
      showPostFilter={true}
      pageMeta={pageMeta}>
      {currPage === 1 ? (
        <h1 className="font-bold text-7xl mb-8">latest posts</h1>
      ) : null}
      <PostList
        pagination={true}
        currPage={currPage}
        numbPages={numbPages}
        frontMatter={pageFrontMatter}
      />
    </LayoutPage>
  );
}

export async function getStaticProps({ params }) {
  const frontMatter = await getAllFr();
  const currPage = parseInt(params.page);

  // only include desired page (pagination)
  const pageFrontMatter = frontMatter.filter((item) => item.page === currPage);

  // get number of pagination pages
  const lastItem = frontMatter[frontMatter.length - 1];
  const numbPages = lastItem.page;

  return { props: { pageFrontMatter, numbPages } };
}

export async function getStaticPaths() {
  const frontMatter = await getAllFr();

  // get number of pagination pages
  const lastItem = frontMatter[frontMatter.length - 1];
  const numbPages = lastItem.page;

  const numbPagesArray = Array(numbPages).fill(0);

  return {
    paths: numbPagesArray.map((s, i) => ({
      params: { page: i + 1 + "" },
    })),
    fallback: false,
  };
}
