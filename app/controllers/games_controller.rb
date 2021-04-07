class GamesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game, only: %i[show join play make_move]
  before_action :set_player, only: %i[play make_move]

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
        format.html { redirect_to games_path, notice: 'Game was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def join
    unless current_user.game_host? @game
      @game.guest = current_user
      @game.save
    end
    redirect_to play_game_path(@game)
  end

  def play; end

  def make_move
    position = params.require(:position)
    player = params.require(:player)

    @game.player_move player: player, position: position

    head :ok
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def set_player
    return @player = 'host' if current_user.game_host? @game

    @player = 'guest' if current_user.game_guest? @game
  end
end
