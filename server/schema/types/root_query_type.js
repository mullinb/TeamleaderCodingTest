const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const OrderType = require('./order_type');
const ProductType = require('./product_type');
const CustomerType = require('./customer_type');
const axios = require('axios');

const { ordersApiEndpoint, productsApiEndpoint, customersApiEndpoint } = require('../../../APIEndpoints')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(ordersApiEndpoint + args.id)
          .then(res => res.data);
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parentValue, args) {
        return axios.get(`${ordersApiEndpoint}`)
          .then(res => res.data);
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${productsApiEndpoint}${args.id}`)
          .then(res => res.data);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parentValue, args) {
        return axios.get(`${productsApiEndpoint}`)
          .then(res => res.data);
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${customersApiEndpoint}${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = RootQueryType;
