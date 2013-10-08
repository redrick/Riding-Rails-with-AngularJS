class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
      :recoverable, :rememberable, :trackable,
      :validatable, :omniauthable
  has_many :authorizations, :dependent => :destroy
end
