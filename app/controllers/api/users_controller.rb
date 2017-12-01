# frozen_string_literal: true

module API
  class UsersController < APIController
    def create
      user = User.find_or_create_by(identifier: params[:user][:identifier])
      render json: { user: user }, status: :ok
    end
  end
end
