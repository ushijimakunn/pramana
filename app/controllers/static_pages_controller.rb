class StaticPagesController < ApplicationController
  before_action :login_required, only: %i[menu]

  def top; end

  def menu
    @mindfulness_types = MindfulnessType.all
  end
end
