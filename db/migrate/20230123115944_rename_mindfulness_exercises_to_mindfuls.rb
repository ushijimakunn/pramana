class RenameMindfulnessExercisesToMindfuls < ActiveRecord::Migration[6.1]
  def change
    rename_table :mindfulness_exercises, :mindfuls
  end
end
