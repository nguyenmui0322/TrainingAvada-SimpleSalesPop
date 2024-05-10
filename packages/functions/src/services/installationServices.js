import {getShopByShopifyDomain} from '@avada/core';
import Shopify from 'shopify-api-node';
import {addNotificationServices} from './shopifyServices';
import {addDefaultSettings} from '../repositories/settingsRepository';

export const afterInstall = async ctx => {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const shopData = await getShopByShopifyDomain(shopDomain);
    const shopify = new Shopify({
      shopName: shopData.shopifyDomain,
      accessToken: shopData.accessToken
    });

    await Promise.all([syncNotifications({shopify, shopData}), addDefaultSettings(shopData)]);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} param0
 */
async function syncNotifications({shopify, shopData}) {
  const orderData = await shopify.order.list({limit: 30});

  await addNotificationServices(shopify, orderData, shopData);
}
