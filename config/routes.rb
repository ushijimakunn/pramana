Rails.application.routes.draw do
  root to: 'static_pages#top'
  get 'start', to: 'trial_mindfuls#start'
  get 'end', to: 'trial_mindfuls#end'
  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'

  # ログインユーザの瞑想実施機能
  resources :mindfuls, only: %i[index new create show]
  
  #ログイン後トップページ 
  get 'menu', to: 'static_pages#menu'

  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # resources :users, only: %i[new create]
  resource :profile, only: %i[show edit update]
end
