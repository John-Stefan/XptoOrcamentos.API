using System.ComponentModel.DataAnnotations;

namespace XptoOrcamentos.API.Models
{
    public class Prestador
    {
        public int Id { get; set; }

        [Required]
        public string CPF { get; set; }

        [Required]
        public string Nome { get; set; }
    }
}
