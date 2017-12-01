redis = Redis.new(url: ENV.fetch('REDIS_URL'))
Redis.current = redis
