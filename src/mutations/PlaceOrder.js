import gql from 'graphql-tag';

const mutation = gql`
  mutation PlaceOrder($orderid: String!) {
    placeOrder(orderid: $orderid) {
      id,
      customername,
      total
    }
  }
`

export default mutation;
