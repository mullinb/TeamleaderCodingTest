const graphql = require ('graphql');
const _ = require('lodash');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const OrderItemType = require('./order_item_type');

const { customersApiEndpoint } = require('../../../APIEndpoints')

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: { type: GraphQLString },
    customerid: {
      type: GraphQLString,
      resolve: (parent) => parent['customer-id']
    },
    customername: {
      type: GraphQLString,
      resolve(parentValue) {
        console.log("HERE", parentValue);
        return axios.get(customersApiEndpoint+parentValue['customer-id'])
          .then(res => res.data.name)
          .catch((err) => {
            console.log(err);
            return null;
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
