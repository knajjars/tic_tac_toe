Rails.application.routes.draw do
  devise_for :users
  resources :games do
    get :join, on: :member
    get :play, on: :member
    post :make_move, on: :member
  end

  mount ActionCable.server => '/cable'

  root to: 'games#index'
end
