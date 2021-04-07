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
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def join
    provided_password = params.require(:password)

    return redirect_to @game, alert: 'Wrong password.' if provided_password != @game.password

    @game.guest = current_user
    @game.save

    redirect_to play_game_path(@game)
  end

  def play; end

  def make_move
    position = params.require(:position)
    player = params.require(:player)

    @game.player_move player: player, position: position

    respond_to do |format|
      format.json do
        render json: @game.as_json(
          except: [:password]
        )
      end
    end
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name, :password)
  end

  def set_player
    return @player = 'host' if current_user.game_host? @game

    @player = 'guest' if current_user.game_guest? @game
  end
end
