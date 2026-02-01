$(function(){

  //  Most browsers use an XMLHttpRequest object with a withCredentials
  //  property. However, if we're using legacy IE (<10p4), the property
  //  will be missing, so we'll have to get an XDomainRequest instead.

  var cors = new XMLHttpRequest();
  if ( ! ( 'withCredentials' in cors ) )
    cors = new XDomainRequest();

  //  Open the connection to the third-party server.  This code uses
  //  chirpinator.com for the Internet version, or the local chirpinator
  //  when in-class.

  cors.open( 'GET', 'http://chirpinator' +
            ( ( window.location.href.indexOf('.com') < 0 ) ? '' : '.com' ) +
            '/search/?q=dealingtree');

  //  When the response comes back from the server, process it!
  //  IE cannot use addEventListener for the load event.

  cors.onload =
    function()
    {
      //  If the CORS object has a responseXML property, grab it.
      //  Otherwise, we're working in legacy IE.  IE9b+ has DOMParser,
      //  so we'll try to use it; otherwise we must create a DOM object
      //  and load it with the XML data from the responseText property.

      var dom = cors.responseXML;
      if ( ! dom )
      {
        if ( window.DOMParser )
          dom = (new DOMParser()).parseFromString(
                  cors.responseText, 'text/xml' );
        else
        {
          dom = new ActiveXObject('Microsoft.XMLDOM');
          dom.async = false;
          dom.loadXML(cors.responseText);
        }
      }

      //  Now that we have a DOM object (either from responseXML
      //  or loaded by ActiveX), pass the <entry> elements to our
      //  external function, and add the results to our #chirps
      //  element.

      document.getElementById("chirps").innerHTML += 
        ChirpsToHtml5( dom.getElementsByTagName('entry') );
    };

  //  Send the request to the third-party server over the
  //  previously-established connection.

  cors.send();

});
