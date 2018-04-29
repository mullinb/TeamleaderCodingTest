const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const axios = require('axios');

const { ordersApiEndpoint,
  dispatchOrderEndpoint,
  productsApiEndpoint } = require('../../APIEndpoints');

function addItems(orderid, items) {
  var products = [];
  return Promise.all([
    Promise.all(items.map((item) => {
      return axios.get(productsApiEndpoint+item.id)
        .then(res => {
          products.push(res.data);
        })
      })
    ),
    axios.get(ordersApiEndpoint+orderid)
  ])
  .then((res) => {
    let thisOrder = res[1].data;
    items = items.map((item) => {
      let product = _.find(products, { id: item.id });
      return {
        "product-id": item.id,
        "quantity": item.quantity,
        "unit-price": product.price,
        "total": (product.price * item.quantity).toFixed(2)
      }
    })
    let updatedOrderItems = [...thisOrder.items, ...items]
    let newTotal = (parseFloat(thisOrder.total) + _.sumBy(items, function(item) { return parseFloat(item.total); })).toFixed(2)
    return axios.patch(ordersApiEndpoint+orderid, {
      items: updatedOrderItems,
      total: newTotal
    })
    .then((res) => {
      return res.data;
    })
  })
  .catch((err) => {
    return err
  })
}

function removeItem(orderid, itemid) {
  return axios.get(ordersApiEndpoint+orderid)
  .then((res) => {
    var thisOrder = res.data;
    var subtotal;
    var newItemList = _.remove(thisOrder.items, (item) => {
      if (item['product-id']!==itemid) {
        return true;
      }
      else {
        subtotal = item.quantity * item['unit-price'];
        return false;
      }
    })
    console.log(newItemList);
    return axios.patch(ordersApiEndpoint+orderid, {
      items: newItemList,
      total: (thisOrder.total - subtotal).toFixed(2)
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err
    })
  })
}

function changeProductQuantity(orderid, itemid, quantity) {
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
  removeItem,
  changeProductQuantity,
  placeOrder,
  addItems
}
