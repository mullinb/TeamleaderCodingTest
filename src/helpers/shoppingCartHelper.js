export default function convertCartObjectToArray(shoppingCart) {
  var items = [];
  for (var p in shoppingCart) {
    if (shoppingCart[p].quantity > 0) {
      items.push({
        id: p,
        quantity: shoppingCart[p].quantity
      })
    }
  }
  return items;
}
