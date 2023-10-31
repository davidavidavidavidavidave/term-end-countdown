class RemoveDescriptionFromCountdowns < ActiveRecord::Migration[7.0]
  def change
    remove_column :countdowns, :description
  end
end
