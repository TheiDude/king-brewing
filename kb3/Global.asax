<%@ Application Language="C#" %>
<script RunAt="server">

void Application_Start(object sender, EventArgs e)
{
  System.Diagnostics.ProcessStartInfo psi =
    new System.Diagnostics.ProcessStartInfo(
            "C:\\php\\php.exe", "C:\\2320\\done-deal\\count-server.php");
  psi.UseShellExecute = false; 
  psi.WorkingDirectory = "C:\\php";
  System.Diagnostics.Process proc = System.Diagnostics.Process.Start(psi);
}

</script>
