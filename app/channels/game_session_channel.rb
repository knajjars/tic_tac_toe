class GameSessionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_session_channel_#{params[:game_id]}"
  end

  def unsubscribed
    Game.find(params[:game_id]).cleanup.save!
  end
end
