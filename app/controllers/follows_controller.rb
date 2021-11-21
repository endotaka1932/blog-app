class FollowsController < ApplicationController
    def create
        current_user.follows!(params[:account_id])
    end
