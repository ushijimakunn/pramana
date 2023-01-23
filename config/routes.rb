Rails.application.routes.draw do
  root to: 'static_pages#top'
  get 'trial_start', to: 'mindfuls#trial_start'
  get 'trial_end', to: 'mindfuls#trial_end'
  get 'start', to: 'mindfuls#start'
  get 'end', to: 'mindfuls#end'

  # ログインユーザの瞑想実施機能
  resources :mindfuls, only: %i[new create]
  
  #ログイン後トップページ 
  get 'menu', to: 'static_pages#menu'

  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  resources :users, only: %i[new create]
end
