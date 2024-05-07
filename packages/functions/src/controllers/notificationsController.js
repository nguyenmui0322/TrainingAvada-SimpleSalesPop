import {getListNotificationRepo} from '@functions/repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function getListNotification(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const notifications = await getListNotificationRepo(shopID);

    ctx.body = {
      data: notifications,
      success: true
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      success: false
    };
  }
}
