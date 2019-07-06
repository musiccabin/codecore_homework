class CommentsController < ApplicationController

  before_action :find_post

  def create
    @comment = Comment.new comment_params
    @comment.post = @post
    if @comment.save
      redirect_to post_path(@post)
    else
      render "posts/#{@post.id}"
    end
  end

  def destroy
    @comment = Comment.find params[:id]
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
