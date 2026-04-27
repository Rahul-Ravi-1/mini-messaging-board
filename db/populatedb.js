#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");
const { getPgConfig } = require("./pgConfig");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text)
VALUES
  ('Odin', 'Welcome to the message board'),
  ('Rahul', 'Postgres is connected');
`;

async function main() {
  console.log("seeding...");
  const client = new Client(getPgConfig());
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();