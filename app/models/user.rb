# frozen_string_literal: true

class User < ApplicationRecord
  validates :identifier, presence: true, uniqueness: true
end
