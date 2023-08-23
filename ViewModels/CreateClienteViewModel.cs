using System.ComponentModel.DataAnnotations;

namespace XptoOrcamentos.API.ViewModels
{
    public class CreateClienteViewModel
    {
        [Required(ErrorMessage = "O campo CNPJ é obrigatório.")]
        [RegularExpression(@"^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$", ErrorMessage = "CNPJ inválido.")]
        public string CNPJ { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "O nome deve conter apenas letras e espaços.")]
        public string Nome { get; set; }
    }
}
