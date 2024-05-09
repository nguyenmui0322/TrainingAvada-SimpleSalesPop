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
    const orderData = await shopify.order.list({limit: 30});

    await Promise.all([
      addNotificationServices(shopify, orderData, shopData),
      addDefaultSettings(shopData)
    ]);
  } catch (error) {
    console.log(error);
  }
};
