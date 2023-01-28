class UserSessionsController < ApplicationController
  def new; end
  
  def create
    @user = login(params[:email], params[:password])
    if @user
      flash[:success] = 'ログインしました。'
      redirect_to menu_path 
    else
      flash.now[:error] = 'ログインに失敗しました。'
      render :new
    end
  end

  def destroy
    logout
    flash[:success] = 'ログアウトしました'
    redirect_to root_path
  end
end
