const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const OrderType = require('./order_type');
const ProductType = require('./product_type');
const CustomerType = require('./customer_type');

//Remove these to test against API endpoints
const orders = require('../../../data/orders');
const customers = require('../../../data/customers');
const products = require('../../../data/products');

//Provide endpoints here
const ordersApiEndpoint = '';
const productsApiEndpoint = '';
const customersApiEndpoint = '';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        if (orders) {
          return _.find(orders, { id: args.id })
        } else {
          return axios.get(`${ordersApiEndpoint} + { id: args.id }`)
            .then(res => res.data);
        }
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        if (products) {
          return _.find(products, { id: args.id })
        } else {
          return axios.get(`${productsApiEndpoint} + { id: args.id }`)
            .then(res => res.data);
        }
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        if (customers) {
          return _.find(customers, { id: args.id })
        } else {
          return axios.get(`${productsApiEndpoint} + { id: args.id }`)
            .then(res => res.data);
        }
      }
    }
  }
});

module.exports = RootQueryType;
