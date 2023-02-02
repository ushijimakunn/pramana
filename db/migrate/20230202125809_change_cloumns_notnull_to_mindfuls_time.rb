class ChangeCloumnsNotnullToMindfulsTime < ActiveRecord::Migration[6.1]
  def change
    change_column :mindfuls, :time, :integer, null: false
  end
end
