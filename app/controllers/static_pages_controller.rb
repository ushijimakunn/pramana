class StaticPagesController < ApplicationController
  before_action :login_required, only: %i[menu]
  before_action :logout_required, only: %i[top]

  def top; end

  def menu
    @mindfulness_types = MindfulnessType.all
  end
end
