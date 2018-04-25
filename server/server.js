const express = require('express');
const fs = require('fs');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const testPaths = {
  orders: require('../data/orders'),
  customers: require('../data/customers'),
  products: require('../data/products')
}


const app = express();

app.get("/data/:field", (req, res) => {
  console.log(testPaths[req.params.field])
  res.json(testPaths[req.params.field]);
})

app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require ('webpack-dev-middleware');
const webpack = require ('webpack');
const webpackConfig = require ('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
