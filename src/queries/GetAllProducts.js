import gql from 'graphql-tag';

const query = gql`
  {
    products {
      id,
      description,
      category,
      price
    }
  }
`
export default query;
