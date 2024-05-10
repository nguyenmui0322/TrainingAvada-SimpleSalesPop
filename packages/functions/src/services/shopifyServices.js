import * as notificationsRepository from '../repositories/notificationsRepository';
import * as notificationServices from '../services/notificationServices';

export const addNotificationServices = async (shopify, orderData, shopData) => {
  const notifications = await notificationServices.getNotificationsItem(
    shopify,
    orderData,
    shopData
  );

  await notificationsRepository.addNotifications(notifications);
};
