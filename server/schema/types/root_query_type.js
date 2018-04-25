const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const OrderType = require('./order_type');
const ProductType = require('./product_type');
const CustomerType = require('./customer_type');

//Provide API endpoints here
const ordersApiEndpoint = `localhost:${process.env.PORT}/data/orders`;
const productsApiEndpoint = `localhost:${process.env.PORT}/data/products`;
const customersApiEndpoint = `localhost:${process.env.PORT}/data/customers`;


const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    order: {
      type: OrderType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${ordersApiEndpoint}{ id: args.id }`)
          .then(res => res.data);
      
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parentValue, args) {
        if (orders) {
          return orders
        } else {
          return axios.get(`${ordersApiEndpoint}`)
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
          return axios.get(`${productsApiEndpoint}{ id: args.id }`)
            .then(res => res.data);
        }
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parentValue, args) {
        if (orders) {
          return orders
        } else {
          return axios.get(`${ordersApiEndpoint}`)
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
          return axios.get(`${productsApiEndpoint}{ id: args.id }`)
            .then(res => res.data);
        }
      }
    }
  }
});

module.exports = RootQueryType;
