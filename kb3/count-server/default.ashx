<%@ WebHandler Language="C#" Class="CountServer" Debug="true" %>
//----------------------------------------------------------------------------
//  This is a simple ASP.NET WebSockets (v13) server that accepts client
//  requests, ignores any data that they send, and responds randomly
//  (within every 10 seconds) with a formatted numeric value greater
//  than "3,000,000" (apologies to cultures that prefer 3.000.000!)
//
//  Note that for this script to work, any firewall must not block
//  incoming connections on the specified port (initially #33850)
//----------------------------------------------------------------------------

using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;

public class CountServer : IHttpHandler
{
  public CountServer()
  {
  }

  public void ProcessRequest( HttpContext ctx )
  {
    // Invoke Converse() to process this request asynchronously

    HttpContext.Current.AcceptWebSocketRequest( Converse );
  }

  public bool IsReusable
  {
    get { return true; }
  }

  public async Task Converse( AspNetWebSocketContext ctx )
  {
    //  We've received a connection.

    WebSocket ws = ctx.WebSocket;

    // Wait for a message
    // IGNORING THE "hello" MESSAGE FROM THE CLIENT

    ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[16]);
    WebSocketReceiveResult result = 
      await ws.ReceiveAsync(buffer, CancellationToken.None);

    //  Initialize the made-up membership count to a number > 3,000,000,
    //  using the current time as a seed.  This will be incremented at
    //  random intervals less than 10 seconds apart

    int cnt = 3000000 +
      ( ( (DateTime.Now.Month*31) + DateTime.Now.Day ) * 2000 ) +
      (DateTime.Now.Hour*3600) + (DateTime.Now.Minute*60) + DateTime.Now.Second;

    //  As long as the connection is open, increment the membership count and
    //  send the new value to the client, sleeping for a random length of time
    //  (<10 seconds) between each message.

    Random rand = new System.Random();
    while ( ws.State == WebSocketState.Open )
    {
      cnt++;
      await ws.SendAsync(
        new ArraySegment<byte>(Encoding.UTF8.GetBytes(cnt.ToString("N0"))),
        WebSocketMessageType.Text,
        true,
        CancellationToken.None );
      Thread.Sleep(rand.Next(10000));
    }
  }
}
