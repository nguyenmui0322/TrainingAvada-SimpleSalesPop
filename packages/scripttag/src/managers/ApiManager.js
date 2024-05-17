import makeRequest from '../helpers/api/makeRequest';
import data from '../../../functions/.runtimeconfig.json';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `https://${data.app.base_url}/clientApi/notifications?shopifyDomain=${shopifyDomain}`
    );

    return {notifications, settings};
  };
}
