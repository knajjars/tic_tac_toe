module GameConcern
  extend ActiveSupport::Concern

  def random_player
    %i[guest host].sample
  end

  def select_player
    return random_player if player_turn.nil?

    player_turn == 'host' ? 'guest' : 'host'
  end

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

  def game_status
    guest_won = false
    host_won = false
    game_finished = false

    win_combinations.each do |win_combination|
      wc1 = win_combination[0]
      wc2 = win_combination[1]
      wc3 = win_combination[2]

      guest_won = true if guest_moves.include?(wc1) && guest_moves.include?(wc2) && guest_moves.include?(wc3)

      host_won = true if host_moves.include?(wc1) && host_moves.include?(wc2) && host_moves.include?(wc3)

      game_finished = true if host_won || guest_won || (guest_moves.length + host_moves.length >= 9)
    end
    { game_finished: game_finished, guest_won: guest_won, host_won: host_won }
  end
end
