const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList
} = graphql;

const OrderType = require('./types/order_type');
const OrderItemType = require('./types/order_item_type');
const AddItemsType = require('./types/add_items_type');

const OrderService = require('../services/order');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: OrderType,
            args: {
              id: { type: GraphQLString },
              productid: { type: GraphQLString },
              quantity: { type: GraphQLString }
            },
            resolve(parentValue, { id, productid, quantity }) {
              return OrderService.addProduct({ id, productid, quantity });
            }
        },
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
        removeProduct: {
          type: OrderType,
          args: {
            id: { type: GraphQLString },
            productid: { type: GraphQLString }
          },
          resolve(parentValue, { id, productid }) {
            return OrderService.removeProduct({ id, productid });
          }
        },
        changeProductQuantity: {
          type: OrderType,
          args: {
            id: { type: GraphQLString },
            productid: { type: GraphQLString },
            quantity: { type: GraphQLString }
          },
          resolve(parentValue, { id, productid, quantity }) {
            return OrderService.changeProductQuantity({ id, productid, quantity });
          }
        },
        placeOrder: {
          type: OrderType,
          args: { id: { type: GraphQLString } },
          resolve(parentValue, { id }) {
            return OrderService.placeOrder({ id });
          }
        }
    }
});

module.exports = mutation;
