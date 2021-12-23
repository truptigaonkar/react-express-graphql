const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const schema = buildSchema(`
    type User {
        name: String
        age: Int
        college: String
    }
    type Query {
        hello: String
        welcomeMessage(name: String, dayOfWeek: String): String
        getUSer: User
    }
`);
// Resolver
const root = {
  hello: () => {
    return "hello world";
  },
  welcomeMessage: (args) => {
    return `Hey, ${args.name} Hows life. Today is ${args.dayOfWeek}`;
  },
  getUSer: () => {
    const user = {
      name: "John Doe",
      age: 26,
      college: "Ruparel",
    };
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
); // http://localhost:4000/graphql

app.listen(1000, () => console.log(`Server on port 1000`));
