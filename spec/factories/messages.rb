FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/5/ダウンロード.jpeg")}
    user
    group
  end
end