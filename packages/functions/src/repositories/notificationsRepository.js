import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

export async function getListNotificationRepo(shopID) {
  const query = collection.where('shopID', '==', shopID);

  const {docs: notifications} = await query.get();

  return notifications.map(notification => {
    const time = notification.data().timestamp.toDate();
    return {
      id: notification.id,
      ...notification.data(),
      timestamp: time
    };
  });
}
