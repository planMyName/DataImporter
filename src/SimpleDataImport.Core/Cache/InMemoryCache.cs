using System.Runtime.Caching;

namespace SimpleDataImport.Core.Cache
{
    public class InMemoryCache<T> : IObjectCache<T>
    {
        private MemoryCache _cache;

        public InMemoryCache()
        {
            _cache = MemoryCache.Default;
        }

        public Task<T> GetAsync(string firmId)
        {
            var ldUser = (T)_cache.Get(firmId);
            
            return Task.FromResult(ldUser);
        }

        public Task<T> GetBinaryAsync(string id)
        {
            var lduser = (T)_cache.Get(id);
            return Task.FromResult(lduser);
        }

        public Task SetAsync(string firmId, T user, TimeSpan expiry)
        {
            if (user == null) return Task.CompletedTask;

            _cache.Set(firmId, user, GetCacheItemPolicy(expiry));
            return Task.CompletedTask;
        }

        public Task SetBinaryAsync(string id, T data, TimeSpan expiry)
        {
            if (data == null) return Task.CompletedTask;

            _cache.Set(id, data, GetCacheItemPolicy(expiry));
            return Task.CompletedTask;
        }

        public Task ClearAllAsync()
        {
            const int HundredPercentClearance = 100;
            _cache.Trim(HundredPercentClearance);

            return Task.CompletedTask;
        }

        private CacheItemPolicy GetCacheItemPolicy(TimeSpan timeSpan)
        {
            return new CacheItemPolicy
            {
                AbsoluteExpiration = DateTimeOffset.Now.Add(timeSpan)
            };
        }

        public void Dispose()
        {
            _cache?.Dispose();
        }
    }
}
