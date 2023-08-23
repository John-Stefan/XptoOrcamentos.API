using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using XptoOrcamentos.API.Data;
using XptoOrcamentos.API.Models;
using XptoOrcamentos.API.Services;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Controllers
{
    [ApiController]
    [Route("v1/ordemServicos")]
    public class OrdemServicoController : ControllerBase
    {
        private readonly IOrdemServicoService _ordemServicoService;

        public OrdemServicoController(IOrdemServicoService ordemServicoService)
        {
            _ordemServicoService = ordemServicoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _ordemServicoService.GetAllAsync();
            return result.Success ? Ok(result) : BadRequest(new { message = result.Message });
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
        {
            var result = await _ordemServicoService.GetByIdAsync(id);

            if (!result.Success)            
                return result.Data == null ? NotFound() : BadRequest(new { message = result.Message });            

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateOrUpdateOrdemServicoViewModel viewModel)
        {
            if (!ModelState.IsValid)            
                return BadRequest(new { message = "Dados inválidos" });            

            var result = await _ordemServicoService.CreateOrUpdateAsync(viewModel);
            return ProcessResult(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] CreateOrUpdateOrdemServicoViewModel viewModel)
        {
            if (!ModelState.IsValid)            
                return BadRequest(new { message = "Dados inválidos" });            

            var result = await _ordemServicoService.CreateOrUpdateAsync(viewModel, id);
            return ProcessResult(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _ordemServicoService.DeleteAsync(id);

            if (result.Success)
                return NoContent();

            return BadRequest(new { message = result.Message });
        }

        private IActionResult ProcessResult(ReturnDTO<OrdemServico> result)
        {
            if (result.Success)            
                return Ok(result);            

            return BadRequest(new { message = result.Message });
        }
    }
}
