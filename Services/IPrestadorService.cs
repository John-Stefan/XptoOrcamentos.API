using System.Collections.Generic;
using System.Threading.Tasks;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Services
{
    public interface IPrestadorService
    {
        Task<ReturnDTO<Prestador>> CreateAsync(CreatePrestadorViewModel cliente);
        Task<ReturnDTO<List<Prestador>>> GetAllAsync();
        Task<ReturnDTO<Prestador>> GetByIdAsync(int id);
        Task<ReturnDTO<Prestador>> UpdateAsync(int id, CreatePrestadorViewModel cliente);
        Task<ReturnDTO<bool>> DeleteAsync(int id);
    }
}
