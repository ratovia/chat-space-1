$(function(){
  function buildHTML(message){
    var content = message.content ?  `<p class="lower-message__content">${message.content}</p>` : "";
    var image = message.image ?  `<img class="lower-message__image" src="${message.image}">` : "";
      
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name} 
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }

  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src="${message.image.url}" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <img src=${message.image.url}" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__chat').append(html);
      $('form')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message').last().data('message-id');

    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
      //メッセージが入ったHTMLを取得
      insertHTML = buildMessageHTML(message);
      //メッセージを追加
      $('.main__chat').append(insertHTML);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      })
    })
  
    .fail(function() {
      alert('error');
    
    });
  };
  
  setInterval(reloadMessages, 5000);
});
