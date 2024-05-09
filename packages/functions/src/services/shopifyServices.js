import {addNotification} from '../repositories/notificationsRepository';
import * as notificationServices from '../services/notificationServices';

export const addNotificationServices = async (shopify, orderData, shopData) => {
  const notifications = await notificationServices.getNotificationItem(
    shopify,
    orderData,
    shopData
  );

  await addNotification(notifications);
};
