// savings/initialize-savings-page.js
// $.webshims.setOptions('canvas', { type: 'flash' });
$.webshims.polyfill(
  Modernizr.inlinesvg ? 'json-storage' : 'canvas json-storage' );

Modernizr.load(
  [
    {
      test: Modernizr.inlinesvg,
      yep: 'savings-svg.js',
      nope: 'savings-canvas.js'
    }
  ] );
