using Microsoft.EntityFrameworkCore;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Vendor> Vendors { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<RequestLine> RequestLines { get; set; }



        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }



        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            if (!builder.IsConfigured)
            {
                builder.UseSqlServer(
                    "server=localhost//sqlexpress;database=prscapstonedbfinal;trusted_connection=true;");
            }

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(e => e.HasIndex(x => x.Id).IsUnique(true));
            builder.Entity<User>(e => e.HasIndex(x => x.Username).IsUnique(true));

            builder.Entity<Vendor>(e => e.HasIndex(x => x.Id).IsUnique(true));
            builder.Entity<Vendor>(e => e.HasIndex(x => x.Code).IsUnique(true));

            builder.Entity<Product>(e => e.HasIndex(x => x.Id).IsUnique(true));
            builder.Entity<Product>(e => e.HasIndex(x => x.PartNbr).IsUnique(true));

            builder.Entity<Request>(e => e.HasIndex(x => x.Id).IsUnique(true));

            builder.Entity<RequestLine>(e => e.HasIndex(x => x.Id).IsUnique(true));
        }


    }
}