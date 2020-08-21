import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init({
    entitites: [],
    dbName: "mecies",
    // user
    // password,
    type: "postgresql",
    debug: !__prod__,
  });
};

main();

console.log("hello world");
