# frozen_string_literal: true

module API
  class PusherController < APIController
    def auth
      if User.find_by(identifier: params[:user_id])
        response = Pusher.authenticate(params[:channel_name], params[:socket_id])
        render json: response, status: :ok
      else
        render json: { message: 'Forbidden' }, status: 403
      end
    end

    def webhook
      webhook = Pusher::WebHook.new(request)
      if webhook.valid?
        WebhookEventsHandler.call(events: webhook.events)
        head :ok
      else
        head :unauthorized
      end
    end
  end
end
