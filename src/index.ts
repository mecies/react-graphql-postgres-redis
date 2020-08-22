import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { buildSchema } from "type-graphql";
import express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/User";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "mecies_qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years XD
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, //cookie only works in https
      },
      secret: "thisIsConfidentaiLsdakdjaAS",
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false, // will use different validator
    }),
    context: ({ req, res }: MyContext) => ({ em: orm.em, req, res }), // TODO fix
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Listening on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
