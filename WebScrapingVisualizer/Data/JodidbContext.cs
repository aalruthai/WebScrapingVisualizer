using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace WebScrapingVisualizer.Data
{
    public class JodidbContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DbSet<Export> exports { get; set; }

        public string DbPath { get; set; }
        public JodidbContext(IConfiguration configuration)
        {
            DbPath = "jodidb.db";
            Configuration = configuration;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(Configuration.GetConnectionString("Default"));
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Export>().HasNoKey();
            base.OnModelCreating(modelBuilder);
        }
    }
}
