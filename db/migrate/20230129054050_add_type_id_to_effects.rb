class AddTypeIdToEffects < ActiveRecord::Migration[6.1]
  def change
    add_reference :mindfulness_effects, :mindfulness_type, null: false, index: true
  end
end
