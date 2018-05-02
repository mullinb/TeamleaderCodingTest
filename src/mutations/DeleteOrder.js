import gql from 'graphql-tag';

const mutation = gql`
  mutation DeleteOrder($orderid: String!) {
    deleteOrder(orderid: $orderid) {
      id
    }
  }
`

export default mutation;
