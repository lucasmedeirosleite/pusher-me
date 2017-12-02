# frozen_string_literal: true

module API
  class MessagesController < APIController
    def create
      NotificationsWorker.perform_async(params[:channel], params[:message])
      head 200
    end
  end
end
