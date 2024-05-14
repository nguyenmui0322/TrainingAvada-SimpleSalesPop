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
  // await shopify.scriptTag.delete(222986141784);
})();
// [
//   {
//     id: 222986141784,
//     src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js',
//     event: 'onload',
//     created_at: '2024-05-12T22:07:35-04:00',
//     updated_at: '2024-05-12T22:07:35-04:00',
//     display_scope: 'all',
//     cache: false
//   }
// ]
