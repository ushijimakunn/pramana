class CreateMindfulnessEffects < ActiveRecord::Migration[6.1]
  def change
    create_table :mindfulness_effects do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
