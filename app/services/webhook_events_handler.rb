# frozen_string_literal: true

class WebhookEventsHandler
  def self.call(events:)
    new(events: events).call
  end

  def initialize(events:, repository: ChannelsRepository.new)
    @events = events
    @repository = repository
  end

  def call
    events.each { |event| handle_event(event) }
  end

  private

  attr_reader :events, :repository

  def handle_event(event)
    if event['name'] == 'channel_occupied'
      repository.store(channel: event['channel'])
    else
      repository.delete(channel: event['channel'])
    end
  end
end
