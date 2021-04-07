class Game < ApplicationRecord
  belongs_to :host, class_name: 'User', foreign_key: 'host_id'
  belongs_to :guest, class_name: 'User', foreign_key: 'guest_id', optional: true

  validates :name, presence: true
  enum status: %i[settled in_progress]

  def player_move(player:, position:)
    return unless can_make_move?(position)

    guest_moves << position if player == 'guest'
    host_moves << position if player == 'host'
    save!
  end

  private

  def can_make_move?(position)
    guest_moves.exclude?(position) && host_moves.exclude?(position)
  end
end
