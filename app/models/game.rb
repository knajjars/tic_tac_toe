class Game < ApplicationRecord
  include GameConcern

  belongs_to :host, class_name: 'User', foreign_key: 'host_id'
  belongs_to :guest, class_name: 'User', foreign_key: 'guest_id', optional: true

  validates :name, presence: true

  after_commit :notify_game_session

  before_create do
    self.player_turn = random_player
  end

  private

  def cleanup
    self.guest_moves = []
    self.host_moves = []
  end

  def start_game
    self.player_turn = random_player
    cleanup
  end
end
