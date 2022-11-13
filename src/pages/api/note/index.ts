import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import notes from "../../../data/data";
import Note from "../../../types/note";

export const getServerSideProps: GetServerSideProps = async () => {
  // server-side data fetch at RUN TIME
  // this page will be dynamically generated, server-side, at request time
  const response = await fetch("/some/api");
  const data = await response.json();
  return { props: { data } };
};

const handler = nc()
  .post((req: NextApiRequest, res: NextApiResponse) => {
    const note: Note = { ...req.body, id: Date.now() };
    notes.push(note);
    res.json({ data: note });
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.json({ data: notes });
  });

export default handler;
