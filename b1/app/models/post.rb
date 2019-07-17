class Post < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :nullify

    validates :body, presence: true, length: {minimum: 50}
    validates :title, presence: true, uniqueness:true
end
