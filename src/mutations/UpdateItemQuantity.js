import gql from 'graphql-tag';

const mutation = gql`
  mutation UpdateItemQuantity ($orderid: String!, $itemid: String!, $quantity:String!) {
  	updateItemQuantity(orderid: $orderid, itemid: $itemid, quantity: $quantity) {
      id,
      customerid,
      items {
        productid,
        description,
        quantity,
        unitprice,
        total
      }
      total
    }
  }
`

export default mutation;
