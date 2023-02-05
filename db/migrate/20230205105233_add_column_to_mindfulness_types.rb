class AddColumnToMindfulnessTypes < ActiveRecord::Migration[6.1]
  def change
    add_column :mindfulness_types, :icon, :string
    add_column :mindfulness_types, :image, :string
  end
end
