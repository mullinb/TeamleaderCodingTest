const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
// const OrderType = require('./order_type');
// const ProductType = require('./product_type');
// const CustomerType = require('./customer_type');
const axios = require('axios');

const { ordersApiEndpoint,
  dispatchOrderEndpoint } = require('../../data/APIEndpoints');

function addProduct( { id, productid, quantity }) {
  axios.put(ordersApiEndpoint+id, "hi")
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
  placeOrder
}
