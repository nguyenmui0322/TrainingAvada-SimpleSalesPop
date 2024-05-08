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

    await Promise.all([addNotificationServices({shopify, shopData}), addDefaultSettings(shopData)]);
  } catch (error) {
    console.log(error);
  }
};
