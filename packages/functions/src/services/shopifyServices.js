import {addNotification} from '../repositories/notificationsRepository';

export const addNotificationServices = async ({shopify, shopData}) => {
  const orders = await shopify.order.list({limit: 30});
  const shopID = shopData.id;
  const shopifyDomain = shopData.shopifyDomain;

  const notifications = await Promise.all(
    orders.map(async order => {
      const {customer, shipping_address, line_items} = order;
      const city = shipping_address.city;
      const country = shipping_address.country;
      const firstName = customer.first_name;
      const product_id = line_items[0].product_id;
      const products = await shopify.product.get(product_id);
      const productImage = products.image.src;
      const productName = products.title;
      const timestamp = new Date(order.created_at);

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
    })
  );

  await addNotification(notifications);
};
