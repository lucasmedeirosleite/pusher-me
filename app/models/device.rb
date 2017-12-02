# frozen_string_literal: true

# frozen_string_literal

class Device
  include ActiveModel::Model
  attr_accessor :socket_id, :platform
end
