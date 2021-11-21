# frozen_string_literal: true

module UserDecorator
    def display_name
        # if profile && profile.nicname
        #   profile.nicname
        # else
        #   self.email.split('@').first
        # end
        # ぼっち演算子
        profile&.nicname || self.email.split('@').first
    end

    def avatar_image
        if profile&.avatar&.attached?
          profile.avatar
        else
          'default-avatar.png'
        end
    end
end
