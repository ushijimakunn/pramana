class MindfulsController < ApplicationController
  before_action :login_required
  before_action :get_all_mindfuls, only: %i[index show]
  before_action :cal_total_time, only: %i[show]
  before_action :cal_consecutive_days, only: %i[show]

  def index; end
  
  def new
    @mindful = Mindful.new
  end

  def create
    a = params[:time]
    @mindful = current_user.mindfuls.new(date: Date.current, time: a)
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

  def cal_total_time
    get_all_mindfuls
    @total_time = 0
    @mindfuls.each do |mindful|
      @total_time += mindful.time
    end
  end

  #  今日を起点に、連続何日瞑想を行なっているかを計算
  def cal_consecutive_days
    get_all_mindfuls
    @consecutive_days = 0
    today = Date.today
    n = 0
    # レコードを回し、連続実施日数を計算
    @mindfuls.reverse_each do |mindful|
      if mindful.date == (today-n)
        @consecutive_days += 1
        n += 1
      elsif mindful.date == (today-n+1) #前回瞑想時と同じ日の時
        next
      else 
        break
      end
    end
  end

end
