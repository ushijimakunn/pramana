class StaticPagesController < ApplicationController
  before_action :login_required, only: %i[menu]

  def top; end

  def menu; end
end
