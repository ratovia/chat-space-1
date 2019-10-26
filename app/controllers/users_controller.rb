class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)and id NOT IN (?)', "%#{params[:keyword]}%", excluded_users)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit      
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  # current_userと選択中のuserを表示させないためのメソッド
  def excluded_users
    excluded_users = []
    excluded_users << current_user.id
    #グループに追加するユーザーを選択中の場合のみ発火
    if params[:selected_users]
      #selected_userの値を数値に変換
      params[:selected_users].map do |user_id|
        excluded_users << user_id.to_i
      end
    end
    return excluded_users
  end

end