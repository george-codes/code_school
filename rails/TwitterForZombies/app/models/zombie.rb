class Zombie < ActiveRecord::Base
  # scope :rotting, -> { where(rotting: true) }
  # scope :fresh, -> { where("age < 20") }
  # scope :recent, -> { order("created_at DESC").limit(3) }


  before_save :make_rotting
  has_one :brain, dependent: :destroy
  delegate :flavor, to: :brain, prefix: true, allow_nil: true

  has_many :assignments
  has_many :roles, through: :assignments

  has_many :tweets

  # def brain_flavor
  #   if brain.flavor == nil
  #     "No brain"
  #   else
  #     brain.flavor
  #   end
  # end


  def make_rotting
    if age > 20             # Doesn't use 'self' because we are only reading
      self.rotting = true   # Use 'self' because we are setting
    end
    # self.rotting = true if age > 20 <-- One line version
  end
end


# Method chaining to create queries

# Zombie.rotting.limit(5)
# Zombie.recent.rotting
# Zombie.recent.fresh.rotting


# CALLBACKS

# before_validation
# after_validation

# before_save         :encrypt_password
# after_save

# before_create
# after_create        :send_welcome_email

# before_update
# after_update

# before_destroy      :set_deleted_flag
# after_destroy


# Relationship Options

# dependent: :destroy         <- will call destroy on associated objects
# foreign_key: :undead_id     <- changes the associated key (i.e. zombie_id)
# primary_key: :zid           <- changes the primary key (i.e. id)
# validate: true              <- when zombie validates, brain will too