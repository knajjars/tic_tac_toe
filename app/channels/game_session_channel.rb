class GameSessionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_session_channel_#{params[:game_id]}"
  end

  def unsubscribed; end
end
