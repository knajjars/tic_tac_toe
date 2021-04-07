class Game < ApplicationRecord
  include WinCombinations

  belongs_to :host, class_name: 'User', foreign_key: 'host_id'
  belongs_to :guest, class_name: 'User', foreign_key: 'guest_id', optional: true

  validates :name, presence: true
  enum status: %i[settled in_progress]

  def player_move(player:, position:)
    return unless can_make_move?(position)

    guest_moves << position if player == 'guest'
    host_moves << position if player == 'host'

    winner = get_winner

    self.guest_wins += 1 if winner[:guest]
    self.host_wins += 1 if winner[:host]

    save!
  end

  def cleanup
    self.guest_moves = []
    self.host_moves = []
    save!
  end

  private

  def can_make_move?(position)
    guest_moves.exclude?(position) && host_moves.exclude?(position)
  end

  def get_winner
    guest = false
    host = false

    win_combinations.each do |win_combination|
      wc1 = win_combination[0]
      wc2 = win_combination[1]
      wc3 = win_combination[2]

      return guest = true if guest_moves.include?(wc1) && guest_moves.include?(wc2) && guest_moves.include?(wc3)

      return host = true if guest_moves.include?(wc1) && guest_moves.include?(wc2) && guest_moves.include?(wc3)
    end
    { guest: guest, host: host }
  end
end
