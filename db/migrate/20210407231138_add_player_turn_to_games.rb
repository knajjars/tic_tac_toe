class AddPlayerTurnToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :player_turn, :string
  end
end
