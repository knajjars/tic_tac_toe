class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :name
      t.string :password
      t.integer :host_wins, default: 0
      t.integer :guest_wins, default: 0

      t.timestamps
    end
  end
end
