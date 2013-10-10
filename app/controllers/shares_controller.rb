class SharesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :authenticate_user!

  def index
    render json: status: 200, json: { success: true,
                                      shares: current_user.shares
                                    }
  end

  def create
    share = Share.new(params[:share])
    if share.save
      render status: 200, json: { success: false,
                                  error: share.errors
                                }
    end
  end
  
end
