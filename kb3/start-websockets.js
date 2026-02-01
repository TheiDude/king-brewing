//----------------------------------------------------------------------------
// This file can be used as an alternative method of starting a short-term
// WebSockets server, in the event that "php count-server.php" cannot be
// run from the command line.  It works by using AJAX to invoke that script
// using the web server BEFORE connecting to the WebSockets server inside
// websockets-counter.js.  To use this techinique, edit the file
// initialize-page-home.js and replace the filename "websockets-counter.js"
// in the Modernizr.load() arguments with this one ("start-websockets.js").
//----------------------------------------------------------------------------

(function()
{
  var started = false;
  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange =
    function()
    {
      if ( ! started )
      {
        started = true;
        Modernizr.load('websockets-counter.js');
      }
    };
  xhr.open('GET','/count-server.php',true);
  xhr.send(null);
})();
