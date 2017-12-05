# frozen_string_literal: true

class NotificationCenter
  def initialize(client: Pusher, repository: ChannelsRepository.new)
    @client = client
    @repository = repository
  end

  def add_message(channel:, message:)
    if repository.occupied?(channel: channel)
      client.trigger(channel, 'message-created', text: message)
    end
  end

  private

  attr_reader :client, :repository
end
