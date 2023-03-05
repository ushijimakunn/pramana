class ApplicationController < ActionController::Base
  
  private

  def login_required
    redirect_to login_path unless current_user
  end

  def logout_required
    if current_user
      logout
      flash[:success] = 'ログアウトしました'
    end
  end

end
