class MindfulsController < ApplicationController
  before_action :cal_mindfuls_time, only: %i[index]

  def index; end
  
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

  def cal_mindfuls_time
    @mindfuls = current_user.mindfuls.all
    @total_time = 0
    @mindfuls.each do |mindful|
      @total_time += mindful.time
    end
  end

  def cal_consecutive_days
    @number_of_consecutive_days = 0
    １。 瞑想の最新実施日＝今日の時
          カウントアップ
          ないとき、終了
    ２。 瞑想の最新実施日−１のレコードの実施日＝昨日の時
          カウントする。
        瞑想の最新実施日−１のレコードの実施日＝今日の時
          カウントせず、次に進める
        瞑想の最新実施日−１のレコードの実施日＝今日、昨日でない時
          終了
    ３。 瞑想の最新実施日−ｎのレコードの実施日＝今日ーｎの時
          カウントする
        瞑想の最新実施日−ｎのレコードの実施日＝今日ーｎ＋１の時
          カウントせず、ｎを＋１する
        他
          終了


  end

end
