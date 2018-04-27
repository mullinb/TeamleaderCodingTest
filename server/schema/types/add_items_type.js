const graphql = require ('graphql');
const {
  GraphQLString,
  GraphQLInputObjectType,
} = graphql;


const AddItemsType = new GraphQLInputObjectType({
  name: 'AddItems',
  fields: {
    id: { type: GraphQLString },
    quantity: { type: GraphQLString }
  }
})

module.exports = AddItemsType;
