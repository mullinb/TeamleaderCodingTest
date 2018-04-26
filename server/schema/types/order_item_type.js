const graphql = require ('graphql');
const axios = require('axios');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const { productsApiEndpoint } = require('../../../data/APIEndpoints')

const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  fields: {
    "productid": {
      type: GraphQLString,
      resolve: (parent) => parent['product-id']
    },
    description: {
      type: GraphQLString,
      resolve(parentValue, args) {
        return axios.get(`${productsApiEndpoint}${[parentValue['product-id']]}`)
          .then(res => res.data.description);
      }
    },
    quantity: { type: GraphQLString },
    unitprice: {
      type: GraphQLString,
      resolve: (parent) => parent['unit-price']
    },
    total: {
      type: GraphQLString,
      resolve(parentValue, args) {
        let thisTotal = 0;
        thisTotal += parseFloat(parentValue['unit-price'] * parentValue.quantity)
        return (
          thisTotal.toFixed(2)
        )
      }
    }
  }
})

module.exports = OrderItemType;
