$(function(){

  //  Does the browser supports cross-window messaging?

  if ( ( !! window.addEventListener ) && Modernizr.postmessage )
  {
    //  Remember where came from; we only trust messages from ourselves!

    var okHost = window.location.protocol + '//' + window.location.host;

    //  Find all of the anchors in this help window that were
    //  previously deactivated.  Reactivate them, but whenever
    //  one is clicked, send its href attribute value to the
    //  main window, which should display the requested page
    //  instead of this window.

    $('a.helpTarget').
      removeClass('deactivated').
      click(
        function(e)
        {
          window.opener.postMessage(e.target.href,okHost);
        } );
  }

});
