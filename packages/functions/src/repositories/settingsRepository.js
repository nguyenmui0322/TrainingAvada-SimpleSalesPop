import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';
import defaultSettings from '../helpers/defaultSettings';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');
/**
 *
 * @param {string} shopID
 * @returns {Object}
 */
export const getSettings = async shopID => {
  const {docs: settings} = await collection.where('shopID', '==', shopID).get();

  return presentDataAndFormatDate(settings[0]);
};
/**
 *
 * @param {string} shopID
 * @param {Object} data
 */
export const updateSettings = async ({shopID, data}) => {
  const settings = await getSettings(shopID);

  await collection.doc(settings.id).update(data);
};
/**
 *
 * @param {Object} shopData
 */
export const addDefaultSettings = async shopData => {
  const shopID = shopData.id;

  await collection.add({...defaultSettings, shopID});
};
