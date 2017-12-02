# frozen_string_literal: true

class NotificationsWorker
  include Sidekiq::Worker

  def perform(channel, message)
    NotificationCenter.new.add_message(channel: channel, message: message)
  end
end
