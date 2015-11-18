$(document).ready(function(){
  var data;

  $.ajaxSettings.async = false;
  $.getJSON("bookmark.json",function(bookmarks){
      data = bookmarks;
  });

  $.each(data, function(i, field){
    appendbookmark(field.title,field.created);
  });

  var bookmarks = $(".content").html();
  $("input:text").bind("input propertychange",function(){
    var inputWord = $(this).val();
    highLightMatchingword(inputWord ,data);
  });


  function appendbookmark(title,createdDate) {
    var content='<p class="bookmark">' + title + '</p>';
    var formatDate = getFormatDate(createdDate);
    var date = $("<p></p>").text(formatDate).addClass("date");
    var line = $("<hr>").addClass("line");
    $(".content").append(content);
    $(".content").append(date);
    $(".content").append(line);
  }

  function getFormatDate(number) {
    var date = new Date(parseInt(number));
    return 'created@' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate()+1);
  }

  function highLightMatchingword(inputWord, data) {
    if(inputWord !== "") {
      clearHtml();
      var patten = new RegExp("("+inputWord+")","ig");
      var filteingData = data.filter(function (subData){
        return patten.test(subData.title);
      });

      filteingData.map(function (subData){
        var highLightBookmark = subData.title.replace(patten,'<span style="background-color:#f54698">'+'$1'+'</span>');
        appendbookmark(highLightBookmark,subData.created);
      });
    } else {
      showInitBookmark(bookmarks);
    }
  }

  function clearHtml() {
     $(".content").html("");
  }

  function showInitBookmark(bookmarks) {
    $(".content").html(bookmarks);
  }
});
