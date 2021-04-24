import 'reflect-metadata'
import { createConnection } from "typeorm";
import { App } from "./app";

async function main() {
  const app = new App(9000);
  await app.listen();
}

createConnection();
main();
