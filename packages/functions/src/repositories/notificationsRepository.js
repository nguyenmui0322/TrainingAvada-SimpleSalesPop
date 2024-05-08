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

export const getListNotificationRepo = async ({shopID, limit, page, sort}) => {
  limit = Number(limit);
  page = Number(page);

  let query = collection.where('shopID', '==', shopID);
  let notifications = (await query.get()).docs;

  const pageInfo = {
    hasPre: page > 1,
    hasNext: page < Math.ceil(notifications.length / limit)
  };

  if (sort) {
    query = query.orderBy('timestamp', sort.split(':')[1]);
  }
  if (limit) {
    const offset = (page - 1) * limit;
    query = query.limit(limit).offset(offset);
  }

  notifications = (await query.get()).docs;

  return {
    notifications: notifications.map(notification => {
      const time = notification.data().timestamp.toDate();
      return {
        id: notification.id,
        ...notification.data(),
        timestamp: time
      };
    }),
    pageInfo: pageInfo
  };
};

export const addNotification = async notifications => {
  await Promise.all(notifications.map(async notification => await collection.add(notification)));
};
