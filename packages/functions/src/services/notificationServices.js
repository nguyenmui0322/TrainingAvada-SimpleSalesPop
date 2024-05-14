/**
 *
 * @param {Object} param0
 * @returns
 */
export const getNotificationsItem = async ({shopify, shopData, orderData = []}) => {
  const shopID = shopData.id;
  const shopifyDomain = shopData.shopifyDomain;

  const productIds = [...new Set(orderData.map(order => order.line_items[0].product_id))];
  const products = await shopify.product.list({ids: productIds.join(',')});
  const productsDictionary = {};
  products.forEach(product => {
    productsDictionary[product.id] = product;
  });

  const notifications = orderData.map(order => {
    const {customer, shipping_address, line_items} = order;
    const city = shipping_address?.city ?? '';
    const country = shipping_address?.country ?? '';
    const firstName = customer?.first_name ?? '';
    const product_id = line_items[0].product_id;
    const products = productsDictionary[product_id];
    const productImage = products.image.src;
    const productName = products.title;
    const timestamp = new Date(order.created_at) || new Date();

    return {
      city,
      country,
      firstName,
      productImage,
      productName,
      shopID,
      shopifyDomain,
      timestamp
    };
  });

  return notifications;
};
