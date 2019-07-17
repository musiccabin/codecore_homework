class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to new_session_path, alert: 'please sign in with your credentials.'
    else render :new
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if current_user.update edit_user_params
      if (params[:user][:password] != '')
        if can_update
          reset_session
          redirect_to new_session_path
          flash[:notice] = 'your credentials are updated. please sign in again.'
        else
          @errors = []
          @errors << 'current password is incorrect.' unless @user.authenticate(params[:user][:password])
          if (params[:user][:password] == params[:user][:new_password])
            @errors << "your new password has to be different from your current password."
          end
          if (params[:user][:new_password] != params[:user][:password_confirmation])
            @errors << "please make sure password confirmation matches with new password."
          end
          render :edit and return
        end
      else redirect_to root_path
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def edit_user_params
    params.require(:user).permit(:name, :email)
  end

  def can_update
    (current_user == current_user.authenticate(params[:password])) && (params[:password] != params[:new_password]) && (params[:new_password] == params[:password_confirmation]) && current_user.update({password: params[:new_password]})
  end
end
