const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType
} = graphql;

const OrderType = require('./types/order_type');
const OrderItemType = require('./types/order_item_type');
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
