Rails.application.routes.draw do
  root to: 'static_pages#top'
  get '/trial_start', to: 'mindfuls#trial_start'
  get '/trial_end', to: 'mindfuls#trial_end'
end
