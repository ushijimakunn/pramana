class Mindful < ApplicationRecord
  belongs_to :user
  belongs_to :mindfulness_type

  def start_time
    self.date
  end
end
