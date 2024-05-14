import * as notificationsRepository from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';
/**
 *
 * @param {*} ctx
 */
export async function getNotifications(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const {limit, page, sort} = ctx.query;
    const {notifications, pageInfo} = await notificationsRepository.getNotifications({
      shopID,
      limit,
      page,
      sort
    });

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
