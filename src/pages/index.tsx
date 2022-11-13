import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
// import '../src/styles.module.css' // <- can do this with .module in file name

const fetchData = async () => {
  const res = await fetch("/api/graph");
  const json = await res.json();
  console.log(json);
};

const Page = () => {
  return (
    <div>
      <h1>Page Component</h1>
      <Link href="/notes">Note Page</Link>
      <button onClick={fetchData}>Fetch</button>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
// can do server-side data fetching here for STATIC PAGES at BUILD TIME
// e.g. database, file system, api calls, etc
// this causes a page to be pre-generated at build time

// console.log(context);

// return {
// props: {},
// };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  // server-side data fetch at RUN TIME
  // this page will be dynamically generated, server-side, at request time
  // const response = await fetch("/some/api");
  // const data = await response.json();
  // return { props: { data } };
  return { props: {} };
};

export default Page;
