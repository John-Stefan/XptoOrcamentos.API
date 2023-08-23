using System.ComponentModel.DataAnnotations;

namespace XptoOrcamentos.API.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        public string CNPJ { get; set; }

        [Required]
        public string Nome { get; set; }
    }
}
