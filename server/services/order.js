const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const axios = require('axios');

const { ordersApiEndpoint,
  dispatchOrderEndpoint,
  productsApiEndpoint } = require('../../data/APIEndpoints');

function addProduct( { id, productid, quantity }) {
}

function addItems(orderid, items) {
  var products = [];
  Promise.all(items.map((item) => {
    return axios.get(productsApiEndpoint+item.id)
      .then(res => {
        products.push(res.data);
      })
  }))
  .then(() => {
    items = items.map((item) => {
      let product = _.find(products, { id: item.id });
      return {
        "product-id": item.id,
        "quantity": item.quantity,
        "unit-price": product.price,
        "total": (product.price * item.quantity).toFixed(2)
      }
    })
    return axios.patch(ordersApiEndpoint+orderid, {
      
    })
  })
}

function removeProduct() {
  axios.put(ordersApiEndpoint)
}

function changeProductQuantity({ id }) {
  axios.put(ordersApiEndpoint + id, )
}

function placeOrder({ id }) {
  if (dispatchOrderEndpoint) {
    axios.post(dispatchOrderEndpoint, id)
  } else {
    axios.get(ordersApiEndpoint + id)
    .then((res) => {
      console.log("The following order was just dispatched!\n" + res.data.order);
    })
  }
}

module.exports = {
  addProduct,
  removeProduct,
  changeProductQuantity,
  placeOrder,
  addItems
}
