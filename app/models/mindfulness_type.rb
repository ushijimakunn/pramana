class MindfulnessType < ApplicationRecord
  has_many :mindfulness_effects
  has_many :mindfuls
end
