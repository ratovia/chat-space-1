$(function(){
  function buildHTML(message){
    var content = message.content ?  `<p class="lower-message__content">${message.content}</p>` : "";
    var image = message.image ?  `<img class="lower-message__image" src="${message.image}">` : "";
      
    var html = `<div class="message">
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
      $('.form__message').val('')
      $('.hidden').val('')
      $('.form__submit').attr('disabled', false);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
})
