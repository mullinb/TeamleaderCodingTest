import gql from 'graphql-tag';

const query = gql`
  {
    orders {
      id,
      customerid,
      items {
        productid
        description
        quantity
        unitprice
      }
      total
    }
  }
`
export default query;
