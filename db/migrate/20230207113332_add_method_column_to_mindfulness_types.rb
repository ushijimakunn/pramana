class AddMethodColumnToMindfulnessTypes < ActiveRecord::Migration[6.1]
  def change
    add_column :mindfulness_types, :method, :text
  end
end
