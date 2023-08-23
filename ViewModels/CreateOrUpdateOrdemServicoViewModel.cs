using System;
using System.ComponentModel.DataAnnotations;
using XptoOrcamentos.API.Models;

namespace XptoOrcamentos.API.ViewModels
{
    public class CreateOrUpdateOrdemServicoViewModel
    {
        [Required]
        public string TituloServico { get; set; }
        [Required]
        public decimal ValorServico { get; set; }
        [Required]
        public int ClienteId { get; set; }
        [Required]
        public int PrestadorId { get; set; }
        [Required]
        public DateTime DataExecucao { get; set; }
    }
}
