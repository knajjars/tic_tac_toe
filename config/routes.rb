Rails.application.routes.draw do
  devise_for :users
  resources :games do
    post :join, on: :member
    get :play, on: :member
  end
  root to: 'games#index'
end
