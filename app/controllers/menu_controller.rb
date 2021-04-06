class MenuController < ApplicationController
  layout 'application'

  def index
    redirect_to new_game_path if user_signed_in?
  end
end
