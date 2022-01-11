FactoryBot.define do
    factory :user do
        email { Faker::Internet.email }
        password { 'password' }
    end

    trait :with_prfile do
        after :build do |user|
            build(:profile, user: user)
        end
    end
end
