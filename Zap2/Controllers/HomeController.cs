using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Zap2.Models;

namespace Zap2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string name, string room)
        {
            ViewBag.Name = name;
            ViewBag.Room = room;

            return View();
        }



        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}