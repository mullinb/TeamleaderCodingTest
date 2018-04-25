const graphql = require ('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;


const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  fields: {
    "product-id": { type: GraphQLString },
    quantity: { type: GraphQLString },
    "unit-price": { type: GraphQLString },
    total: { type: GraphQLString }
  }
})

module.exports = OrderItemType;
