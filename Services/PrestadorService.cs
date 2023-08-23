using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using XptoOrcamentos.API.Data;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace XptoOrcamentos.API.Services
{
    public class PrestadorService : IPrestadorService
    {
        private readonly AppDbContext _context;
        private readonly IOrdemServicoValidator _ordemServicoValidator;

        public PrestadorService(AppDbContext context, IOrdemServicoValidator ordemServicoValidator)
        {
            _context = context;
            _ordemServicoValidator = ordemServicoValidator;
        }

        public async Task<ReturnDTO<List<Prestador>>> GetAllAsync()
        {
            var result = new ReturnDTO<List<Prestador>>();
            try
            {
                result.Data = await _context.Prestadores.ToListAsync();
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Prestador>> GetByIdAsync(int id)
        {
            var result = new ReturnDTO<Prestador>();
            try
            {
                result.Data = await _context.Prestadores.FindAsync(id);
                result.Success = result.Data != null;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Prestador>> CreateAsync(CreatePrestadorViewModel viewModel)
        {
            var result = new ReturnDTO<Prestador>();
            try
            {
                var prestador = new Prestador
                {
                    CPF = viewModel.CPF,
                    Nome = viewModel.Nome,
                };

                await _context.Prestadores.AddAsync(prestador);
                await _context.SaveChangesAsync();

                result.Success = true;
                result.Data = prestador;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ReturnDTO<Prestador>> UpdateAsync(int id, CreatePrestadorViewModel viewModel)
        {
            if (_ordemServicoValidator.IsPrestadorUsedInOrdemServico(id))
            {
                return new ReturnDTO<Prestador>
                {
                    Success = false,
                    Message = "O prestador está sendo usado em uma ordem de serviço."
                };
            }

            var result = new ReturnDTO<Prestador>();
            try
            {
                var existingPrestador = await _context.Prestadores.FindAsync(id);
                if (existingPrestador == null)
                {
                    result.Success = false;
                    result.Message = "Prestador não encontrado";
                    return result;
                }

                existingPrestador.CPF = viewModel.CPF;
                existingPrestador.Nome = viewModel.Nome;

                await _context.SaveChangesAsync();

                result.Success = true;
                result.Data = existingPrestador;
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
            if (_ordemServicoValidator.IsPrestadorUsedInOrdemServico(id))
            {
                return new ReturnDTO<bool>
                {
                    Success = false,
                    Message = "O prestador está sendo usado em uma ordem de serviço."
                };
            }

            var result = new ReturnDTO<bool>();
            try
            {
                var existingPrestador = await _context.Prestadores.FindAsync(id);
                if (existingPrestador == null)
                {
                    result.Success = false;
                    result.Message = "Prestador não encontrado";
                    return result;
                }

                _context.Prestadores.Remove(existingPrestador);
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
