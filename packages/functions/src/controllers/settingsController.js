import * as settingsRepository from '../repositories/settingsRepository';
import {getCurrentShop} from '../helpers/auth';
/**
 *
 * @param {*} ctx
 */
export const getSettings = async ctx => {
  try {
    const shopID = getCurrentShop(ctx);
    const settings = await settingsRepository.getSettings(shopID);

    ctx.body = {
      data: settings,
      success: true
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      success: false
    };
  }
};
/**
 *
 * @param {*} ctx
 */
export const updateSettings = async ctx => {
  try {
    const shopID = getCurrentShop(ctx);
    const {data} = ctx.req.body;
    await settingsRepository.updateSettings({shopID, data});

    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      success: false
    };
  }
};
