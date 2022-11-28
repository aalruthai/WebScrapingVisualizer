namespace WebScrapingVisualizer.Models
{
    public class CountryExports
    {
        public CountryExports()
        {
            Values = new List<int>();
        }
        public string Country { get; set; }
        public List<int> Values { get; set; }
    }
}
