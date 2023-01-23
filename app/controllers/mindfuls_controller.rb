class MindfulsController < ApplicationController
  def trial_start; end

  def trial_end; end

  def index; end
  
  def new
    @mindful = Mindful.new
  end

  def create
    @mindful = current_user.mindfuls.new(mindful_params)
    @mindful.save!
    redirect_to menu_path
  end

  private
  
  def mindful_params
    params.require(:mindful).permit(:date, :time)
  end

end
