class RelationshipMailer < ApplicationMailer
    def new_follower(user,follower)
        @follower = follower
        @user = user

        mail to: user.email, subject: '【お知らせ】フォローされました'
    end
end
