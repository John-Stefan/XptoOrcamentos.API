namespace XptoOrcamentos.API.Services
{
    public interface IOrdemServicoValidator
    {
        bool IsClienteUsedInOrdemServico(int clienteId);
        bool IsPrestadorUsedInOrdemServico(int prestadorId);
    }
}

