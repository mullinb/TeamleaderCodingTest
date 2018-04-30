const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLBoolean
} = graphql;

const OrderType = require('./types/order_type');
const OrderItemType = require('./types/order_item_type');
const AddItemsType = require('./types/add_items_type');

const OrderService = require('../services/orderService');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItems: {
          type: OrderType,
          args: {
            orderid: { type: GraphQLString },
            items: {
              type: new GraphQLList(AddItemsType)
            }
          },
          resolve(parentValue, { orderid, items }) {
            return OrderService.addItems(orderid, items);
          }
        },
        removeItem: {
          type: OrderType,
          args: {
            orderid: { type: GraphQLString },
            itemid: { type: GraphQLString }
          },
          resolve(parentValue, { orderid, itemid }) {
            return OrderService.removeItem(orderid, itemid);
          }
        },
        updateItemQuantity: {
          type: OrderType,
          args: {
            orderid: { type: GraphQLString },
            itemid: { type: GraphQLString },
            quantity: { type: GraphQLString }
          },
          resolve(parentValue, { orderid, itemid, quantity }) {
            return OrderService.updateItemQuantity(orderid, itemid, quantity);
          }
        },
        placeOrder: {
          type: OrderType,
          args: { orderid: { type: GraphQLString } },
          resolve(parentValue, { orderid }) {
            return OrderService.placeOrder(orderid);
          }
        }
    }
});

module.exports = mutation;
