class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :host_games, class_name: 'Game', foreign_key: 'host_id'
  has_many :guest_games, class_name: 'Game', foreign_key: 'guest_id'
end
