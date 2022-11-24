using System.Text.Json;
using StackExchange.Redis;

namespace SimpleDataImport.Core.Cache
{
    internal class RedisCache<T> : IObjectCache<T>
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _db;
        private readonly string _objectTypeName;

        public RedisCache(IConnectionMultiplexer redis)
        {
            _redis = redis;
            _db = _redis.GetDatabase();
            _objectTypeName = typeof(T).FullName;
        }
        
        public async Task<T> GetAsync(string firmId)
        {
            var value = await _db.StringGetAsync(GetKey(firmId));
            return value.IsNull ? default : JsonSerializer.Deserialize<T>(value);
        }

        public Task<T> GetBinaryAsync(string id)
        {
            throw new NotImplementedException();
        }

        private RedisKey GetKey(string firmId)
        {
            var key = $"{firmId}:{_objectTypeName}";
            return key;
        }

        public async Task SetAsync(string firmId, T data, TimeSpan expiry)
        {
            await _db.StringSetAsync(GetKey(firmId), JsonSerializer.Serialize(data), expiry);
        }

        public Task SetBinaryAsync(string id, T data, TimeSpan expiry)
        {
            throw new NotImplementedException();
        }

        public Task ClearAllAsync()
        {
            // no implementation as it was required only for unit test purpose.
            return Task.CompletedTask;
        }
        
        public void Dispose()
        {
            _redis?.Dispose();
        }
    }
}