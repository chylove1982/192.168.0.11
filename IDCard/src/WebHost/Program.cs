using Nm.Lib.Host.Web;

namespace Nm.Module.IDCard.WebHost
{
    public class Program
    {
        public static void Main(string[] args)
        {
            new HostBuilder().Run<Startup>(args);
        }
    }
}
