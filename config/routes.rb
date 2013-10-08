Shareup::Application.routes.draw do
  namespace :api do
    resources :shares
  end

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks"}

end
