# frozen_string_literal: true

class ChannelsRepository
  def initialize(cache: Redis.current)
    @cache = cache
  end

  def store(channel:, device:)
    return if device(channel: channel, socket_id: device.socket_id)
    devices = devices(channel: channel)
    devices << device
    cache.set(channel_key(channel), devices.to_json)
  end

  def delete(channel:, socket_id:)
    devices = devices(channel: channel).reject do |device|
      device.socket_id == socket_id
    end

    cache.set(channel_key(channel), devices.to_json)
  end

  def device(channel:, socket_id:)
    devices(channel: channel).find do |device|
      device.socket_id == socket_id
    end
  end

  def devices(channel:)
    devices = cache.get(channel_key(channel))
    return [] unless devices.present?
    JSON.parse(devices).map { |d| Device.new(d) }
  end

  private

  CHANNEL_KEY = 'channels'

  attr_reader :cache

  def channel_key(channel)
    "#{CHANNEL_KEY}:#{channel}"
  end
end
