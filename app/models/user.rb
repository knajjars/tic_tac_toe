class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :host_games, class_name: 'Game', foreign_key: 'host_id'
  has_many :guest_games, class_name: 'Game', foreign_key: 'guest_id'

  def name
    email.split('@').first
  end

  def game_host?(game)
    game.host == self
  end

  def game_guest?(game)
    game.guest == self
  end
end
