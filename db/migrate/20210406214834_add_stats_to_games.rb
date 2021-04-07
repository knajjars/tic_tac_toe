class AddStatsToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :status, :string
    add_column :games, :guest_moves, :integer, array: true, default: []
    add_column :games, :host_moves, :integer, array: true, default: []
  end
end
