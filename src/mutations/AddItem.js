import gql from 'graphql-tag';

const mutation = gql`
  mutation AddItems($orderid: String!, $items: [AddItems!]) {
    addItems(orderid: $orderid, items: $items) {
      id,
      customerid,
      items {
        productid,
        description
        quantity,
        total
      },
      total
    }
  }
`

export default mutation;
