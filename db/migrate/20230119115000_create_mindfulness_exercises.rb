class CreateMindfulnessExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :mindfulness_exercises do |t|
      t.date :date
      t.integer :time
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
