<?php
//----------------------------------------------------------------------------
//  This is a simple PHP WebSockets (v13) server that accepts client
//  requests, ignores any data that they send, and responds randomly
//  (within every 10 seconds) with a formatted numeric value greater
//  than "3,000,000" (apologies to cultures that prefer 3.000.000!)
//
//  Note that for this script to work, any firewall must not block
//  incoming connections on the specified port (initially #33850)
// 
//  There are (at least) three possible ways to invoke this server:
//
//  (1) On any web server with PHP installed, the script can be launched
//      from the command line (optionally nohup'd in the background):
//
//      php count-server.php
//
//  (2) Alternatively, the script can be launched for a comparatively
//      short time by invoking it from the browser before trying to
//      connect using WebSockets.  The easiest way to do this is to use
//      AJAX.  See start-websockets.js for further instructions.
//
//  (3) On IIS running ASP.NET and PHP, it may be best to launch this
//      within Global.asax:
//
//      void Application_Start(object sender, EventArgs e) {
//        System.Diagnostics.ProcessStartInfo psi =
//          new System.Diagnostics.ProcessStartInfo(
//            "path_to\\php.exe", "path_to\\count-server.php");
//        psi.UseShellExecute = false; 
//        psi.WorkingDirectory = "path_to_php_directory";
//        System.Diagnostics.Process proc =
//          System.Diagnostics.Process.Start(psi); }
//      
//      However, on IIS 8+ it probably makes more sense to use the ASP.NET
//      4.5 server (C:\2320\done-deal\count-server\deault.ashx) instead!
//----------------------------------------------------------------------------

try
{
  ini_set('display_errors','1');
  error_reporting(E_ALL);
  echo 'count-server.php: '.$_SERVER['SERVER_NAME']."\r\n";flush();

  //  Test for an existing server (we don't need two!)

  $testClient = socket_create( AF_INET, SOCK_STREAM, SOL_TCP );
  socket_set_option( $testClient, SOL_SOCKET, SO_REUSEADDR, 1 );
  if ( socket_connect( $testClient, $_SERVER['SERVER_NAME'], 33850 ) )
  {
    socket_close($testClient);
    throw new Exception( 'ALREADY LISTENING: ' );
  }
  else // No existing server; try to start a new one
  {
    socket_close($testClient);

    $serverSocket = socket_create( AF_INET, SOCK_STREAM, SOL_TCP );
    socket_set_option( $serverSocket, SOL_SOCKET, SO_REUSEADDR, 1 );

    if ( ! is_resource($serverSocket) )
      throw new Exception('CREATE: ');
    if ( ! socket_bind( $serverSocket, $_SERVER['SERVER_NAME'], 33850 ) )
      throw new Exception('BIND: ');
    if ( ! socket_listen( $serverSocket, 31 ) )
      throw new Exception('LISTEN: ');

    $sockets = array($serverSocket);

    //  Initialize the made-up membership count to a number > 3,000,000,
    //  using the current time as a seed.  This will be incremented at
    //  random intervals less than 10 seconds apart.

    $now = getdate();
    $cnt = 3000000 + ( ( ($now['mon']*31) + $now['mday'] ) * 2000 ) +
            ($now['hours']*3600) + ($now['minutes']*60) + $now['seconds'];

    while ( true )
    {
      // Process sockets that are ready to be read

      $ready = $sockets;
      socket_select( $ready, $w=NULL, $e=NULL, 1 );
      foreach ( $ready as $sock )
      {
        if ( $sock === $serverSocket )
        {
          if( ( $newSock = socket_accept( $serverSocket ) ) === FALSE )
            throw new Exception('ACCEPT: ');
          else
          {
            socket_recv( $newSock, $head, 2048, 0 );
            preg_match( "/Sec-WebSocket-Version: (.*)\r\n/", $head, $results );
            if ( ( count($results) > 1 ) && ( $results[1] == 13 ) )
            {
              preg_match( "/Sec-WebSocket-Key: (.*)\r\n/", $head, $results );
              socket_write( $newSock,
                "HTTP/1.1 101 Switching Protocols\r\n".
                "Upgrade: websocket\r\n".
                "Connection: Upgrade\r\n".
                'Sec-WebSocket-Accept: '.
                base64_encode( sha1( $results[1].'258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true ) ).
                "\r\n\r\n" );
              $sockets[] = $newSock;
            }
          }
        }
        else // not a new socket
        {
          if ( socket_recv( $sock, $data, 2048, 0) === 0 )
            socket_close( $sock );
          // IGNORING THE "hello" MESSAGE FROM THE CLIENT
        }
      } // foreach ( $ready as $sock )

      //  Increment the membership count
   
      $response = number_format( $cnt++ );
      $len = strlen($response);
      $response = pack('CC', ( 0x80 | (0x1 & 0x0f) ), $len) . $response;
      $len += 2;
    
     // Process sockets that are ready to be written

      $ready = $sockets;
      socket_select( $r=NULL, $ready, $e=NULL, 1 );
      foreach ( $ready as $sock )
        if ( socket_write( $sock, $response, $len ) === FALSE )
          socket_close( $sock );

      //  Sleep for a random length of time <= 10 seconds

      sleep( rand( 1, 10 ) );

    } // while ( true )

  } // else // No existing server; try to start a new one
}
catch ( Exception $e )
{
  echo $e->getMessage() . socket_strerror(socket_last_error()) . "\r\n";
  flush();
}
?>
