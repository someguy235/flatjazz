import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import notes from "../../../data/data";
import Note from "../../../types/note";

const getNote = (id: Number) => {
  console.log(id);
  console.log(notes);
  const note = notes.find((n: Note) => n.id === id);
  console.log(note);
  return note;
};

const handler = nc().get((req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req.query.id);
  const id: Number = parseInt("" + req.query.id);
  const note = getNote(id);
  res.json({ data: note });
});

export default handler;
