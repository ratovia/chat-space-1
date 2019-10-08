json.content  @message.content
json.image  @message.image.url
json.user_name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.id @message.id