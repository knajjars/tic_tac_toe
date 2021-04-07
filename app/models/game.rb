class Game < ApplicationRecord
  include GameConcern

  belongs_to :host, class_name: 'User', foreign_key: 'host_id'
  belongs_to :guest, class_name: 'User', foreign_key: 'guest_id', optional: true

  validates :name, presence: true
  enum status: %i[settled in_progress]

  after_commit :notify_game_session

  def notify_game_session
    ActionCable.server.broadcast "game_session_channel_#{id}", self
  end

  def player_move(player:, position:)
    return unless can_make_move?(position)

    guest_moves << position if player == 'guest'
    host_moves << position if player == 'host'

    winner = get_winner

    self.guest_wins += 1 if winner[:guest]
    self.host_wins += 1 if winner[:host]

    cleanup if winner[:game_won]

    save!
  end

  def cleanup
    self.guest_moves = []
    self.host_moves = []
    save!
  end
end
