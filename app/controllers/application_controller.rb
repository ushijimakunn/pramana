class ApplicationController < ActionController::Base
  
  private

  def login_required
    redirect_to login_path unless current_user
  end
end
