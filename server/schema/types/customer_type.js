const graphql = require ('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;


const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    since: { type: GraphQLString },
    revenue: { type: GraphQLString }
  }
})

module.exports = CustomerType;
