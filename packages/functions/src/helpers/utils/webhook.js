import data from '../../../../functions/.runtimeconfig.json';
/**
 *
 * @param {any} shopify
 */
export const createWebhookOrder = async shopify => {
  await shopify.webhook.create({
    address: `https://${data.app.base_url}/webhook/order/new`,
    topic: 'orders/create',
    format: 'json'
  });
};
