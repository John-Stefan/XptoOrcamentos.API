using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Services
{
    public interface IOrdemServicoService
    {
        Task<ReturnDTO<List<OrdemServico>>> GetAllAsync();
        Task<ReturnDTO<OrdemServico>> GetByIdAsync(int id);
        Task<ReturnDTO<OrdemServico>> CreateOrUpdateAsync(CreateOrUpdateOrdemServicoViewModel viewModel, int id = 0);
        Task<ReturnDTO<bool>> DeleteAsync(int id);
    }

}
