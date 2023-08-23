using System.Linq;
using XptoOrcamentos.API.Data;

namespace XptoOrcamentos.API.Services
{
    public class OrdemServicoValidator : IOrdemServicoValidator
    {
        private readonly AppDbContext _context;

        public OrdemServicoValidator(AppDbContext context)
        {
            _context = context;
        }

        public bool IsClienteUsedInOrdemServico(int clienteId)
        {
            return _context.OrdemServicos.Any(o => o.ClienteId == clienteId);
        }

        public bool IsPrestadorUsedInOrdemServico(int prestadorId)
        {
            return _context.OrdemServicos.Any(o => o.PrestadorId == prestadorId);
        }
    }
}
