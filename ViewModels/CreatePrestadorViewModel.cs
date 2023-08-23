using System.ComponentModel.DataAnnotations;

namespace XptoOrcamentos.API.ViewModels
{
    public class CreatePrestadorViewModel
    {
        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido.")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "O nome deve conter apenas letras e espaços.")]
        public string Nome { get; set; }
    }
}
