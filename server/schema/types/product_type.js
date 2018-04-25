const graphql = require ('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;


const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString }
  }
})

module.exports = ProductType;
