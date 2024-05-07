import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

export const getSettingsRepo = async shopID => {
  const {docs: settings} = await collection.where('shopID', '==', shopID).get();

  return presentDataAndFormatDate(settings[0]);
};

export const updateSettingsRepo = async ({shopID, data}) => {
  const settings = await getSettingsRepo(shopID);

  await collection.doc(settings.id).update(data);
};
