module API
  class PusherController < APIController
    def auth
      if User.find_by(identifier: params[:user_id])
        response = authenticate_socket
        render json: response, status: :ok
      else
        render json: { message: 'Forbidden' }, status: 403
      end
    end

    def subscribe
      puts "**************** PARAMS: #{params}"
      render json: { message: :success }, status: :ok
    end

    def unsubscribe
      puts "**************** PARAMS: #{params}"
      render json: { message: :success }, status: :ok
    end

    private

    def authenticate_socket
      Pusher.authenticate(
        params[:channel_name],
        params[:socket_id],
        user_id: params[:user_id],
        user_info: {
          platform: :web,
          socket_id: params[:socket_id]
        }
      )
    end
  end
end
