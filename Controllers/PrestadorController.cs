using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XptoOrcamentos.API.Services;
using XptoOrcamentos.API.ViewModels;

namespace XptoOrcamentos.API.Controllers
{  
    [ApiController]
    [Route("v1")]
    public class PrestadorController : ControllerBase
    {
        private readonly IPrestadorService _prestadorService;

        public PrestadorController(IPrestadorService prestadorService)
        {
            _prestadorService = prestadorService;
        }

        [HttpGet]
        [Route("prestadores")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _prestadorService.GetAllAsync();
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpGet]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _prestadorService.GetByIdAsync(id);

            if (result.Success)            
                return Ok(result);
            
            return result.Data == null ? NotFound(result) : BadRequest(result);
        }

        [HttpPost]
        [Route("prestadores")]
        public async Task<IActionResult> CreateAsync([FromBody] CreatePrestadorViewModel viewModel)
        {
            var result = await _prestadorService.CreateAsync(viewModel);
            return result.Success ? CreatedAtAction(nameof(GetByIdAsync), new { id = result.Data.Id }, result) : BadRequest(result);
        }

        [HttpPut]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] CreatePrestadorViewModel viewModel)
        {
            var result = await _prestadorService.UpdateAsync(id, viewModel);

            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpDelete]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _prestadorService.DeleteAsync(id);

            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
