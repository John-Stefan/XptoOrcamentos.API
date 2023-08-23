using Microsoft.EntityFrameworkCore;
using XptoOrcamentos.API.Models;

namespace XptoOrcamentos.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<OrdemServico> OrdemServicos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Prestador> Prestadores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }     
    }
}
