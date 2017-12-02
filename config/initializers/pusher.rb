# frozen_string_literal: true

Pusher.app_id = ENV.fetch('PUSHER_APP_ID')
Pusher.key = ENV.fetch('PUSHER_APP_KEY')
Pusher.logger = Rails.logger
Pusher.secret = ENV.fetch('PUSHER_APP_SECRET')
Pusher.cluster = ENV.fetch('PUSHER_CLUSTER')
