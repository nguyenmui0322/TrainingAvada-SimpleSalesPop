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
    // const {notifications, settings} = {
    //   settings: {
    //     id: 'CHpMwNI15bDHdSuHlMRo',
    //     displayDuration: 5,
    //     includedUrls: '',
    //     maxPopsDisplay: 20,
    //     firstDelay: 10,
    //     excludedUrls: '',
    //     allowShow: 'all',
    //     shopID: '5vu4bT4XbAdmGrYqxFIX',
    //     popsInterval: 2,
    //     hideTimeAgo: false,
    //     position: 'top-right',
    //     truncateProductName: false
    //   },
    //   notifications: [
    //     {
    //       id: '1CeP1LHkWXD3oFXrWCQP',
    //       country: 'Vietnam',
    //       firstName: 'Ayumu',
    //       productImage:
    //         'https://cdn.shopify.com/s/files/1/0590/3751/5864/files/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1714009001',
    //       city: 'abc',
    //       shopID: '5vu4bT4XbAdmGrYqxFIX',
    //       shopifyDomain: 'quickstart-9e2ae7f9.myshopify.com',
    //       productName: 'The Collection Snowboard: Oxygen',
    //       timestamp: '2024-05-08T04:31:06.000Z'
    //     }
    //   ]
    // };

    return {notifications, settings};
  };
}
