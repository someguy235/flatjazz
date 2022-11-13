import React from "react";
import Link from "next/link";

const Notes = () => {
  return (
    <div>
      <h1>Notes page</h1>
      <Link href="/notes/[id]" as={`/notes/10`}>
        Note 1
      </Link>
    </div>
  );
};

export default Notes;
