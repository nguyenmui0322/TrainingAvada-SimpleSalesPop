import * as notificationsRepository from '../repositories/notificationsRepository';
import * as notificationServices from '../services/notificationServices';
/**
 *
 * @param {Shopify} shopify
 * @param {Array} orderData
 * @param {Object} shopData
 */
export const addNotificationServices = async ({shopify, orderData, shopData}) => {
  const notifications = await notificationServices.getNotificationsItem({
    shopify,
    orderData,
    shopData
  });

  await notificationsRepository.addNotifications(notifications);
};
