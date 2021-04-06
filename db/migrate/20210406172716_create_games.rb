class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :name
      t.string :password
      t.integer :host_wins
      t.integer :guest_wins

      t.timestamps
    end
  end
end
