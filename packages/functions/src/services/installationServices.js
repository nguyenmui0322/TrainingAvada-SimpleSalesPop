import {getShopByShopifyDomain} from '@avada/core';
import Shopify from 'shopify-api-node';
import {addNotificationServices} from './shopifyServices';
import {addDefaultSettings} from '../repositories/settingsRepository';
import {createWebhookOrder} from '../helpers/utils/webhook';
/**
 *
 * @param {*} ctx
 */
export const afterInstall = async ctx => {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const shopData = await getShopByShopifyDomain(shopDomain);
    const shopify = new Shopify({
      shopName: shopData.shopifyDomain,
      accessToken: shopData.accessToken
    });

    await Promise.all([
      syncNotifications({shopify, shopData}),
      addDefaultSettings(shopData),
      createWebhookOrder(shopify)
    ]);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {Object} param0
 */
async function syncNotifications({shopify, shopData}) {
  const orderData = await shopify.order.list({limit: 30});

  await addNotificationServices({shopify, orderData, shopData});
}
