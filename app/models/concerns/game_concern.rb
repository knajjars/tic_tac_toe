module GameConcern
  extend ActiveSupport::Concern

  def win_combinations =
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ]

  def can_make_move?(position)
    guest_moves.exclude?(position) && host_moves.exclude?(position)
  end

  def get_winner
    guest = false
    host = false
    game_won = false

    win_combinations.each do |win_combination|
      wc1 = win_combination[0]
      wc2 = win_combination[1]
      wc3 = win_combination[2]

      guest = true if guest_moves.include?(wc1) && guest_moves.include?(wc2) && guest_moves.include?(wc3)

      host = true if host_moves.include?(wc1) && host_moves.include?(wc2) && host_moves.include?(wc3)

      game_won = true if guest || host
    end
    { game_won: game_won, guest: guest, host: host }
  end
end
