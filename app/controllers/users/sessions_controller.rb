class Users::SessionsController < Devise::SessionsController
  respond_to :json

  skip_before_filter :verify_authenticity_token

  before_filter :authenticate_user!, except: [:create]

  def create
    resource = User.find_for_database_authentication(email: params[:user][:email]) 
    return failure unless resource
    return failure unless resource.valid_password?(params[:user][:password])
    
    render status: 200, json: { success: true, 
                                info: "Logged in", data: {
                                auth_token: current_user.authentication_token 
                                }
                              }
  end

  def failure
    warden.custom_failure! 
    render status: 200, json: { success: false, 
                                info: "Login failed", 
                                data: {}
                              }
  end
  
  # def show_current_user
  #   reject_if_not_authorized_request!
  #   render status: 200,json: {success: true,
  #                             info: "Current user", 
  #                             user: current_user}
  # end

  # def failure
  #   render status: 401, json: { success: false,
  #                               info: "Unauthorized"}
  # end

  # private
    
  #   def reject_if_not_authorized_request! 
  #     warden.authenticate!(
  #       scope: resource_name,
  #       recall: "#{controller_path}#failure") 
  #   end
end
