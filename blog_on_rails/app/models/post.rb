class Post < ApplicationRecord

    validates :body, presence: true, length: {minimum: 50}
    validates :title, presence: true, uniqueness:true
end
