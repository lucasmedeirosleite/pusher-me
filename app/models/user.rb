class User < ApplicationRecord
  validates :identifier, presence: true, uniqueness: true
end
