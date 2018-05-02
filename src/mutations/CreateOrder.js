import gql from 'graphql-tag';

const mutation = gql`
  mutation CreateOrder($customerid: String!, $items: [AddItems!]) {
    createOrder(customerid: $customerid, items: $items) {
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
