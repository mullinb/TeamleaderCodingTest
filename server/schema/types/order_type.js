const graphql = require ('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const OrderItemType = require('./order_item_type');

const { customersApiEndpoint } = require('../../../APIEndpoints');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: { type: GraphQLString },
    customerid: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent['customer-id']
    },
    customername: {
      type: GraphQLString,
      resolve(parentValue) {
        return axios.get(customersApiEndpoint+parentValue['customer-id'])
          .then(res => res.data.name)
          .catch((err) => {
            console.log(err);
            return err;
          })
      }
    },
    items: {
      type: new GraphQLList (OrderItemType),
      resolve(parentValue) {
        return (
          parentValue.items
        )
      }
    },
    total: {
      type: GraphQLString,
      resolve(parentValue, args) {
        let thisTotal = 0;
        parentValue.items.forEach((item) => {
          thisTotal += parseFloat(item.total)
        })
        return (
          thisTotal.toFixed(2)
        )
      }
    }
  }
})

module.exports = OrderType;
