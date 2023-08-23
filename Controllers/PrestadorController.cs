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
            return result.Success ? Ok(result.Data) : BadRequest(result.Message);
        }

        [HttpGet]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _prestadorService.GetByIdAsync(id);

            if (result.Success)            
                return Ok(result.Data);
            
            return result.Data == null ? NotFound(result.Message) : BadRequest(result.Message);
        }

        [HttpPost]
        [Route("prestadores")]
        public async Task<IActionResult> CreateAsync([FromBody] CreatePrestadorViewModel viewModel)
        {
            var result = await _prestadorService.CreateAsync(viewModel);
            return result.Success ? CreatedAtAction(nameof(GetByIdAsync), new { id = result.Data.Id }, result.Data) : BadRequest(result.Message);
        }

        [HttpPut]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] CreatePrestadorViewModel viewModel)
        {
            var result = await _prestadorService.UpdateAsync(id, viewModel);

            if (result.Success)
                return Ok(result.Data);

            return BadRequest(result.Message);
        }

        [HttpDelete]
        [Route("prestadores/{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _prestadorService.DeleteAsync(id);

            if (result.Success)
                return NoContent();

            return BadRequest(result.Message);
        }
    }
}
