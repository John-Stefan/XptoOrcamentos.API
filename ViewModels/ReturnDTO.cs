namespace XptoOrcamentos.API.ViewModels
{
    public class ReturnDTO<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
