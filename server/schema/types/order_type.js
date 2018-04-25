const graphql = require ('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const OrderItemType = require('./order_item_type');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: { type: GraphQLString },
    customerid: {
      type: GraphQLString,
      resolve: (parent) => parent['customer-id']
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
        console.log(thisTotal);
        return (
          thisTotal.toFixed(2)
        )
      }
    }
  }
})

module.exports = OrderType;
