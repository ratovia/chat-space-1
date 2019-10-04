$(function() {

  var search_list = $(".listview.js-lazy-load-images");
  
  function appendUser(user) {
     var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
     return html
  }

  function addUser(user_id,user_name) {
    var html = `<div class="chat-group-user clearfix">
                 <input value="${ user_id }" type="hidden" name="group[user_ids][]">
                 <p class="chat-group-user__name">${ user_name }</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove">削除</div>
               </div>`
    return html
 }
  
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    $("#user-search-result").append(html);
  }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $("#user-search-result").append(html)
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(){
      var user_id = $(this).data("user-id")
      var user_name = $(this).data("user-name")
      $(this).parent().remove()
      var html = addUser(user_id,user_name);
      $("#user-add-result").append(html);
    });

    $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--remove",function(){
      $(this).parent().remove()
    });
  });