namespace SimpleDataImport.Core.Cache
{
    public interface IObjectCache<T> : IDisposable
    {
        Task<T> GetAsync(string id);
        Task<T> GetBinaryAsync(string id);
        Task SetAsync(string id, T data, TimeSpan expiry);
        Task SetBinaryAsync(string id, T data, TimeSpan expiry);
        Task ClearAllAsync();
        
    }
}