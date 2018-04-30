const _ = require('lodash');
const axios = require('axios');

const { ordersApiEndpoint,
  dispatchOrderEndpoint,
  productsApiEndpoint
} = require('../../APIEndpoints');

module.exports = {
  addItems,
  removeItem,
  updateItemQuantity,
  placeOrder
};

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
    let newItemList = [...thisOrder.items, ...items]
    return axios.patch(ordersApiEndpoint+orderid, {
      items: newItemList,
      total: _.sumBy(newItemList, function(item) { return parseFloat(item.total); }).toFixed(2)
    })
    .then((res) => {
      return res.data;
    })
  })
  .catch((err) => {
    console.log(err);
    return null;
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
      } else {
        subtotal = item.quantity * item['unit-price'];
        return false;
      }
    })
    return axios.patch(ordersApiEndpoint+orderid, {
      items: newItemList,
      total: _.sumBy(newItemList, function(item) { return parseFloat(item.total); }).toFixed(2)
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    })
  })
}

function updateItemQuantity(orderid, itemid, quantity) {
  return axios.get(ordersApiEndpoint+orderid)
  .then((res) => {
    var thisOrder = res.data;
    var subtotal;
    var newItemList = thisOrder.items.map((item) => {
      if (item['product-id']===itemid) {
        item.quantity = quantity;
        item.total = (item.quantity * item['unit-price']).toFixed(2);
      }
      return item;
    })
    return axios.patch(ordersApiEndpoint+orderid, {
      items: newItemList,
      total: _.sumBy(newItemList, function(item) { return parseFloat(item.total); }).toFixed(2)
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    })
  })
}

function placeOrder(orderid) {
  var thisOrder;
  return axios.get(ordersApiEndpoint + orderid)
  .then((res)=>{
    thisOrder = res.data;
    return axios.post(dispatchOrderEndpoint, thisOrder)
  })
  .then((res) => {
    return axios.delete(ordersApiEndpoint + orderid);
  })
  .then((res) => {
    return thisOrder;
  })
  .catch((err) => {
    console.log(err);
    return null;
  })
}
