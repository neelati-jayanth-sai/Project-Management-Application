const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
app.use(cors());
app.use(express.json());
dotenv.config();
const connectDB=require('./config/db')

const port = process.env.PORT || 5000;

connectDB()
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => console.log(`Server running on port ${port}`));
