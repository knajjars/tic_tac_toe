class AddUsersToGame < ActiveRecord::Migration[6.1]
  def change
    add_reference :games, :guest, null: true, foreign_key: { to_table: 'users' }
    add_reference :games, :host, null: true, foreign_key: { to_table: 'users' }
  end
end
