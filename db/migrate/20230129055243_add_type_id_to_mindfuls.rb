class AddTypeIdToMindfuls < ActiveRecord::Migration[6.1]
  def change
    execute 'DELETE FROM mindfuls;' 
    add_reference :mindfuls, :mindfulness_type, null: false, index: true
  end
end
