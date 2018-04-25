const graphql = require ('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const products = require('../../../data/products');
const productsApiEndpoint = '';

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
        if (products) {
          return _.find(products, { id: parentValue['product-id'] }).description
        } else {
          return axios.get(`${productsApiEndpoint}/${[parentValue['product-id']]}`)
            .then(res => res.data.description);
        }
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
