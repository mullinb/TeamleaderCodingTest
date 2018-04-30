const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const OrderType = require('./order_type');
const ProductType = require('./product_type');
const CustomerType = require('./customer_type');
const axios = require('axios');
const OrderService = require('../../services/order');


const { ordersApiEndpoint, productsApiEndpoint, customersApiEndpoint } = require('../../../APIEndpoints')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    order: {
      type: OrderType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, {id}) {
        return axios.get(ordersApiEndpoint+id)
          .then(res => res.data);
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parentValue) {
        return axios.get(ordersApiEndpoint)
          .then(res => res.data);
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return axios.get(productsApiEndpoint+id)
          .then(res => res.data);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parentValue) {
        return axios.get(productsApiEndpoint)
          .then(res => res.data);
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return axios.get(customersApiEndpoint+id)
          .then(res => res.data);
      }
    }
  }
});

module.exports = RootQueryType;
