class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
      :recoverable, :rememberable, :trackable,
      :validatable, :omniauthable, :token_authenticatable

  has_many :authorizations, :dependent => :destroy
  has_many :shares, foreign_key: 'from_user_id'

  before_save :ensure_authentication_token
end
