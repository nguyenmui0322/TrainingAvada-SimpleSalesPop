import * as notificationsRepository from '../../repositories/notificationsRepository';
import * as settingsRepository from '../../repositories/settingsRepository';

import {getShopByShopifyDomain} from '@avada/core';

export const getNotifications = async ctx => {
  try {
    const {shopifyDomain} = ctx.req.query;
    const shopData = await getShopByShopifyDomain(shopifyDomain);
    const shopID = shopData.id;
    const [{notifications}, settings] = await Promise.all([
      notificationsRepository.getNotifications({shopID}),
      settingsRepository.getSettings(shopID)
    ]);

    ctx.body = {
      settings,
      notifications
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false
    };
  }
};
