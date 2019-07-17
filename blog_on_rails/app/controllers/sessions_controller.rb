class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      redirect_to new_session_path, alert: 'wrong email or password entered.'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: 'you are signed out.'
  end
end
