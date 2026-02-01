// (home) /initialize-home-page.js
$.webshims.polyfill('geolocation json-storage');
Modernizr.load(
  [
    '/js/inventory-manager.js',
    'buy-home.js',
    'market-selection.js', //Ex5.1
    '/js/deal-storage.js', //Ex5.3
    'haversine-miles.js', //Ex6.2
    'market-geolocation.js', //Ex6.2
    {
      test: Modernizr.draganddrop,
      yep: 'deal-dragndrop.js' //Ex7.4(self)
    },
    {
      test: window.XMLHttpRequest,
      nope: '/js/xmlhttprequest.js' //Ex8.1b
    },
    {
      test: (!!window.WebSocket), // Modernizr.websockets is buggy!
      yep: 'websockets-counter.js' //Ex8.1c
    },
    {
      test: Modernizr.webworkers,
      yep:
        [
          'tags-builder.js', //Ex8.1d
          'tags-data-to-html.js', //Ex8.1d
          'tags-launcher.js' //Ex8.1d
        ]
    }
  ] );
