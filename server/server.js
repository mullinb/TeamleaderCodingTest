const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
var history = require('connect-history-api-fallback');


const app = express();

app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}));

app.use(history({
  rewrites: [
   { from: /\/bundle/, to: '/bundle.js'}
 ]
}));

const webpackMiddleware = require ('webpack-dev-middleware');
const webpack = require ('webpack');
const webpackConfig = require ('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
