class PostsController < ApplicationController

    before_action :find_post, only: [:show, :edit, :destroy]
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize, only: [:edit, :update, :destroy]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        @post.user = current_user
        if @post.save
            redirect_to post_path(@post)
        else render :new
        end
    end

    def index
        @posts = Post.all
    end

    def show
        @comment = Comment.new
        @comments = @post&.comments
    end

    def edit
    end

    def update
        @post = Post.new post_params
        @post.user = current_user
        if @post.save
            redirect_to post_path(@post)
        else render :edit
        end
    end

    def destroy
        @post.destroy
        redirect_to posts_path
        flash[:notice] = "Post deleted."
    end

    private
    def post_params
        params.require(:post).permit(:title, :body)
    end

    def find_post
        @post = Post.find(params[:id])
    end

    def authorize
        redirect_to @post, alert: 'you are not authorized to perform this action.' unless current_user == @post.user
    end
end
