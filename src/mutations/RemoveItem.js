import gql from 'graphql-tag';

const mutation = gql`
  mutation RemoveItem ($orderid: String, $itemid: String) {
    removeItem(orderid: $orderid, itemid: $itemid) {
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
