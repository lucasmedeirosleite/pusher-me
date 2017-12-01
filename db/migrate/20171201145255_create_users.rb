class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.integer :identifier, null: false

      t.timestamps
    end

    add_index(:users, :identifier, unique: true)
  end
end
