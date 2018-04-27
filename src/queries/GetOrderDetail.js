import gql from 'graphql-tag';

export const query = gql`
  query order($id: String!) {
    order(id: $id) {
      id,
      customerid,
      items {
        productid
        description,
        quantity,
        unitprice,
        total
      }
      total
    }
  }
`

export const options = {
  options: (ownProps) => {
    return ({
      variables: {
        id: ownProps.id
      }
    })
  }
}
