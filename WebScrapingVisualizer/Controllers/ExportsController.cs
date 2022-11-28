using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebScrapingVisualizer.Data;
using WebScrapingVisualizer.Models;

namespace WebScrapingVisualizer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ExportsController : ControllerBase
    {
        private readonly JodidbContext jodidbContext;

        public ExportsController(JodidbContext jodidbContext)
        {
            this.jodidbContext = jodidbContext;
        }

        public IActionResult Index()
        {
            ResponseDataModel<List<Export>> data = new ResponseDataModel<List<Export>>();
            data.Data = jodidbContext.exports.ToList<Export>();
            data.Count = data.Data.Count;
            return Ok(data);
        }
        [Route("bycountry/{country}")]
        public IActionResult GetByCountry(string country)
        {
            ResponseDataModel<List<dynamic>> data = new ResponseDataModel<List<dynamic>>();
            data.Data = jodidbContext.exports
                .Where(c => c.country == country)
                .Select(c => new { c.month_year, c.value})
                .ToList<dynamic>();
            data.Count = data.Data.Count;
            return Ok(data);
        }

        [Route("bymonthyear/{monthyear}")]
        public IActionResult GetBymonthYear(string monthyear)
        {
            ResponseDataModel<List<dynamic>> data = new ResponseDataModel<List<dynamic>>();
            data.Data = jodidbContext.exports.Where(c => c.month_year == monthyear).Select(c => new {c.country, c.value}).ToList<dynamic>();
            data.Count = data.Data.Count;
            return Ok(data);
        }

        [Route("countries")]
        public IActionResult GetCountries()
        {
            ResponseDataModel<List<string>> data = new ResponseDataModel<List<string>>();
            data.Data = jodidbContext.exports.Select(c =>  c.country).Distinct().ToList<string>();
            data.Count = data.Data.Count;
            return Ok(data);
        }

        [Route("dates")]
        public IActionResult GetDates()
        {
            ResponseDataModel<List<string>> data = new ResponseDataModel<List<string>>();
            data.Data = jodidbContext.exports.Select(c => c.month_year).Distinct().ToList<string>();
            data.Count = data.Data.Count;
            return Ok(data);
        }

        [Route("permonthtotals")]
        public IActionResult Gettotals()
        {
            ResponseDataModel<List<dynamic>> data = new ResponseDataModel<List<dynamic>>();
            List<string> months = jodidbContext.exports.Select(c => c.month_year).Distinct().ToList<string>();
            data.Data = new List<dynamic>();
            foreach (var month in months)
            {
                int total = jodidbContext.exports.Where(e => e.month_year == month).Sum(e => e.value);
                data.Data.Add(new { month, total });
            }
            data.Count = data.Data.Count;
            return Ok(data);
        }

        [Route("countriestotals")]
        public IActionResult GetCountriesTotals()
        {
            ResponseDataModel<List<CountryExports>> data = new ResponseDataModel<List<CountryExports>>();
            List<string> countries = jodidbContext.exports.Select(c => c.country).Distinct().ToList<string>();
            data.Data = new List<CountryExports>();
            foreach (var country in countries)
            {
                CountryExports exports = new CountryExports();
                exports.Country = country;
                exports.Values = jodidbContext.exports.Where(e => e.country == country).Select(e => e.value).ToList();
                data.Data.Add(exports);
            }
            data.Count = data.Data.Count;
            return Ok(data);
        }
    }
}
