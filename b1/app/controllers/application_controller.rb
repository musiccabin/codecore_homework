class ApplicationController < ActionController::Base
    helper_method(:current_user)
    
    def current_user
        if session[:user_id].present?
            user = User.find_by(id: session[:user_id])
        end
        user
    end

    def authenticate_user!
        redirect_to new_session_path, alert: 'you must be signed in to access this page' unless current_user
    end
end
