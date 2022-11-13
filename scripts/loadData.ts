import fetch from "node-fetch";
import fs from "fs";
// import secret from "./secret.json";
// import secret from "./secret.json" assert { type: "json" };
// let secretPath = "./secret.json";
// let secret = await import(filePath);
// let secret = await import(filePath, {
//   assert: { type: "json" },
// });
// const inputArray = arrayImport.default;

// console.log("result: " + secret);

const secret = JSON.parse(fs.readFileSync("secret.json", "utf-8"));

const API_BASE = "https://api.spotify.com/v1";
const AUTH_BASE = "https://accounts.spotify.com/api/token";
const CLIENT_ID = "fd89d09a42cf4a9fb0a69ec19e3432ae";
const SECRET_ID = secret.key;
const ENCODED_ID = Buffer.from(CLIENT_ID + ":" + SECRET_ID).toString("base64");

const neo4j_uri = "neo4j://localhost:7687";
const neo4j_usr = "neo4j";
const neo4j_pass = "jazz";

let bearerToken: string, expiresDate: Date;

function setNewExpires(expires: number) {
  const currentDateObj = new Date();
  const numberOfMlSeconds = currentDateObj.getTime();
  const addMlSeconds: number = expires * 1000;
  const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  expiresDate = newDateObj;
}

const tokenIsExpired = (): boolean => {
  if (!expiresDate || new Date().getTime() > expiresDate.getTime()) {
    return true;
  }
  return false;
};

type BearerToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

async function requestBearerToken(): Promise<BearerToken> {
  const response = await fetch(AUTH_BASE, {
    method: "POST",
    headers: {
      Authorization: "Basic " + ENCODED_ID,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }).catch((error: Error) => {
    console.log(error);
    return Promise.reject(error);
  });

  const json: BearerToken = (await response.json()) as BearerToken;
  return json;
}

async function getBearerToken() {
  if (bearerToken === null || tokenIsExpired()) {
    const json = await requestBearerToken();
    const token = json["access_token"];
    const expires = json["expires_in"];
    bearerToken = token;
    setNewExpires(expires);
    return token;
  } else {
    return bearerToken;
  }
}

async function readDatabase() {
  const neo4j = require("neo4j-driver");

  const driver = neo4j.driver(
    neo4j_uri,
    neo4j.auth.basic(neo4j_usr, neo4j_pass)
  );

  const session = driver.session();
}

const getArtists = async () => {};

const getAlbums = async () => {};

type Album = {
  id: string;
  title: string;
};
type Artist = {
  id: string;
  title: string;
};

const seedDb = async () => {
  const token = await getBearerToken();
  console.log(token);
  const artistQueue = [];
  const albumQueue = ["1weenld61qoidwYuZ1GESA"]; // Kind of Blue

  try {
    const albumId = albumQueue.pop();
    const albumUrl = `${API_BASE}/albums/${albumId}`;
    console.log(albumUrl);
    // fetch
  } catch (e) {
    console.log(e);
  }
  // https://api.spotify.com/v1/search?q=Davis,Miles&type=artist&limit=10

  //   while (artistQueue.length != 0) {
  // const artist = artistQueue.pop();
  // const searchUrl = `${API_BASE}/search?q=${artist}&type=artist&limit=10`;
  //   }
};
// export {};
seedDb();
