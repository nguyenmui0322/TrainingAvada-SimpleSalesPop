import {getShopByShopifyDomain} from '@avada/core';
import * as notificationsRepository from '../../repositories/notificationsRepository';
import Shopify from 'shopify-api-node';
import * as notificationServices from '../../services/notificationServices';
/**
 *
 * @param {*} ctx
 */
export const listenNewOrder = async ctx => {
  try {
    const orderList = [ctx.req.body];
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shopData = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shopData.accessToken
    });
    const notifications = await notificationServices.getNotificationsItem({
      shopify,
      orderData: orderList,
      shopData
    });
    await notificationsRepository.addNotifications(notifications);

    ctx.body = {
      success: true
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false
    };
  }
};
