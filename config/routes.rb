Rails.application.routes.draw do
  devise_for :users
  resources :games do
    post :join, on: :member
    get :play, on: :member
    post :make_move, on: :member
  end
  root to: 'games#index'
end
