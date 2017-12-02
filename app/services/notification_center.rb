# frozen_string_literal: true

class NotificationCenter
  def initialize(client: Pusher)
    @client = client
  end

  def add_message(channel:, message:)
    client.trigger(channel, 'message-created', { text: message })
  end

  private

  attr_reader :client
end
