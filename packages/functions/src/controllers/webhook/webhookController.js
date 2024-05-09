import {getShopByShopifyDomain} from '@avada/core';
import * as notificationsRepository from '../../repositories/notificationsRepository';
import Shopify from 'shopify-api-node';
import * as notificationServices from '../../services/notificationServices';

export const listenNewOrder = async ctx => {
  try {
    const orderData = [ctx.req.body];
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shopData = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shopData.accessToken
    });
    const notifications = await notificationServices.getNotificationItem(
      shopify,
      orderData,
      shopData
    );
    await notificationsRepository.addNotification(notifications);

    ctx.body = {
      success: true
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false
    };
  }
};
