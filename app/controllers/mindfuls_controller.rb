class MindfulsController < ApplicationController
  def index
    @mindfuls = current_user.mindfuls.all
  end
  
  def new
    @mindful = Mindful.new
  end

  def create
    a = params[:time]
    @mindful = current_user.mindfuls.new(date: Date.current, time: a)
    @mindful.save!
    redirect_to mindfuls_path
  end

  private
  
  # def mindful_params
  #   params.require(:mindful).permit(:date, :time)
  # end

end
