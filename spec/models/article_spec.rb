require 'rails_helper'

RSpec.describe Article, type: :model do
  context 'タイトルと内容が入力されていれば' do
    let!(:user) do
      user = User.create!({
        email: 'test@example.com',
        password: 'password'
      })
    end

    let!(:article) do
      article = user.articles.build({
        title: Faker::Lorem.characters(number: 10),
        content: Faker::Lorem.characters(number: 300)
      })
    end

    it '記事を保存できる' do
      expect(article).to be_valid
    end
  end

end
