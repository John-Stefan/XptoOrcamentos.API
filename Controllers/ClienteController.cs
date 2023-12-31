﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XptoOrcamentos.API.Services;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Controllers
{
    [ApiController]
    [Route("v1")]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        [Route("clientes")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _clienteService.GetAllAsync();

            if (result.Success)            
                return Ok(result);
            
            return BadRequest(result);
        }

        [HttpGet]
        [Route("clientes/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _clienteService.GetByIdAsync(id);

            if (result.Success)            
                return Ok(result);
            
            return NotFound(result);
        }

        [HttpPost]
        [Route("clientes")]
        public async Task<IActionResult> CreateAsync([FromBody] CreateClienteViewModel viewModel)
        {
            var result = await _clienteService.CreateAsync(viewModel);
            return result.Success ? CreatedAtAction(nameof(GetByIdAsync), new { id = result.Data.Id }, result) : BadRequest(result);
        }

        [HttpPut]
        [Route("clientes/{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] CreateClienteViewModel viewModel)
        {
            var result = await _clienteService.UpdateAsync(id, viewModel);

            if (result.Success)            
                return Ok(result);
            
            return BadRequest(result);
        }

        [HttpDelete]
        [Route("clientes/{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _clienteService.DeleteAsync(id);

            if (result.Success)            
                return Ok(result);
            
            return BadRequest(result);
        }
    }
}
