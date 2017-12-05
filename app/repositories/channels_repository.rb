# frozen_string_literal: true

class ChannelsRepository
  def initialize(cache: Redis.current)
    @cache = cache
  end

  def store(channel:)
    cache.set(channel_key(channel), true, nx: true)
  end

  def occupied?(channel:)
    cache.get(channel_key(channel))
  end

  def delete(channel:)
    cache.del(channel_key(channel))
  end

  private

  CHANNEL_KEY = 'channels'

  attr_reader :cache

  def channel_key(channel)
    "#{CHANNEL_KEY}:#{channel}"
  end
end
