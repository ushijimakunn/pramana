class MindfulsController < ApplicationController
  before_action :login_required
  before_action :get_all_mindfuls, only: %i[index show]

  def index; end
  
  def new
    @mindful = Mindful.new
  end

  def create
    keep_time = params[:time]
    keep_type_id = params[:type_id]
    @mindful = current_user.mindfuls.new(date: Date.current, time: keep_time, mindfulness_type_id: keep_type_id)
    @mindful.save!
    redirect_to mindful_path(current_user)
  end

  def show; end

  private
  
  # def mindful_params
  #   params.require(:mindful).permit(:date, :time)
  # end

  def get_all_mindfuls
    @mindfuls = current_user.mindfuls.all
  end

end
