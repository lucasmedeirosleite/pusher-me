# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :users, only: :create
    resources :messages, only: :create

    resources :pusher, only: [] do
      collection do
        post :auth
        post :subscribe
        delete :unsubscribe
      end
    end
  end
end
