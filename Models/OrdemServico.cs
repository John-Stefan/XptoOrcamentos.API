using System;

namespace XptoOrcamentos.API.Models
{
    public class OrdemServico
    {
        public int Id { get; set; }
        public string TituloServico { get; set; }
        public DateTime DataExecucao { get; set; } = DateTime.Now;
        public decimal ValorServico { get; set; }

        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; } 
                
        public int PrestadorId { get; set; }
        public virtual Prestador Prestador { get; set; }
    }
}
