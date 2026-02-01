//  tags-worker.js runs in a web worker

//  tags-builder.js contains tagsBuilder()

importScripts('tags-builder.js');

//  When the worker receive a messages, assume it is a URL to pass to
//  tagsBuilder().  Along with the URL, pass a resultHandler function,
//  which sends the results to the main script.

addEventListener( 'message',
  function(e)
  {
    tagsBuilder( e.data, function(obj) { postMessage( obj ); } );
  } );
