using System.Collections.Generic;
using System.Threading.Tasks;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Services
{
    public interface IClienteService
    {
        Task<ReturnDTO<Cliente>> CreateAsync(CreateClienteViewModel cliente);
        Task<ReturnDTO<List<Cliente>>> GetAllAsync();
        Task<ReturnDTO<Cliente>> GetByIdAsync(int id);
        Task<ReturnDTO<Cliente>> UpdateAsync(int id, CreateClienteViewModel cliente);
        Task<ReturnDTO<bool>> DeleteAsync(int id);
    }
}
