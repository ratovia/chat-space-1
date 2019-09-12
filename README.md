# README

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string|null: false, foreign_key: true|
|image|integer|null: false, foreign_key: true|
|group_id|integer|null: false|
|user_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|
|email|integer|null: false, foreign_key: true|
|password|string|null: false|
|current_sign_in|integer|null: false|

### Association
- has_many :messages
- has_many :groups, through: :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :groups_users
