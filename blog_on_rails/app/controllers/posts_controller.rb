class PostsController < ApplicationController

    before_action :find_post, only: [:show, :edit, :destroy]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        if @post.save
            redirect_to post_path(@post)
        else render :new
        end
    end

    def index
        @posts = Post.all
    end

    def show
    end

    def edit
    end

    def update
        @post = Post.new post_params
        if @post.save
            redirect_to post_path(@post)
        else render :edit
        end
    end

    def destroy
        @post.destroy
        flash[:notice] = "Post deleted."
    end

    private
    def post_params
        params.require(:post).permit(:title, :body)
    end

    def find_post
        @post = Post.find(params[:id])
    end
end
