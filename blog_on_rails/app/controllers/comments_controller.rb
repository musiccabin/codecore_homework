class CommentsController < ApplicationController

  before_action :find_post
  before_action :authenticate_user!

  def create
    @comment = Comment.new comment_params
    @comment.post = @post
    @comment.user = current_user
    if @comment.save
      redirect_to post_path(@post)
    else
      render "posts/#{@post.id}"
    end
  end

  def destroy
    @comment = Comment.find params[:id]
    return redirect_to @post, alert: 'you are not authorized to perform this action.' unless current_user == @comment.user
    @comment.destroy
    redirect_to post_path(@post)
    flash[:notice] = 'Comment deleted.'
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_post
    @post = Post.find params[:post_id]
  end
end
