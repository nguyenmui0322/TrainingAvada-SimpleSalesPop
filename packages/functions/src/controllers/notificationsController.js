import {getListNotificationRepo} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function getListNotification(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const {limit, page, sort} = ctx.query;
    const {notifications, pageInfo} = await getListNotificationRepo({shopID, limit, page, sort});

    ctx.body = {
      data: notifications,
      pageInfo: pageInfo,
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
