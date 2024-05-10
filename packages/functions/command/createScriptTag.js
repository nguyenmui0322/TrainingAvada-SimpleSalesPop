const Shopify = require('shopify-api-node');
(async () => {
  const shopify = new Shopify({
    shopName: 'quickstart-9e2ae7f9.myshopify.com',
    accessToken: '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'
  });
  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);
  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  // });
  // await shopify.scriptTag.delete(235403968673);
})();
// [
//   {
//     id: 222875943000,
//     src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js',
//     event: 'onload',
//     created_at: '2024-05-10T03:12:59-04:00',
//     updated_at: '2024-05-10T03:12:59-04:00',
//     display_scope: 'all',
//     cache: false
//   }
// ]
