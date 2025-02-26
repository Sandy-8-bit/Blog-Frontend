using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace Blog_frontend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");
            builder.RootComponents.Add<HeadOutlet>("head::after");

            // Set API Base Address to your backend URL
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("https://localhost:7061/") }); // Change to your API URL

            await builder.Build().RunAsync();
        }
    }
}
