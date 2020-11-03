const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { NODE_ENV, FRONTEND_URL, DB_URL, PORT } = require("./config");

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:
    NODE_ENV === "production"
      ? false
      : {
          settings: {
            "request.credentials": "include",
          },
        },
  context: ({ req, res }) => ({ req, res }),
  cors: false,
});

// Setup Static directory
const startApp = async () => {
  try {
    // Database Connection
    await mongoose.connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`*** Connected to the Database: ***`);

    server.applyMiddleware({ app, cors: false });
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    PORT || 5000;

    httpServer.listen({ port: PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};

startApp();
