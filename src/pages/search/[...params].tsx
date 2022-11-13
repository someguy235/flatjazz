import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Params from "../../types/params";

const Search = () => {
  const router = useRouter();
  const { params } = router.query;
  console.log(params);
  return <h1>Search page {params}</h1>;
};

// pages/blog/:slug.ts
export const getStaticPaths: GetStaticPaths = async () => {
  // generate static page paths from e.g. file system or api results
  const results = await fetch("/api/posts");
  const posts = await results.json();
  const paths = posts.map((post: Params) => ({
    params: { slug: post.slug },
  }));
  /*
    [
        { params: { slug: 'get-started-with-node' } },
        { params: { slug: 'top-frameworks' }  }
    ]
  */
  return paths;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context.params as Params;
  const res = await fetch(`/api/post/${params}`);
  const post = await res.json();
  return { props: { post } };
};

export default Search;
