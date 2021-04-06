class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: %i[show join play]

  def index
    @games = Game.all
  end

  def show; end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.host = current_user

    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def join
    provided_password = params.require(:password)

    return redirect_to @game, alert: 'Wrong password.' if provided_password != @game.password

    redirect_to play_game_path(@game)
  end

  def play
    @game.guest = current_user
    @game.save
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name, :password, :host_wins, :guest_wins)
  end
end
