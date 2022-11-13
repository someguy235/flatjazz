import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

const neo4j_uri = "neo4j://localhost:7687";
const neo4j_usr = "neo4j";
const neo4j_pass = "jazz";

const handler = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const neo4j = require("neo4j-driver");

  //   console.log("neo4j");
  //   console.log(neo4j);

  const driver = neo4j.driver(
    neo4j_uri,
    neo4j.auth.basic(neo4j_usr, neo4j_pass)
  );

  //   console.log("driver");
  //   console.log(driver);

  const session = driver.session();

  //   console.log("session");
  //   console.log(session);

  //   const personName = "Alice";

  try {
    //     const result = await session.run(
    //       "CREATE (a:Person {name: $name}) RETURN a",
    //       { name: personName }
    //     );

    const result = await session.run(
      "MATCH p=()-[r:ACTED_IN]->() RETURN p LIMIT 25"
    );
    console.log(result);
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    // console.log(node.properties.name);
  } catch (e) {
    console.log(e);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();

  res.json({ message: "ok" });
});

export default handler;
