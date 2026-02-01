$(function(){

  //  Does the browser supports cross-window messaging?

  if ( ( !! window.addEventListener ) && Modernizr.postmessage )
  {
    //  Remember where came from; we only trust messages from ourselves!

    var okHost = window.location.protocol + '//' + window.location.host;

    //  Listen for messages.  If the message is from ourselves,
    //  assume it is a URL that we should display in this window.

    window.addEventListener( 'message',
      function(e)
      {
        if ( e.origin == okHost )
          window.location.href = e.data;
      } );
  }

});
