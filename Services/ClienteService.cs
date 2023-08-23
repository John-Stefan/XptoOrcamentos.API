using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using XptoOrcamentos.API.Data;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace XptoOrcamentos.API.Services
{
    public class ClienteService : IClienteService
    {
        private readonly AppDbContext _context;
        private readonly IOrdemServicoValidator _ordemServicoValidator;

        public ClienteService(AppDbContext context, IOrdemServicoValidator ordemServicoValidator)
        {
            _context = context;
            _ordemServicoValidator = ordemServicoValidator;
        }

        public async Task<ReturnDTO<List<Cliente>>> GetAllAsync()
        {
            var result = new ReturnDTO<List<Cliente>>();
            try
            {
                result.Data = await _context.Clientes.ToListAsync();
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Cliente>> GetByIdAsync(int id)
        {
            var result = new ReturnDTO<Cliente>();
            try
            {
                result.Data = await _context.Clientes.FindAsync(id);
                result.Success = result.Data != null;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Cliente>> CreateAsync(CreateClienteViewModel viewModel)
        {
            var result = new ReturnDTO<Cliente>();
            try
            {
                var cliente = new Cliente
                {
                    CNPJ = viewModel.CNPJ,
                    Nome = viewModel.Nome,
                };

                await _context.Clientes.AddAsync(cliente);
                await _context.SaveChangesAsync();

                result.Success = true;
                result.Data = cliente;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Cliente>> UpdateAsync(int id, CreateClienteViewModel viewModel)
        {
            if (_ordemServicoValidator.IsClienteUsedInOrdemServico(id))
            {
                return new ReturnDTO<Cliente>
                {
                    Success = false,
                    Message = "O cliente está sendo usado em uma ordem de serviço."
                };
            }

            var result = new ReturnDTO<Cliente>();
            try
            {
                var existingCliente = await _context.Clientes.FindAsync(id);
                if (existingCliente == null)
                {
                    result.Success = false;
                    result.Message = "Cliente não encontrado";
                    return result;
                }

                if (await _context.OrdemServicos.AnyAsync(o => o.ClienteId == id))
                {
                    result.Success = false;
                    result.Message = "Não é possível atualizar, o cliente está sendo usado em uma ordem de serviço.";
                    return result;
                }

                existingCliente.CNPJ = viewModel.CNPJ;
                existingCliente.Nome = viewModel.Nome;

                await _context.SaveChangesAsync();

                result.Success = true;
                result.Data = existingCliente;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<bool>> DeleteAsync(int id)
        {
            if (_ordemServicoValidator.IsClienteUsedInOrdemServico(id))
            {
                return new ReturnDTO<bool>
                {
                    Success = false,
                    Message = "O cliente está sendo usado em uma ordem de serviço."
                };
            }

            var result = new ReturnDTO<bool>();
            try
            {
                var existingCliente = await _context.Clientes.FindAsync(id);
                if (existingCliente == null)
                {
                    result.Success = false;
                    result.Message = "Cliente não encontrado";
                    return result;
                }

                if (await _context.OrdemServicos.AnyAsync(o => o.ClienteId == id))
                {
                    result.Success = false;
                    result.Message = "Não é possível excluir, o cliente está sendo usado em uma ordem de serviço.";
                    return result;
                }

                _context.Clientes.Remove(existingCliente);
                await _context.SaveChangesAsync();

                result.Success = true;
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
