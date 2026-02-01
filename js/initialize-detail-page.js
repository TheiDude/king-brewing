// (for all /CityName/skuNN/ detail pages)
// /js/initialize-detail-page.js

$.webshims.polyfill('json-storage');
Modernizr.load(
  [
    '/js/inventory-manager.js',
    '/js/deal-storage.js',
    '/js/buy-detail.js'
  ] );
