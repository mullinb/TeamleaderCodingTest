const graphql = require ('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const products = require('../../../data/products');

const OrderItemType = require('./order_item_type');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: { type: GraphQLString },
    "customer-id": { type: GraphQLString },
    items: {
      type: GraphQLList(OrderItemType),
      args: GraphQLList(GraphQLString),
      resolve(parentValue, args) {
        if (products) {
          return
        }
      }
    },
    total: { type: GraphQLString }
  }
})

module.exports = OrderType;
