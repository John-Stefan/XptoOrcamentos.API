using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XptoOrcamentos.API.Data;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Services
{
    public class OrdemServicoService : IOrdemServicoService
    {
        private readonly AppDbContext _context;

        public OrdemServicoService(AppDbContext context)
        {
            _context = context;
        }

        private List<string> ValidateAsync(CreateOrUpdateOrdemServicoViewModel model, Cliente cliente, Prestador prestador)
        {
            var errors = new List<string>();

            if (model == null)
            {
                errors.Add("Dados inválidos");
                return errors;
            }

            if (cliente == null)            
                errors.Add("Cliente não encontrado");            

            if (prestador == null)            
                errors.Add("Prestador não encontrado");            

            return errors;
        }

        public async Task<ReturnDTO<OrdemServico>> CreateOrUpdateAsync(CreateOrUpdateOrdemServicoViewModel viewModel, int id = 0)
        {
            var result = new ReturnDTO<OrdemServico>();

            var clienteFK = await _context.Clientes.AsNoTracking().FirstOrDefaultAsync(x => x.Id == viewModel.ClienteId);
            var prestadorFK = await _context.Prestadores.AsNoTracking().FirstOrDefaultAsync(x => x.Id == viewModel.PrestadorId);

            var errors = ValidateAsync(viewModel, clienteFK, prestadorFK);

            if (errors.Any())
            {
                result.Success = false;
                result.Message = string.Join(", ", errors);
                return result;
            }

            OrdemServico ordemServico = id != 0
                ? await _context.OrdemServicos.FindAsync(id)
                : new OrdemServico();

            if (id != 0 && ordemServico == null)
            {
                result.Success = false;
                result.Message = "Ordem de serviço não encontrada";
                return result;
            }

            ordemServico.TituloServico = viewModel.TituloServico;
            ordemServico.ValorServico = viewModel.ValorServico;
            ordemServico.ClienteId = viewModel.ClienteId;
            ordemServico.PrestadorId = viewModel.PrestadorId;

            if (id == 0)            
                await _context.AddAsync(ordemServico);            

            await _context.SaveChangesAsync();

            ordemServico.Cliente = clienteFK;
            ordemServico.Prestador = prestadorFK;

            result.Success = true;
            result.Message = id != 0 ? "Ordem de serviço atualizada com sucesso" : "Ordem de serviço criada com sucesso";
            result.Data = ordemServico;

            return result;
        }


        public async Task<ReturnDTO<bool>> DeleteAsync(int id)
        {
            var result = new ReturnDTO<bool>();

            var ordemServico = await _context.OrdemServicos.FindAsync(id);

            if (ordemServico == null)
            {
                result.Success = false;
                result.Message = "Ordem de serviço não encontrada";
                return result;
            }

            _context.OrdemServicos.Remove(ordemServico);

            await _context.SaveChangesAsync();

            result.Success = true;
            result.Message = "Ordem de serviço deletada com sucesso";
            return result;
        }


        public async Task<ReturnDTO<List<OrdemServico>>> GetAllAsync()
        {
            var result = new ReturnDTO<List<OrdemServico>>();

            try
            {
                result.Data = await _context.OrdemServicos
                    .Include(o => o.Cliente)
                    .Include(o => o.Prestador)
                    .AsNoTracking()
                    .ToListAsync();

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public async Task<ReturnDTO<OrdemServico>> GetByIdAsync(int id)
        {
            var result = new ReturnDTO<OrdemServico>();

            try
            {
                result.Data = await _context
                    .OrdemServicos
                    .Include(o => o.Cliente) 
                    .Include(o => o.Prestador)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id);

                result.Success = result.Data != null;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }        
    }
}
