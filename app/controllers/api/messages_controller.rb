# frozen_string_literal: true

module API
  class MessagesController < APIController
    def create
      NotificationsWorker.perform_async(channel, message)
      head 200
    end

    private

    def channel
      params[:channel]
    end

    def message
      params[:message]
    end
  end
end
