# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Post.delete_all
200.times do
Post.create(title: Faker::TvShows::DrWho.quote, body: Faker::Lorem.paragraphs(3))
end
200.times do
    Post.create(title: Faker::ChuckNorris.fact, body: Faker::Lorem.paragraphs(3))
end

p Post.all.count