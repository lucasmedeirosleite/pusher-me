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

    def subscribe
      if repository.store(channel: channel_params[:name], device: device)
        render json: { device: device }, status: :ok
      else
        head 422
      end
    end

    def unsubscribe
      if repository.delete(channel: params[:channel], socket_id: params[:socket_id])
        head :ok
      else
        head 400
      end
    end

    private

    def repository
      @_repository ||= ChannelsRepository.new
    end

    def device
      Device.new(channel_params[:device])
    end

    def channel_params
      params.require(:channel).permit(:name, :user_id, device: %i[socket_id platform])
    end
  end
end
