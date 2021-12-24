const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const cors = require( `cors` );
const app = express();

app.get("/", (req, res) => {
  res.send("Up and running with graphql");
});

const customers = [
  { id: "1", name: "John Doe", age: 35 },
  { id: "2", name: "Steve Smith", age: 25 },
  { id: "3", name: "Sara Williams", age: 32 },
];

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  description: "This is customer",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    customers: {
      type: new GraphQLList(CustomerType),
      description: "List of all customers",
      resolve: () => customers,
    },
    customer:{
        type:CustomerType,
        description: "Single customer",
        args:{ id:{type:GraphQLInt} },
        resolve(parentValue, args){
            for(let i = 0;i < customers.length;i++){
                if(customers[i].id == args.id){
                    return customers[i];
                }
            }
        }
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use( cors() );
app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema: schema,
    })
  );

app.listen(2000, () => console.log("Server Running on port 2000"));
